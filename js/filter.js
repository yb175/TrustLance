/**
 * AI Filter for FreelanceAI
 * 
 * This module provides AI-like filtering of freelancer applications
 * based on experience, skills, project history, and other qualifications.
 */

const AIFilter = (function() {
  /**
   * Calculate match score between project requirements and freelancer qualifications
   * @param {Object} project - The project data
   * @param {Object} application - The application data
   * @returns {number} - Score between 0-100
   */
  function calculateMatchScore(project, application) {
    let score = 0;
    const maxScore = 100;
    
    // 1. Skills match (40% of total score)
    const skillsScore = calculateSkillsMatch(project.skills, application.skills);
    
    // 2. Experience match (25% of total score)
    const experienceScore = calculateExperienceMatch(project, application);
    
    // 3. Project history match (25% of total score)
    const projectHistoryScore = calculateProjectHistoryMatch(project, application);
    
    // 4. Education and certifications (10% of total score)
    const educationScore = calculateEducationMatch(project, application);
    
    // Calculate weighted total
    score = (skillsScore * 0.4) + (experienceScore * 0.25) + 
            (projectHistoryScore * 0.25) + (educationScore * 0.1);
    
    // Round to nearest integer
    return Math.round(score);
  }
  
  /**
   * Calculate skill match score
   * @param {Array} projectSkills - Required skills for the project
   * @param {Array} applicantSkills - Applicant's skills
   * @returns {number} - Score between 0-100
   */
  function calculateSkillsMatch(projectSkills, applicantSkills) {
    if (!projectSkills.length || !applicantSkills.length) {
      return 0;
    }
    
    // Normalize skills (lowercase, trim)
    const normalizedProjectSkills = projectSkills.map(skill => skill.toLowerCase().trim());
    const normalizedApplicantSkills = applicantSkills.map(skill => skill.toLowerCase().trim());
    
    // Count matching skills
    let matchCount = 0;
    
    normalizedProjectSkills.forEach(skill => {
      // Check for exact matches
      if (normalizedApplicantSkills.includes(skill)) {
        matchCount += 1;
      } else {
        // Check for partial matches (e.g., "JavaScript" matches "JavaScript ES6")
        for (const applicantSkill of normalizedApplicantSkills) {
          if (applicantSkill.includes(skill) || skill.includes(applicantSkill)) {
            matchCount += 0.5; // Partial match
            break;
          }
        }
      }
    });
    
    // Calculate percentage of matched skills
    const matchPercentage = (matchCount / normalizedProjectSkills.length) * 100;
    
    // Bonus for having all required skills
    if (matchCount >= normalizedProjectSkills.length) {
      return Math.min(matchPercentage + 10, 100);
    }
    
    return Math.min(matchPercentage, 100);
  }
  
  /**
   * Calculate experience match score
   * @param {Object} project - The project data
   * @param {Object} application - The application data
   * @returns {number} - Score between 0-100
   */
  function calculateExperienceMatch(project, application) {
    // Base score on years of experience
    const yearsOfExperience = parseInt(application.experience) || 0;
    
    // Scoring logic:
    // 0-1 years: 20 points
    // 2-3 years: 40 points
    // 4-5 years: 70 points
    // 6+ years: 90 points
    // 10+ years: 100 points
    
    if (yearsOfExperience >= 10) return 100;
    if (yearsOfExperience >= 6) return 90;
    if (yearsOfExperience >= 4) return 70;
    if (yearsOfExperience >= 2) return 40;
    return 20;
  }
  
  /**
   * Calculate project history match score
   * @param {Object} project - The project data
   * @param {Object} application - The application data
   * @returns {number} - Score between 0-100
   */
  function calculateProjectHistoryMatch(project, application) {
    if (!application.previousProjects) {
      return 0;
    }
    
    // Score based on relevance of previous projects
    let relevanceScore = 0;
    
    // Check if previous projects contain relevant keywords
    const previousProjects = application.previousProjects.toLowerCase();
    const relevantKeywords = [
      ...project.skills.map(skill => skill.toLowerCase()),
      project.category.toLowerCase(),
      ...project.title.toLowerCase().split(' ')
    ];
    
    // Count unique matching keywords
    const matchedKeywords = new Set();
    
    relevantKeywords.forEach(keyword => {
      if (keyword.length > 3 && previousProjects.includes(keyword)) {
        matchedKeywords.add(keyword);
      }
    });
    
    // Calculate score based on matched keywords
    relevanceScore = Math.min((matchedKeywords.size / 5) * 100, 100);
    
    return relevanceScore;
  }
  
  /**
   * Calculate education match score
   * @param {Object} project - The project data
   * @param {Object} application - The application data
   * @returns {number} - Score between 0-100
   */
  function calculateEducationMatch(project, application) {
    if (!application.education) {
      return 0;
    }
    
    const education = application.education.toLowerCase();
    let score = 0;
    
    // Check for degree relevance
    if (education.includes('bachelor') || education.includes('master') || education.includes('phd')) {
      score += 50;
    }
    
    // Check for certifications relevance
    if (education.includes('certification') || education.includes('certificate')) {
      score += 30;
    }
    
    // Check for domain-specific education
    const relevantKeywords = [
      ...project.skills.map(skill => skill.toLowerCase()),
      project.category.toLowerCase()
    ];
    
    let keywordMatches = 0;
    relevantKeywords.forEach(keyword => {
      if (keyword.length > 3 && education.includes(keyword)) {
        keywordMatches++;
      }
    });
    
    score += Math.min(keywordMatches * 10, 20);
    
    return Math.min(score, 100);
  }
  
  /**
   * Filter applications for a specific project
   * @param {string} projectId - ID of the project
   * @returns {Array} - Sorted array of applications with match scores
   */
  function filterApplicationsForProject(projectId) {
    const project = Database.getProjectById(projectId);
    if (!project) {
      return [];
    }
    
    // Get all applications for this project
    const applications = Database.getApplicationsForProject(projectId);
    if (!applications.length) {
      return [];
    }
    
    // Calculate match score for each application
    const scoredApplications = applications.map(application => {
      const matchScore = calculateMatchScore(project, application);
      return {
        ...application,
        aiScore: matchScore
      };
    });
    
    // Sort by match score (highest first)
    return scoredApplications.sort((a, b) => b.aiScore - a.aiScore);
  }

  /**
   * Parse skills from a comma-separated string
   * @param {string} skillsString - Comma-separated skills string
   * @returns {Array} - Array of skills
   */
  function parseSkills(skillsString) {
    if (!skillsString) return [];
    
    return skillsString.split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
  }
  
  // Public API
  return {
    calculateMatchScore,
    filterApplicationsForProject,
    parseSkills
  };
})();
