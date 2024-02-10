import { uniqueId } from "lodash";
import {
  Field,
  IFormSection,
  IFormSectionParent,
  Resume,
  SkillLevel,
} from "../types/resumeTypes";

export const actionConstants = {
  UPDATE_PERSONAL_DETAILS: "UPDATE_PERSONAL_DETAILS",
  UPDATE_SOCIAL_MEDIA: "UPDATE_SOCIAL_MEDIA",
  UPDATE_SKILLS: "UPDATE_SKILLS",
  ADD_EMPLOYMENT_HISTORY: "ADD_EMPLOYMENT_HISTORY",
  ADD_SKILL: "ADD_SKILL",
  UPDATE_EMPLOYMENT_HISTORY: "UPDATE_EMPLOYMENT_HISTORY",
  UPDATE_EDUCATION: "UPDATE_EDUCATION",
} as const;

type Action =
  | {
      type: typeof actionConstants.UPDATE_PERSONAL_DETAILS;
      payload: Partial<Field>;
    }
  | {
      type: typeof actionConstants.UPDATE_SOCIAL_MEDIA;
      payload: Partial<Field>;
    }
  | {
      type: typeof actionConstants.UPDATE_SKILLS;
      payload: { parentId: string; fieldPayload: Partial<Field> };
    }
  | {
      type: typeof actionConstants.ADD_SKILL;
    }
  | {
      type: typeof actionConstants.ADD_EMPLOYMENT_HISTORY;
    }
  | {
      type: typeof actionConstants.UPDATE_EMPLOYMENT_HISTORY;
      payload: { parentId: string; fieldPayload: Partial<Field> };
    }
  | {
      type: typeof actionConstants.UPDATE_EDUCATION;
      payload: { parentId: string; fieldPayload: Partial<Field> };
    };

const updateFieldState = (fields: Field[], payload: Partial<Field>) =>
  fields.map((field) =>
    field.id === payload.id
      ? {
          ...field,
          ...payload,
        }
      : field
  );

const resumeReducer = (state: Resume, action: Action) => {
  switch (action.type) {
    case actionConstants.UPDATE_PERSONAL_DETAILS: {
      return {
        ...state,
        personal_details: {
          ...state.personal_details,
          fields: updateFieldState(
            state.personal_details.fields,
            action.payload
          ),
        },
      };
    }
    case actionConstants.UPDATE_SOCIAL_MEDIA: {
      return {
        ...state,
        social_media: {
          ...state.social_media,
          fields: updateFieldState(state.social_media.fields, action.payload),
        },
      };
    }
    case actionConstants.UPDATE_SKILLS: {
      const { parentId, fieldPayload } = action.payload;
      const newState = state.skills.map((skill) =>
        skill.id === parentId
          ? { ...skill, fields: updateFieldState(skill.fields, fieldPayload) }
          : skill
      );
      return {
        ...state,
        skills: newState,
      };
    }
    case actionConstants.ADD_SKILL: {
      const newSkill: IFormSectionParent = {
        id: uniqueId(),
        fields: [
          {
            id: uniqueId(),
            label: "language",
            type: "text",
            value: "",
          },
          {
            id: uniqueId(),
            label: "skill_level",
            type: "select",
            value: "",
            options: SkillLevel,
          },
        ],
      };
      return {
        ...state,
        skills: [...state.skills, newSkill],
      };
    }
    case actionConstants.ADD_EMPLOYMENT_HISTORY: {
      const newEmployment: IFormSectionParent = {
        id: uniqueId(),
        fields: [
          { id: uniqueId(), label: "job_title", type: "text", value: "" },
          { id: uniqueId(), label: "employer", type: "text", value: "" },
          { id: uniqueId(), label: "city", type: "text", value: "" },
          { id: uniqueId(), label: "state", type: "text", value: "" },
          { id: uniqueId(), label: "date_start", type: "text", value: "" },
          { id: uniqueId(), label: "date_end", type: "text", value: "" },
          { id: uniqueId(), label: "description", type: "html", value: "" },
        ],
      };
      return {
        ...state,
        employment_history: [...state.employment_history, newEmployment],
      };
    }
    case actionConstants.UPDATE_EMPLOYMENT_HISTORY: {
      const { parentId, fieldPayload } = action.payload;
      const newState = state.employment_history.map((employment) =>
        employment.id === parentId
          ? {
              ...employment,
              fields: updateFieldState(employment.fields, fieldPayload),
            }
          : employment
      );
      return {
        ...state,
        employment_history: newState,
      };
    }
    case actionConstants.UPDATE_EDUCATION: {
      const { parentId, fieldPayload } = action.payload;
      const newState = state.education.map((education) =>
        education.id === parentId
          ? {
              ...education,
              fields: updateFieldState(education.fields, fieldPayload),
            }
          : education
      );

      return {
        ...state,
        education: newState,
      };
    }
    default:
      return state;
  }
};

export default resumeReducer;
