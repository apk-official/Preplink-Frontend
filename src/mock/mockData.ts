// src/data/mockData.ts

export const mockUserData = {
  user_id: 1,
  name: "John Doe",
  email: "johndoe@gmail.com",
  user_type: "tester",
  credits: 5,
};

export const mockProjects = [
  {
    id: 1,
    company: "De'Lead International",
    position: "Software Developer",
    date: "2025-10-05",
    time: "1:00pm",
  },
  {
    id: 2,
    company: "TechNova",
    position: "Frontend Engineer",
    date: "2025-10-10",
    time: "3:00pm",
  },
];

export const mockProjectDetails = {
  1: {
    interview_questions: [
      {
        question: "Explain about yourself",
        answer:
          "I'm a software engineer with experience in building scalable applications...",
        type: "Generic Question",
      },
      {
        question: "How would you design a feature for students?",
        answer: "I'd use a progress tracking system with visual indicators...",
        type: "Generic Question",
      },
      {
        question: "How would you design a systems?",
        answer: "I use MVP....",
        type: "Tech Questions",
      },
    ],
    interview_tips: [
      "Demonstrate problem-solving ability by clearly explaining your thought process step by step, especially when answering technical or scenario-based questions that require structured reasoning and logical breakdown.",
      "Research the company",
      "Mock interviews help",
    ],
    about_company: {
      about: "De'Lead is a leading ed-tech firm.",
      about_url: "https://example.com",
      vision: "Empower students globally.",
      vision_url: "https://example.com",
      mission: "Deliver quality education through tech.",
      mission_url: "https://example.com",
      additional: "They recently launched a Python bootcamp.",
      additional_url: "https://example.com",
    },
  },
  2: {
    interview_questions: [],
    interview_tips: [],
    about_company: {
      about: "TechNova builds enterprise-grade UIs.",
      about_url: "https://example.com",
      vision: "Redefine frontend engineering.",
      vision_url: "https://example.com",
      mission: "Innovation through design.",
      mission_url: "https://example.com",
      additional: "Open-source contributor in web tools.",
      additional_url: "https://example.com",
    },
  },
};
