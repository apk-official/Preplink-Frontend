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
        type:"Generic Question"
      },
      {
        question: "How would you design a feature for students?",
          answer: "I'd use a progress tracking system with visual indicators...",
        type:"Generic Question"
      },
      {
        question: "How would you design a systems?",
          answer: "I use MVP....",
        type:"Tech Questions"
      },
    ],
    interview_tips: ["Be confident", "Research the company", "Mock interviews help"],
    about_company: {
      about: "De'Lead is a leading ed-tech firm.",
      vision: "Empower students globally.",
      mission: "Deliver quality education through tech.",
      additional: "They recently launched a Python bootcamp.",
    },
  },
  2: {
    interview_questions: [],
    interview_tips: [],
    about_company: {
      about: "TechNova builds enterprise-grade UIs.",
      vision: "Redefine frontend engineering.",
      mission: "Innovation through design.",
      additional: "Open-source contributor in web tools.",
    },
  },
};
