export type StudentData = {
  name: string;
  email: string;
  role: string;
  department: string;
  supervisor: string;
  avatar: string;
  joinDate: string;
  lastLogin: string;
  status: string;
  completedCourses: number;
  inProgressCourses: number;
  certificatesEarned: number;
  totalTimeLearned: string;
};

export type ActivityItem = {
  id: number;
  type: string;
  description: string;
  timestamp: string;
};

export type Course = {
  id: number;
  name: string;
  progress: number;
  status: string;
  image: string;
};

export type CourseProgress = {
  name: string;
  progress: number;
};

export type TimeSpent = {
  day: string;
  hours: number;
};

export type ProgressDetails = {
  overallProgress: number;
  courses: CourseProgress[];
  timeSpent: TimeSpent[];
};

export type Certificate = {
  id: number;
  courseName: string;
  issueDate: string;
  credentialId: string;
};

export type SidebarItem = {
  id: string;
  icon: any;
  label: string;
};

export type SidebarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export type HeaderProps = {
  studentName: string;
  avatar: string;
  onMenuClick: () => void;
};

// Admin types
export type AdminMetric = {
  title: string;
  value: string;
  icon: any;
  change: string;
};

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
};

export type AdminChartData = {
  month: string;
  estudiantes: number;
  cursos: number;
};

export type AdminPieData = {
  name: string;
  value: number;
  color: string;
};

export type AdminActivity = {
  user: string;
  action: string;
  course: string;
  time: string;
};

export type AdminSidebarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export type AdminHeaderProps = {
  adminName: string;
  adminEmail: string;
  avatar: string;
  onMenuClick: () => void;
};
