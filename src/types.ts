export type ActiveView = 
  | 'profile-skills'
  | 'profile-projects'
  | 'assessment-mcq'
  | 'assessment-subjective'
  | 'employment-details'
  | 'jobs'
  | 'network'
  | 'assessment-hub'
  | 'score-benchmark'
  | 'digital-vault'
  | 'messages'
  | 'notifications'
  | 'login';

export type ProfileTab = 'overview' | 'skills' | 'experience' | 'projects' | 'posts' | 'activity';

export interface SkillItem {
  id: string;
  name: string;
  level: string;
  percentage: number;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  image: string;
  category: 'all' | 'ui-ux' | 'mobile' | 'web' | 'branding' | 'design-system';
  link?: string;
  featured?: boolean;
}

export interface JourneyItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  icon: string;
  isEducation?: boolean;
}

export interface EmploymentDetailsData {
  jobTitle: string;
  company: string;
  employmentType: string;
  location: string;
  reportsTo: string;
  teamSize: string;
  workSchedule: string;
}

export interface AssessmentMCQState {
  questionNumber: number;
  totalQuestions: number;
  selectedOptionIndex: number;
}

export interface AssessmentSubjectiveState {
  questionNumber: number;
  totalQuestions: number;
  answerText: string;
  attachments: string[];
}
