export interface Location {
  city: string;
  state: string;
}

export interface PersonalDetails {
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
  options?: string[];
}

export interface FormItemSingle {
  fields: Field[];
}

export interface FormItemSingleList extends FormItemSingle {
  id: string;
  // type: "skill" | "education" | "employment";
}

export enum SkillLevel {
  Novice = "Novice",
  Beginner = "Beginner",
  Skillful = "Skillful",
  Experienced = "Experienced",
  Expert = "Expert",
}

// export type SortableColumnItems =

export interface Resume {
  id?: string;
  resume_title: string;
  personal_details: PersonalDetails & FormItemSingle;
  social_media: SocialMedia & FormItemSingle;
  skills: (Skill & FormItemSingleList)[];
  employment_history: (EmploymentHistory & FormItemSingleList)[];
  education: (Education & FormItemSingleList)[];
}

export interface ReduxState {
  isSaved: boolean;
  resume: Resume;
}
