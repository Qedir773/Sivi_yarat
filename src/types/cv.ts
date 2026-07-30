export interface CVPersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  photoUrl?: string;
}

export interface CVExperience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  highlights?: string[];
}

export interface CVEducation {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface CVSkill {
  id: string;
  name: string;
  level?: 1 | 2 | 3 | 4 | 5;
}

export interface CVLanguage {
  id: string;
  name: string;
  level: string;
}

export interface CVProject {
  id: string;
  name: string;
  description?: string;
  url?: string;
}

export interface CVCertification {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
}

export interface CVData {
  personalInfo: CVPersonalInfo;
  summary?: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: CVSkill[];
  languages?: CVLanguage[];
  projects?: CVProject[];
  certifications?: CVCertification[];
}
