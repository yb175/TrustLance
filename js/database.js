/**
 * In-Memory Database for FreelanceAI
 * 
 * This module provides client-side data storage and retrieval functionality
 * using browser's localStorage for persistence between sessions.
 */

const Database = (function() {
  // Initial data structure
  const initialData = {
    projects: [
      {
        id: "p1",
        title: "E-commerce Website Redesign",
        category: "web-development",
        description: "Looking for an experienced web developer to redesign our e-commerce platform with modern UI and improved user experience.",
        budget: 2500,
        duration: "4 weeks",
        skills: ["HTML", "CSS", "JavaScript", "React", "UI/UX"],
        postedDate: "2023-05-15",
        requirements: [
          "Minimum 3 years of experience with React",
          "Strong portfolio of e-commerce websites",
          "Experience with responsive design",
          "Knowledge of SEO best practices",
          "Ability to integrate with REST APIs"
        ],
        applications: []
      },
      {
        id: "p2",
        title: "Mobile App Development for Fitness Tracking",
        category: "mobile-app",
        description: "We need a skilled mobile developer to create a fitness tracking app that monitors workouts, nutrition, and provides personalized recommendations.",
        budget: 5000,
        duration: "8 weeks",
        skills: ["React Native", "iOS", "Android", "API Integration", "UX Design"],
        postedDate: "2023-05-10",
        requirements: [
          "Experience with React Native development",
          "Portfolio of published mobile apps",
          "Knowledge of fitness tracking principles",
          "Experience with health-related APIs",
          "Strong UI/UX skills"
        ],
        applications: []
      },
      {
        id: "p3",
        title: "Content Writing for Tech Blog",
        category: "writing",
        description: "Seeking a tech-savvy content writer to create engaging articles for our technology blog. Topics include AI, software development, and tech industry trends.",
        budget: 800,
        duration: "Ongoing",
        skills: ["Content Writing", "SEO", "Technology Knowledge", "Research"],
        postedDate: "2023-05-18",
        requirements: [
          "Excellent writing and grammar skills",
          "Knowledge of technology trends",
          "SEO optimization expertise",
          "Ability to explain complex topics in simple terms",
          "Experience with WordPress"
        ],
        applications: []
      },
      {
        id: "p4",
        title: "Brand Identity Design for Startup",
        category: "design",
        description: "A fintech startup needs complete brand identity design including logo, color palette, typography, and basic brand guidelines.",
        budget: 1800,
        duration: "3 weeks",
        skills: ["Logo Design", "Brand Identity", "Typography", "Adobe Creative Suite"],
        postedDate: "2023-05-12",
        requirements: [
          "Professional experience in brand identity design",
          "Strong portfolio with similar projects",
          "Understanding of fintech industry",
          "Creative approach to visual storytelling",
          "Ability to deliver in multiple formats"
        ],
        applications: []
      },
      {
        id: "p5",
        title: "Social Media Marketing Campaign",
        category: "marketing",
        description: "Looking for a social media marketing expert to create and execute a 3-month campaign to increase our brand awareness and engagement.",
        budget: 3000,
        duration: "3 months",
        skills: ["Social Media Strategy", "Content Creation", "Analytics", "Paid Advertising"],
        postedDate: "2023-05-08",
        requirements: [
          "Proven track record in social media growth",
          "Experience with Facebook, Instagram, Twitter, and LinkedIn campaigns",
          "Knowledge of social media analytics",
          "Content creation skills",
          "Understanding of paid social advertising"
        ],
        applications: []
      },
      {
        id: "p6",
        title: "Full-Stack Developer for SaaS Platform",
        category: "web-development",
        description: "We're building a SaaS platform for project management and need a full-stack developer to help with feature development and optimization.",
        budget: 4500,
        duration: "10 weeks",
        skills: ["JavaScript", "Node.js", "React", "MongoDB", "AWS"],
        postedDate: "2023-05-05",
        requirements: [
          "Strong full-stack development experience",
          "Experience with Node.js and React",
          "Database design and implementation",
          "Understanding of cloud architecture",
          "Experience with agile development"
        ],
        applications: []
      }
    ],
    freelancers: [
      {
        id: "f1",
        name: "Alex Johnson",
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
        experience: 5,
        education: "Bachelor's in Computer Science, Full Stack Web Development Bootcamp",
        previousProjects: "Built e-commerce platforms for 3 retail clients, developed a social media dashboard with analytics, created a real-time chat application",
        applications: []
      },
      {
        id: "f2",
        name: "Sarah Williams",
        skills: ["UI/UX Design", "Adobe XD", "Figma", "HTML", "CSS", "Sketch"],
        experience: 4,
        education: "Master's in Interaction Design, Google UX Design Certificate",
        previousProjects: "Redesigned mobile banking app increasing user engagement by 40%, created UI for fitness tracking app, designed e-learning platform interface",
        applications: []
      },
      {
        id: "f3",
        name: "Michael Chen",
        skills: ["React Native", "iOS", "Android", "Firebase", "REST APIs"],
        experience: 6,
        education: "Bachelor's in Software Engineering, Mobile App Development Certification",
        previousProjects: "Developed food delivery app with 50,000+ downloads, created fitness tracking app for major gym chain, built augmented reality shopping app",
        applications: []
      },
      {
        id: "f4",
        name: "Emily Rodriguez",
        skills: ["Content Writing", "SEO", "Blogging", "Copywriting", "Research"],
        experience: 3,
        education: "Bachelor's in English Literature, Content Marketing Certification",
        previousProjects: "Wrote technical articles for 5 SaaS companies, created content strategy for e-commerce brand, managed tech blog with 100k monthly visitors",
        applications: []
      },
      {
        id: "f5",
        name: "David Kim",
        skills: ["Logo Design", "Brand Identity", "Typography", "Illustration", "Adobe Creative Suite"],
        experience: 7,
        education: "BFA in Graphic Design, Brand Strategy Certification",
        previousProjects: "Designed brand identity for tech startup that secured $2M funding, created logo for national retail chain, rebranded financial services company",
        applications: []
      }
    ],
    applications: []
  };
  
  // Initialize data in localStorage if not present
  function initializeData() {
    if (!localStorage.getItem('freelanceAIData')) {
      localStorage.setItem('freelanceAIData', JSON.stringify(initialData));
    }
  }
  
  // Get all data
  function getData() {
    initializeData();
    return JSON.parse(localStorage.getItem('freelanceAIData'));
  }
  
  // Save data
  function saveData(data) {
    localStorage.setItem('freelanceAIData', JSON.stringify(data));
  }
  
  // Get all projects
  function getProjects() {
    return getData().projects;
  }
  
  // Get project by ID
  function getProjectById(id) {
    return getProjects().find(project => project.id === id);
  }
  
  // Get filtered projects
  function getFilteredProjects(category, budget) {
    let projects = getProjects();
    
    if (category && category !== 'all') {
      projects = projects.filter(project => project.category === category);
    }
    
    if (budget && budget !== 'all') {
      if (budget === '0-500') {
        projects = projects.filter(project => project.budget <= 500);
      } else if (budget === '500-1000') {
        projects = projects.filter(project => project.budget > 500 && project.budget <= 1000);
      } else if (budget === '1000-5000') {
        projects = projects.filter(project => project.budget > 1000 && project.budget <= 5000);
      } else if (budget === '5000+') {
        projects = projects.filter(project => project.budget > 5000);
      }
    }
    
    return projects;
  }
  
  // Get all freelancers
  function getFreelancers() {
    return getData().freelancers;
  }
  
  // Get freelancer by ID
  function getFreelancerById(id) {
    return getFreelancers().find(freelancer => freelancer.id === id);
  }
  
  // Add new application
  function addApplication(application) {
    const data = getData();
    
    // Generate unique ID
    application.id = 'a' + (data.applications.length + 1);
    application.submissionDate = new Date().toISOString().split('T')[0];
    application.aiScore = 0; // Will be calculated by the AI filter
    
    // Add to applications array
    data.applications.push(application);
    
    // Update project's applications array
    if (application.projectId) {
      const project = data.projects.find(p => p.id === application.projectId);
      if (project) {
        project.applications.push(application.id);
      }
    }
    
    saveData(data);
    return application;
  }
  
  // Get applications for a project
  function getApplicationsForProject(projectId) {
    const data = getData();
    const project = data.projects.find(p => p.id === projectId);
    
    if (!project || !project.applications.length) {
      return [];
    }
    
    return data.applications.filter(app => project.applications.includes(app.id));
  }
  
  // Public API
  return {
    getProjects,
    getProjectById,
    getFilteredProjects,
    getFreelancers,
    getFreelancerById,
    addApplication,
    getApplicationsForProject
  };
})();
