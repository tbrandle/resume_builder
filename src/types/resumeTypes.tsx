import { UUID } from "crypto";

export interface Location {
  city: string;
  state: string;
}

export type InputType = "select" | "html" | "text" | "date" | "phone" | "email";

export interface Field {
  id: string;
  label: string;
  type: InputType;
  value: unknown;
  options?: any;
}

export interface IFormSection {
  fields: Field[];
}

export interface IFormSectionParent extends IFormSection {
  id: string;
}

export enum SkillLevel {
  Novice,
  Beginner,
  Skillful,
  Experienced,
  Expert,
}

export interface Resume {
  personal_details: IFormSection;
  social_media: IFormSection;
  skills: IFormSectionParent[];
  employment_history: IFormSectionParent[];
  education: IFormSectionParent[];
}
