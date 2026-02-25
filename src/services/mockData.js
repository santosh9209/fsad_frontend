export const careers = [
    {
        id: 'c1',
        title: 'Software Engineer',
        category: 'IT',
        description: 'Design, develop, and maintain software applications and systems.',
        skillsRequired: ['JavaScript', 'React', 'Node.js', 'Problem Solving'],
        averageSalary: '₹80,000',
        growthScope: 'Excellent (22% projected growth)'
    },
    {
        id: 'c2',
        title: 'Data Scientist',
        category: 'IT',
        description: 'Analyze complex data to help organizations make better decisions.',
        skillsRequired: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
        averageSalary: '₹90,000',
        growthScope: 'Very High (35% projected growth)'
    },
    {
        id: 'c3',
        title: 'Registered Nurse',
        category: 'Medical',
        description: 'Provide and coordinate patient care, educate patients, and offer advice.',
        skillsRequired: ['Patient Care', 'CPR', 'Communication', 'Empathy'],
        averageSalary: '₹50,000',
        growthScope: 'High (12% projected growth)'
    },
    {
        id: 'c4',
        title: 'Financial Analyst',
        category: 'Business',
        description: 'Guide businesses and individuals in investment decisions.',
        skillsRequired: ['Financial Modeling', 'Excel', 'Accounting', 'Analysis'],
        averageSalary: '₹60,000',
        growthScope: 'Moderate (6% projected growth)'
    },
    {
        id: 'c5',
        title: 'Graphic Designer',
        category: 'Arts',
        description: 'Create visual concepts to communicate ideas that inspire and inform.',
        skillsRequired: ['Adobe Creative Suite', 'Typography', 'Creativity', 'UI/UX'],
        averageSalary: '₹40,000',
        growthScope: 'Moderate (3% projected growth)'
    },
    {
        id: 'c6',
        title: 'Civil Engineer',
        category: 'Engineering',
        description: 'Design, build, and supervise infrastructure projects and systems.',
        skillsRequired: ['AutoCAD', 'Project Management', 'Mathematics', 'Physics'],
        averageSalary: '₹65,000',
        growthScope: 'Good (8% projected growth)'
    },
    {
        id: 'c7',
        title: 'Marketing Manager',
        category: 'Business',
        description: 'Plan, direct, or coordinate marketing policies and programs.',
        skillsRequired: ['Digital Marketing', 'SEO', 'Communication', 'Strategy'],
        averageSalary: '₹95,000',
        growthScope: 'High (10% projected growth)'
    },
    {
        id: 'c8',
        title: 'UI/UX Designer',
        category: 'IT',
        description: 'Create user-friendly interfaces and improve user experiences for digital products.',
        skillsRequired: ['Figma', 'Prototyping', 'User Research', 'Wireframing'],
        averageSalary: '₹70,000',
        growthScope: 'Very High (16% projected growth)'
    },
    {
        id: 'c9',
        title: 'Physical Therapist',
        category: 'Medical',
        description: 'Help injured or ill people improve movement and manage pain.',
        skillsRequired: ['Anatomy', 'Patient Experience', 'Rehabilitation', 'Communication'],
        averageSalary: '₹72,000',
        growthScope: 'Excellent (15% projected growth)'
    },
    {
        id: 'c10',
        title: 'Architect',
        category: 'Engineering',
        description: 'Plan and design structures, such as private residences, office buildings, and theaters.',
        skillsRequired: ['Designing', 'AutoCAD', 'Creative Problem Solving', 'Model Building'],
        averageSalary: '₹62,000',
        growthScope: 'Moderate (3% projected growth)'
    }
];

export const counselors = [
    { id: 'cs1', name: 'Dr. Sarah Jenkins', specialization: 'IT & Engineering', experience: '15 years' },
    { id: 'cs2', name: 'Mr. David Chen', specialization: 'Business & Finance', experience: '10 years' },
    { id: 'cs3', name: 'Ms. Emily Rodriguez', specialization: 'Arts & Design', experience: '8 years' },
    { id: 'cs4', name: 'Dr. Michael Chang', specialization: 'Medical Careers', experience: '20 years' }
];

export const mockUsers = [
    { id: 'u1', name: 'Student Admin', email: 'admin@test.com', role: 'admin' },
    { id: 'u2', name: 'John Doe', email: 'john@test.com', role: 'student', interests: ['IT', 'Business'] }
];

export let mockSessions = [
    { id: 's1', userId: 'u2', counselorId: 'cs1', date: '2026-03-01T10:00', reason: 'Guidance on switching from backend to frontend development', status: 'Upcoming' },
    { id: 's2', userId: 'u2', counselorId: 'cs2', date: '2026-02-15T14:30', reason: 'Resume review for finance roles', status: 'Completed' }
];
