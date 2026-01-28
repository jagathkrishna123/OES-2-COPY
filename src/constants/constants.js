import notes7 from '../assets/notes7.pdf'
import notes8 from '../assets/notes8.pdf'
import notes9 from '../assets/notes9.pdf'
import notes10 from '../assets/notes10.pdf'

export const teacherDashboard_data = {
  totalsubjects: 12,
  totalstudents: 3,
  evaluatedpapers: 9,
  pendingevaluation: 240,
  attendance: 180,
  notifications: 95
};

export const evaluationDashboard = [
  {
    id: 1,
    subject: "Advanced Calculus",
    department: "Dept. of Mathematics",
    pendingPapers: 87,
    totalPapers: 120,
    evaluatedPapers: 33,
    dueInDays: 5,
    status: "pending", // pending | completed
    action: "Start Evaluating",
  },
  {
    id: 2,
    subject: "Digital Signal Processing",
    department: "Electrical Engineering",
    pendingPapers: 112,
    totalPapers: 120,
    evaluatedPapers: 8,
    dueInDays: 2,
    status: "pending",
    action: "Continue",
  },
  {
    id: 3,
    subject: "Quantum Physics",
    department: "Dept. of Physics",
    pendingPapers: 45,
    totalPapers: 50,
    evaluatedPapers: 5,
    dueInDays: 15,
    status: "pending",
    action: "Start Evaluating",
  },
  {
    id: 4,
    subject: "Organic Chemistry",
    department: "Dept. of Chemistry",
    pendingPapers: 0,
    totalPapers: 75,
    evaluatedPapers: 75,
    dueInDays: null,
    status: "completed",
    action: "View Report",
  },
  {
    id: 5,
    subject: "Modern European History",
    department: "Dept. of History",
    pendingPapers: 23,
    totalPapers: 100,
    evaluatedPapers: 77,
    dueInDays: 11,
    status: "pending",
    action: "Continue",
  },
];






export const studentsData = {
  1: [ // Advanced Calculus
    {
      id: 1,
      name: "Aarav Nair",
      roll: "AC001",
      status: "Pending"
    },
    {
      id: 2,
      name: "Diya Varma",
      roll: "AC002",
      status: "Completed"
    },
    {
      id: 3,
      name: "Kavya Krishna",
      roll: "AC003",
      status: "In Progress"
    }
  ],

  2: [ // Digital Signal Processing
    {
      id: 4,
      name: "Noah Mathew",
      roll: "DSP001",
      status: "Pending"
    },
    {
      id: 5,
      name: "Meera Ramesh",
      roll: "DSP002",
      status: "Completed"
    }
  ],

  3: [ // Quantum Physics
    {
      id: 6,
      name: "Ananya Joseph",
      roll: "QP001",
      status: "Pending"
    }
  ],

  4: [ // Organic Chemistry
    {
      id: 7,
      name: "Vishnu S",
      roll: "OC001",
      status: "Completed"
    },
    {
      id: 8,
      name: "Sneha Raj",
      roll: "OC002",
      status: "Completed"
    }
  ],

  5: [ // Modern European History
    {
      id: 9,
      name: "Rahul Menon",
      roll: "HIS001",
      status: "Pending"
    },
    {
      id: 10,
      name: "Adithya Pillai",
      roll: "HIS002",
      status: "In Progress"
    }
  ]
};

export const DEPARTMENTDATAS = [
  {
    name: "CSE",
    years: {
      "1st Year": ["Engineering Mathematics", "C Programming", "Digital Logic"],
      "2nd Year": ["Data Structures", "Operating Systems", "DBMS"],
      "3rd Year": ["Computer Networks", "AI", "Web Technologies"],
      "4th Year": ["Machine Learning", "Cloud Computing", "Cyber Security"],
    },
  },
  {
    name: "ECE",
    years: {
      "1st Year": ["Engineering Mathematics", "Basic Electronics"],
      "2nd Year": ["Analog Circuits", "Digital Electronics"],
      "3rd Year": ["Communication Systems", "VLSI Design"],
      "4th Year": ["Embedded Systems", "IoT"],
    },
  },
  {
    name: "EEE",
    years: {
      "1st Year": ["Engineering Mathematics", "Basic Electrical Engineering"],
      "2nd Year": ["Electrical Machines", "Measurements"],
      "3rd Year": ["Power Systems", "Control Systems"],
      "4th Year": ["Renewable Energy", "Smart Grid"],
    },
  },
  {
    name: "ME",
    years: {
      "1st Year": ["Engineering Mathematics", "Engineering Mechanics"],
      "2nd Year": ["Thermodynamics", "Fluid Mechanics"],
      "3rd Year": ["Machine Design", "Manufacturing Technology"],
      "4th Year": ["CAD/CAM", "Robotics"],
    },
  },
  {
    name: "CE",
    years: {
      "1st Year": ["Engineering Mathematics", "Engineering Drawing"],
      "2nd Year": ["Structural Analysis", "Geotechnical Engineering"],
      "3rd Year": ["Transportation Engineering", "Environmental Engineering"],
      "4th Year": ["Concrete Technology", "Construction Planning"],
    },
  },
  {
    name: "IT",
    years: {
      "1st Year": ["Programming Fundamentals", "Discrete Mathematics"],
      "2nd Year": ["Object Oriented Programming", "DBMS"],
      "3rd Year": ["Software Engineering", "Web Development"],
      "4th Year": ["Big Data Analytics", "Cloud Services"],
    },
  },
  {
    name: "AI & DS",
    years: {
      "1st Year": ["Linear Algebra", "Python Programming"],
      "2nd Year": ["Data Structures", "Probability & Statistics"],
      "3rd Year": ["Machine Learning", "Data Mining"],
      "4th Year": ["Deep Learning", "AI Ethics"],
    },
  },
  {
    name: "AI & ML",
    years: {
      "1st Year": ["Mathematics for AI", "Python"],
      "2nd Year": ["Data Structures", "Statistics"],
      "3rd Year": ["Machine Learning", "Neural Networks"],
      "4th Year": ["Natural Language Processing", "Computer Vision"],
    },
  },
  {
    name: "CSBS",
    years: {
      "1st Year": ["Business Mathematics", "Programming Basics"],
      "2nd Year": ["Data Structures", "Business Analytics"],
      "3rd Year": ["AI for Business", "Financial Technology"],
      "4th Year": ["Digital Transformation", "Enterprise Systems"],
    },
  },
  {
    name: "MECHATRONICS",
    years: {
      "1st Year": ["Engineering Mathematics", "Basic Electronics"],
      "2nd Year": ["Mechanical Systems", "Sensors & Actuators"],
      "3rd Year": ["Control Systems", "Embedded Systems"],
      "4th Year": ["Industrial Automation", "Robotics"],
    },
  },
];


export const TEACHERSDATA = [
  {
    id: "T001",
    teacherId: "T001",
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@cse.edu",
    password: "teacher123",
    department: "CSE",
    createdAt: "2024-01-15T10:30:00Z",
    status: "active",
  },
  {
    id: "T002",
    teacherId: "T002",
    name: "Prof. Meera Sharma",
    email: "meera.sharma@ece.edu",
    password: "teacher123",
    department: "ECE",
    createdAt: "2024-01-20T14:15:00Z",
    status: "active",
  },
  {
    id: "T003",
    teacherId: "T003",
    name: "Dr. Amit Singh",
    email: "amit.singh@me.edu",
    password: "teacher123",
    department: "ME",
    createdAt: "2024-02-01T09:45:00Z",
    status: "active",
  },
  {
    id: "T004",
    teacherId: "T004",
    name: "Prof. Priya Patel",
    email: "priya.patel@eee.edu",
    password: "teacher123",
    department: "EEE",
    createdAt: "2024-02-10T11:20:00Z",
    status: "active",
  },
  {
    id: "T005",
    teacherId: "T005",
    name: "Dr. Vikram Rao",
    email: "vikram.rao@ce.edu",
    password: "teacher123",
    department: "CE",
    createdAt: "2024-02-15T16:30:00Z",
    status: "active",
  },
  {
    id: "T006",
    teacherId: "T006",
    name: "Prof. Kavya Nair",
    email: "kavya.nair@it.edu",
    password: "teacher123",
    department: "IT",
    createdAt: "2024-03-01T13:10:00Z",
    status: "active",
  },
  {
    id: "T007",
    teacherId: "T007",
    name: "Dr. Arjun Menon",
    email: "arjun.menon@aiml.edu",
    password: "teacher123",
    department: "AI & ML",
    createdAt: "2024-03-10T10:45:00Z",
    status: "blocked",
  },
  {
    id: "T008",
    teacherId: "T008",
    name: "Prof. Sneha Gupta",
    email: "sneha.gupta@aids.edu",
    password: "teacher123",
    department: "AI & DS",
    createdAt: "2024-03-15T15:20:00Z",
    status: "active",
  },
  {
    id: "T009",
    teacherId: "T009",
    name: "Dr. Rohan Jain",
    email: "rohan.jain@csbs.edu",
    password: "teacher123",
    department: "CSBS",
    createdAt: "2024-03-20T12:00:00Z",
    status: "active",
  },
  {
    id: "T010",
    teacherId: "T010",
    name: "Prof. Anjali Reddy",
    email: "anjali.reddy@mech.edu",
    password: "teacher123",
    department: "MECHATRONICS",
    createdAt: "2024-03-25T14:30:00Z",
    status: "blocked",
  },
];





// Global storage for File objects (persists during session)
const fileStorage = new Map();

// Function to store a file
export const storeFile = (key, file) => {
  fileStorage.set(key, file);
};

// Function to get a stored file
export const getStoredFile = (key) => {
  return fileStorage.get(key);
};

// Function to add new exam
export const addNewExam = (exam) => {
  // Store exam data directly in localStorage (Base64 strings are serializable)
  const existing = JSON.parse(localStorage.getItem("dynamicExams") || "[]");
  const updated = [...existing, exam];
  localStorage.setItem("dynamicExams", JSON.stringify(updated));
};

// Function to get dynamic exams (returns exams with Base64 data)
export const getDynamicExams = () => {
  return JSON.parse(localStorage.getItem("dynamicExams") || "[]");
};

// Function to update an exam in localStorage
export const updateExam = (updatedExam) => {
  const existing = JSON.parse(localStorage.getItem("dynamicExams") || "[]");
  const updated = existing.map(exam =>
    exam.id === updatedExam.id ? {
      ...updatedExam,
      questionPaperFile: undefined,
      answerKeyFile: undefined,
      students: updatedExam.students.map(s => ({ ...s, answerSheetFile: undefined }))
    } : exam
  );
  localStorage.setItem("dynamicExams", JSON.stringify(updated));
};

// Function to get all exams (for backwards compatibility)
export const getAllExams = () => {
  return getDynamicExams();
};

// For backwards compatibility
export const DYNAMIC_EXAMDATA = {
  get value() {
    return getDynamicExams();
  },
  push(exam) {
    addNewExam(exam);
  },
  get length() {
    return getDynamicExams().length;
  }
};


export const STUDENTDATA = [
  // CSE Department - 5 Students
  {
    id: "STD001",
    studentName: "Arjun Kumar",
    studentRoll: "CSE101",
    department: "CSE",
    year: "1st Year",
    teacherId: "T001",
  },
  {
    id: "STD002",
    studentName: "Meera Nair",
    studentRoll: "CSE205",
    department: "CSE",
    year: "2nd Year",
    teacherId: "T001",
  },
  {
    id: "STD003",
    studentName: "Rohan Gupta",
    studentRoll: "CSE308",
    department: "CSE",
    year: "3rd Year",
    teacherId: "T001",
  },
  {
    id: "STD004",
    studentName: "Priya Sharma",
    studentRoll: "CSE412",
    department: "CSE",
    year: "4th Year",
    teacherId: "T001",
  },
  {
    id: "STD005",
    studentName: "Vikram Singh",
    studentRoll: "CSE156",
    department: "CSE",
    year: "1st Year",
    teacherId: "T001",
  },

  // ECE Department - 5 Students
  {
    id: "STD006",
    studentName: "Rahul Sharma",
    studentRoll: "ECE110",
    department: "ECE",
    year: "1st Year",
    teacherId: "T002",
  },
  {
    id: "STD007",
    studentName: "Sneha Patel",
    studentRoll: "ECE312",
    department: "ECE",
    year: "3rd Year",
    teacherId: "T002",
  },
  {
    id: "STD008",
    studentName: "Amit Kumar",
    studentRoll: "ECE207",
    department: "ECE",
    year: "2nd Year",
    teacherId: "T002",
  },
  {
    id: "STD009",
    studentName: "Kavya Menon",
    studentRoll: "ECE409",
    department: "ECE",
    year: "4th Year",
    teacherId: "T002",
  },
  {
    id: "STD010",
    studentName: "Suresh Nair",
    studentRoll: "ECE163",
    department: "ECE",
    year: "1st Year",
    teacherId: "T002",
  },

  // EEE Department - 5 Students
  {
    id: "STD011",
    studentName: "Karthik R",
    studentRoll: "EEE301",
    department: "EEE",
    year: "3rd Year",
    teacherId: "T004",
  },
  {
    id: "STD012",
    studentName: "Anjali Verma",
    studentRoll: "EEE102",
    department: "EEE",
    year: "1st Year",
    teacherId: "T004",
  },
  {
    id: "STD013",
    studentName: "Rajesh Kumar",
    studentRoll: "EEE214",
    department: "EEE",
    year: "2nd Year",
    teacherId: "T004",
  },
  {
    id: "STD014",
    studentName: "Meena Iyer",
    studentRoll: "EEE406",
    department: "EEE",
    year: "4th Year",
    teacherId: "T004",
  },
  {
    id: "STD015",
    studentName: "Deepak Sharma",
    studentRoll: "EEE358",
    department: "EEE",
    year: "3rd Year",
    teacherId: "T004",
  },

  // ME Department - 5 Students
  {
    id: "STD016",
    studentName: "Vishal Singh",
    studentRoll: "ME201",
    department: "ME",
    year: "2nd Year",
    teacherId: "T003",
  },
  {
    id: "STD017",
    studentName: "Ananya Das",
    studentRoll: "ME402",
    department: "ME",
    year: "4th Year",
    teacherId: "T003",
  },
  {
    id: "STD018",
    studentName: "Ravi Prasad",
    studentRoll: "ME103",
    department: "ME",
    year: "1st Year",
    teacherId: "T003",
  },
  {
    id: "STD019",
    studentName: "Latha Krishnan",
    studentRoll: "ME315",
    department: "ME",
    year: "3rd Year",
    teacherId: "T003",
  },
  {
    id: "STD020",
    studentName: "Mohan Reddy",
    studentRoll: "ME267",
    department: "ME",
    year: "2nd Year",
    teacherId: "T003",
  },

  // CE Department - 5 Students
  {
    id: "STD021",
    studentName: "Pooja Verma",
    studentRoll: "CE102",
    department: "CE",
    year: "1st Year",
    teacherId: "T005",
  },
  {
    id: "STD022",
    studentName: "Arun Kumar",
    studentRoll: "CE208",
    department: "CE",
    year: "2nd Year",
    teacherId: "T005",
  },
  {
    id: "STD023",
    studentName: "Sarita Jain",
    studentRoll: "CE309",
    department: "CE",
    year: "3rd Year",
    teacherId: "T005",
  },
  {
    id: "STD024",
    studentName: "Venkatesh Iyer",
    studentRoll: "CE401",
    department: "CE",
    year: "4th Year",
    teacherId: "T005",
  },
  {
    id: "STD025",
    studentName: "Nandini Rao",
    studentRoll: "CE174",
    department: "CE",
    year: "1st Year",
    teacherId: "T005",
  },

  // IT Department - 5 Students
  {
    id: "STD026",
    studentName: "Nikhil Menon",
    studentRoll: "IT304",
    department: "IT",
    year: "3rd Year",
    teacherId: "T006",
  },
  {
    id: "STD027",
    studentName: "Kiran Joshi",
    studentRoll: "IT105",
    department: "IT",
    year: "1st Year",
    teacherId: "T006",
  },
  {
    id: "STD028",
    studentName: "Swathi Nair",
    studentRoll: "IT212",
    department: "IT",
    year: "2nd Year",
    teacherId: "T006",
  },
  {
    id: "STD029",
    studentName: "Harish Kumar",
    studentRoll: "IT407",
    department: "IT",
    year: "4th Year",
    teacherId: "T006",
  },
  {
    id: "STD030",
    studentName: "Rekha Singh",
    studentRoll: "IT368",
    department: "IT",
    year: "3rd Year",
    teacherId: "T006",
  },

  // AI & DS Department - 5 Students
  {
    id: "STD031",
    studentName: "Divya S",
    studentRoll: "AIDS106",
    department: "AI & DS",
    year: "1st Year",
    teacherId: "T008",
  },
  {
    id: "STD032",
    studentName: "Ramesh Gupta",
    studentRoll: "AIDS213",
    department: "AI & DS",
    year: "2nd Year",
    teacherId: "T008",
  },
  {
    id: "STD033",
    studentName: "Priyanka Jain",
    studentRoll: "AIDS318",
    department: "AI & DS",
    year: "3rd Year",
    teacherId: "T008",
  },
  {
    id: "STD034",
    studentName: "Sanjay Patel",
    studentRoll: "AIDS405",
    department: "AI & DS",
    year: "4th Year",
    teacherId: "T008",
  },
  {
    id: "STD035",
    studentName: "Megha Reddy",
    studentRoll: "AIDS179",
    department: "AI & DS",
    year: "1st Year",
    teacherId: "T008",
  },

  // AI & ML Department - 5 Students
  {
    id: "STD036",
    studentName: "Divya S",
    studentRoll: "AIML107",
    department: "AI & ML",
    year: "1st Year",
    teacherId: "T007",
  },
  {
    id: "STD037",
    studentName: "Ankit Sharma",
    studentRoll: "AIML214",
    department: "AI & ML",
    year: "2nd Year",
    teacherId: "T007",
  },
  {
    id: "STD038",
    studentName: "Poonam Gupta",
    studentRoll: "AIML319",
    department: "AI & ML",
    year: "3rd Year",
    teacherId: "T007",
  },
  {
    id: "STD039",
    studentName: "Ravi Kumar",
    studentRoll: "AIML401",
    department: "AI & ML",
    year: "4th Year",
    teacherId: "T007",
  },
  {
    id: "STD040",
    studentName: "Shweta Singh",
    studentRoll: "AIML282",
    department: "AI & ML",
    year: "2nd Year",
    teacherId: "T007",
  },

  // CSBS Department - 5 Students
  {
    id: "STD041",
    studentName: "Amit Patel",
    studentRoll: "CSBS108",
    department: "CSBS",
    year: "1st Year",
    teacherId: "T009",
  },
  {
    id: "STD042",
    studentName: "Neha Jain",
    studentRoll: "CSBS215",
    department: "CSBS",
    year: "2nd Year",
    teacherId: "T009",
  },
  {
    id: "STD043",
    studentName: "Vivek Kumar",
    studentRoll: "CSBS320",
    department: "CSBS",
    year: "3rd Year",
    teacherId: "T009",
  },
  {
    id: "STD044",
    studentName: "Kavita Sharma",
    studentRoll: "CSBS403",
    department: "CSBS",
    year: "4th Year",
    teacherId: "T009",
  },
  {
    id: "STD045",
    studentName: "Rahul Verma",
    studentRoll: "CSBS193",
    department: "CSBS",
    year: "1st Year",
    teacherId: "T009",
  },

  // MECHATRONICS Department - 5 Students
  {
    id: "STD046",
    studentName: "Suresh Babu",
    studentRoll: "MECH109",
    department: "MECHATRONICS",
    year: "1st Year",
    teacherId: "T010",
  },
  {
    id: "STD047",
    studentName: "Latha Subramanian",
    studentRoll: "MECH216",
    department: "MECHATRONICS",
    year: "2nd Year",
    teacherId: "T010",
  },
  {
    id: "STD048",
    studentName: "Arun Prakash",
    studentRoll: "MECH321",
    department: "MECHATRONICS",
    year: "3rd Year",
    teacherId: "T010",
  },
  {
    id: "STD049",
    studentName: "Priya Narayanan",
    studentRoll: "MECH404",
    department: "MECHATRONICS",
    year: "4th Year",
    teacherId: "T010",
  },
  {
    id: "STD050",
    studentName: "Karthik Raja",
    studentRoll: "MECH287",
    department: "MECHATRONICS",
    year: "2nd Year",
    teacherId: "T010",
  },
];

