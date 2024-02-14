export interface Location {
  city: string;
  state: string;
}

export interface ProfileDetails {
  first_name: string;
  last_name: string;
  job_title: string;
  professional_summary: string;
  phone_number: string;
  email: string;
}

export interface SocialMedia {
  linked_in: string;
  github: string;
  portfolio: string;
}

export interface Skill {
  skill: string;
  skill_level: string;
}
export interface EmploymentHistory {
  job_title: string;
  employer: string;
  city: string;
  state: string;
  date_start: string;
  date_end: string;
  description: string;
}
export interface Education {
  degree: string;
  certification: string;
  school: string;
  city: string;
  state: string;
}

export type InputType = "select" | "html" | "text" | "date" | "phone" | "email";

export interface Field {
  id: string;
  label: string;
  type: InputType;
  value: string;
  options?: any;
}

export interface IFormSection {
  fields: Field[];
}

export interface IFormSectionList extends IFormSection {
  id: string;
}

export enum SkillLevel {
  Novice = "Novice",
  Beginner = "Beginner",
  Skillful = "Skillful",
  Experienced = "Experienced",
  Expert = "Expert",
}

export interface Resume {
  personal_details: ProfileDetails & IFormSection;
  social_media: SocialMedia & IFormSection;
  skills: (Skill & IFormSectionList)[];
  employment_history: (EmploymentHistory & IFormSectionList)[];
  education: (Education & IFormSectionList)[];
}
