/**
 * Main JavaScript for FreelanceAI
 * 
 * This file contains the main functionality for the FreelanceAI website,
 * including event handlers, UI updates, and application logic.
 */

// DOM Elements
const projectsGrid = document.getElementById('projects-grid');
const categoryFilter = document.getElementById('category-filter');
const budgetFilter = document.getElementById('budget-filter');
const applyFiltersBtn = document.getElementById('apply-filters');
const projectModal = document.getElementById('project-modal');
const successModal = document.getElementById('success-modal');
const projectDetails = document.getElementById('project-details');
const applicantsList = document.getElementById('applicants-list');
const freelancerForm = document.getElementById('freelancer-application-form');

// Close buttons for modals
const closeButtons = document.querySelectorAll('.close, .close-modal');

// Initialize the application
function init() {
  // Load and display projects
  loadProjects();
  
  // Set up event listeners
  setupEventListeners();
}

// Load and display projects
function loadProjects(category = 'all', budget = 'all') {
  const projects = Database.getFilteredProjects(category, budget);
  displayProjects(projects);
}

// Display projects in the grid
function displayProjects(projects) {
  projectsGrid.innerHTML = '';
  
  if (projects.length === 0) {
    projectsGrid.innerHTML = `
      <div class="no-results">
        <p>No projects found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  projects.forEach(project => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });
}

// Create a project card element
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.dataset.id = project.id;
  
  // Format the posted date
  const postedDate = new Date(project.postedDate);
  const formattedDate = postedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Format category display name
  const categoryDisplayNames = {
    'web-development': 'Web Development',
    'mobile-app': 'Mobile App',
    'design': 'Design',
    'marketing': 'Marketing',
    'writing': 'Writing'
  };
  
  const categoryDisplay = categoryDisplayNames[project.category] || project.category;
  
  card.innerHTML = `
    <div class="project-header">
      <span class="project-category">${categoryDisplay}</span>
      <h3>${project.title}</h3>
    </div>
    <div class="project-body">
      <p class="project-description">${truncateText(project.description, 100)}</p>
      <div class="project-skills">
        ${project.skills.slice(0, 3).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        ${project.skills.length > 3 ? `<span class="skill-tag">+${project.skills.length - 3} more</span>` : ''}
      </div>
      <div class="project-meta">
        <span><i class="far fa-clock"></i> ${project.duration}</span>
        <span><i class="far fa-calendar-alt"></i> Posted: ${formattedDate}</span>
      </div>
    </div>
    <div class="project-footer">
      <span class="project-budget">$${project.budget}</span>
      <button class="btn btn-primary view-details">View Details</button>
    </div>
  `;
  
  return card;
}

// Truncate text to a specific length
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Set up event listeners
function setupEventListeners() {
  // Apply filters button
  applyFiltersBtn.addEventListener('click', () => {
    const categoryValue = categoryFilter.value;
    const budgetValue = budgetFilter.value;
    loadProjects(categoryValue, budgetValue);
  });
  
  // Project grid delegation for "View Details" buttons
  projectsGrid.addEventListener('click', (e) => {
    const viewDetailsBtn = e.target.closest('.view-details');
    if (viewDetailsBtn) {
      const projectCard = viewDetailsBtn.closest('.project-card');
      const projectId = projectCard.dataset.id;
      openProjectModal(projectId);
    }
  });
  
  // Close modal buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      projectModal.style.display = 'none';
      successModal.style.display = 'none';
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.style.display = 'none';
    }
    if (e.target === successModal) {
      successModal.style.display = 'none';
    }
  });
  
  // Freelancer application form submission
  freelancerForm.addEventListener('submit', handleApplicationSubmit);
  
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const authButtons = document.querySelector('.auth-buttons');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      authButtons.classList.toggle('show');
    });
  }
}

// Open project modal with details
function openProjectModal(projectId) {
  const project = Database.getProjectById(projectId);
  if (!project) return;
  
  displayProjectDetails(project);
  displayApplicants(projectId);
  
  projectModal.style.display = 'block';
}

// Display project details in modal
function displayProjectDetails(project) {
  // Format the posted date
  const postedDate = new Date(project.postedDate);
  const formattedDate = postedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Format category display name
  const categoryDisplayNames = {
    'web-development': 'Web Development',
    'mobile-app': 'Mobile App',
    'design': 'Design',
    'marketing': 'Marketing',
    'writing': 'Writing'
  };
  
  const categoryDisplay = categoryDisplayNames[project.category] || project.category;
  
  projectDetails.innerHTML = `
    <div class="project-detail-header">
      <h2>${project.title}</h2>
      <div class="project-detail-meta">
        <span><i class="fas fa-tag"></i> ${categoryDisplay}</span>
        <span><i class="fas fa-dollar-sign"></i> $${project.budget}</span>
        <span><i class="far fa-clock"></i> ${project.duration}</span>
        <span><i class="far fa-calendar-alt"></i> Posted: ${formattedDate}</span>
      </div>
    </div>
    <div class="project-detail-description">
      <p>${project.description}</p>
    </div>
    <div class="project-requirements">
      <h4>Required Skills:</h4>
      <div class="skills-container">
        ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
      
      <h4>Requirements:</h4>
      <ul>
        ${project.requirements.map(req => `<li>${req}</li>`).join('')}
      </ul>
    </div>
    <div class="project-actions">
      <button class="btn btn-primary" onclick="document.getElementById('project-id').value = '${project.id}'; document.getElementById('apply').scrollIntoView({behavior: 'smooth'});">Apply for this Project</button>
    </div>
  `;
}

// Display applicants for a project
function displayApplicants(projectId) {
  // Get filtered applications
  const filteredApplications = AIFilter.filterApplicationsForProject(projectId);
  
  if (filteredApplications.length === 0) {
    applicantsList.innerHTML = `
      <div class="no-applicants">
        <p>No applications have been submitted for this project yet.</p>
      </div>
    `;
    return;
  }
  
  // Display filtered applications
  applicantsList.innerHTML = '';
  
  filteredApplications.forEach(application => {
    const applicantCard = createApplicantCard(application);
    applicantsList.appendChild(applicantCard);
  });
}

// Create an applicant card element
function createApplicantCard(application) {
  const card = document.createElement('div');
  card.className = 'applicant-card';
  
  // Get initials for avatar
  const nameWords = application.fullname.split(' ');
  const initials = nameWords.length > 1 
    ? (nameWords[0][0] + nameWords[1][0]).toUpperCase()
    : nameWords[0].substring(0, 2).toUpperCase();

  // Format skills
  const skillsHtml = application.skills
    .slice(0, 5)
    .map(skill => `<span class="skill-tag">${skill}</span>`)
    .join('');
  
  card.innerHTML = `
    <span class="ai-match-score">${application.aiScore}% Match</span>
    <div class="applicant-header">
      <div class="applicant-avatar">${initials}</div>
      <div class="applicant-info">
        <h4>${application.fullname}</h4>
        <div class="applicant-meta">
          <span><i class="fas fa-briefcase"></i> ${application.experience} years</span>
          <span><i class="fas fa-calendar-day"></i> Applied: ${application.submissionDate}</span>
        </div>
      </div>
    </div>
    <div class="applicant-skills">
      ${skillsHtml}
      ${application.skills.length > 5 ? `<span class="skill-tag">+${application.skills.length - 5} more</span>` : ''}
    </div>
    <p>${truncateText(application.coverLetter, 200)}</p>
    <button class="btn btn-secondary view-profile-btn">View Full Profile</button>
  `;
  
  return card;
}

// Handle freelancer application submission
function handleApplicationSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = {
    fullname: document.getElementById('fullname').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    projectId: document.getElementById('project-id').value,
    experience: document.getElementById('experience').value,
    skills: AIFilter.parseSkills(document.getElementById('skills').value),
    education: document.getElementById('education').value,
    portfolio: document.getElementById('portfolio').value,
    previousProjects: document.getElementById('previous-projects').value,
    coverLetter: document.getElementById('cover-letter').value
  };
  
  // Add the application
  Database.addApplication(formData);
  
  // Reset form
  freelancerForm.reset();
  
  // Show success modal
  successModal.style.display = 'block';
}

// Add responsive classes for navigation
function toggleResponsiveNav() {
  const nav = document.querySelector('.navbar');
  if (nav.classList.contains('responsive')) {
    nav.classList.remove('responsive');
  } else {
    nav.classList.add('responsive');
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
