import { uniqueId } from "lodash";
import { Field, Resume, SkillLevel } from "../types/resumeTypes";
import { arrayMove } from "@dnd-kit/sortable";

export const actionConstants = {
  UPDATE_PERSONAL_DETAILS: "UPDATE_PERSONAL_DETAILS",
  UPDATE_SOCIAL_MEDIA: "UPDATE_SOCIAL_MEDIA",
  UPDATE_SKILLS: "UPDATE_SKILLS",
  REORDER_SKILLS: "REORDER_SKILLS",
  REORDER_EMPLOYMENT_HISTORY: "REORDER_EMPLOYMENT_HISTORY",
  REORDER_EDUCATION: "REORDER_EDUCATION",
  ADD_EMPLOYMENT_HISTORY: "ADD_EMPLOYMENT_HISTORY",
  ADD_SKILL: "ADD_SKILL",
  ADD_EDUCATION: "ADD_EDUCATION",
  UPDATE_EMPLOYMENT_HISTORY: "UPDATE_EMPLOYMENT_HISTORY",
  UPDATE_EDUCATION: "UPDATE_EDUCATION",
  SET_RESUME: "SET_RESUME",
  DELETE_SKILL: "DELETE_SKILL",
  DELETE_EMPLOYMENT: "DELETE_EMPLOYMENT",
  DELETE_EDUCATION: "DELETE_EDUCATION",
} as const;

export type Action =
  | {
      type: typeof actionConstants.DELETE_EDUCATION;
      payload: string;
    }
  | {
      type: typeof actionConstants.DELETE_EMPLOYMENT;
      payload: string;
    }
  | {
      type: typeof actionConstants.DELETE_SKILL;
      payload: string;
    }
  | {
      type: typeof actionConstants.SET_RESUME;
      payload: Resume;
    }
  | {
      type: typeof actionConstants.UPDATE_PERSONAL_DETAILS;
      payload: Field;
    }
  | {
      type: typeof actionConstants.UPDATE_SOCIAL_MEDIA;
      payload: Field;
    }
  | {
      type: typeof actionConstants.UPDATE_SKILLS;
      payload: { parentId: string; fieldPayload: Field };
    }
  | {
      type: typeof actionConstants.REORDER_SKILLS;
      payload: { activeId: string; overId: string };
    }
  | {
      type: typeof actionConstants.ADD_SKILL;
    }
  | {
      type: typeof actionConstants.REORDER_EMPLOYMENT_HISTORY;
      payload: { activeId: string; overId: string };
    }
  | {
      type: typeof actionConstants.ADD_EMPLOYMENT_HISTORY;
    }
  | {
      type: typeof actionConstants.REORDER_EDUCATION;
      payload: { activeId: string; overId: string };
    }
  | {
      type: typeof actionConstants.ADD_EDUCATION;
    }
  | {
      type: typeof actionConstants.UPDATE_EMPLOYMENT_HISTORY;
      payload: { parentId: string; fieldPayload: Field };
    }
  | {
      type: typeof actionConstants.UPDATE_EDUCATION;
      payload: { parentId: string; fieldPayload: Field };
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
    case "SET_RESUME": {
      return action.payload;
    }
    case actionConstants.UPDATE_PERSONAL_DETAILS: {
      const { payload } = action;
      return {
        ...state,
        personal_details: {
          ...state.personal_details,
          ...{ [payload.label]: payload.value },
          fields: updateFieldState(state.personal_details.fields, payload),
        },
      };
    }
    case actionConstants.UPDATE_SOCIAL_MEDIA: {
      const { payload } = action;
      return {
        ...state,
        social_media: {
          ...state.social_media,
          ...{ [payload.label]: payload.value },
          fields: updateFieldState(state.social_media.fields, payload),
        },
      };
    }
    case actionConstants.UPDATE_SKILLS: {
      const { parentId, fieldPayload } = action.payload;
      const newState = state.skills.map((skill) =>
        skill.id === parentId
          ? {
              ...skill,
              ...{ [fieldPayload.label]: fieldPayload.value },
              fields: updateFieldState(skill.fields, fieldPayload),
            }
          : skill
      );
      return {
        ...state,
        skills: newState,
      };
    }
    case actionConstants.ADD_SKILL: {
      const newSkill: (typeof state.skills)[0] = {
        skill: "",
        skill_level: "",
        id: uniqueId(),
        fields: [
          {
            id: uniqueId(),
            label: "skill",
            type: "text",
            value: "",
          },
          {
            id: uniqueId(),
            label: "skill_level",
            type: "select",
            value: "",
            options: Object.keys(SkillLevel).map((key) => key),
          },
        ],
      };
      return {
        ...state,
        skills: [...state.skills, newSkill],
      };
    }
    case actionConstants.REORDER_SKILLS: {
      const { activeId, overId } = action.payload;
      const getTaskPos = (id: string) =>
        state.skills.findIndex((skill) => skill.id === id);
      const originalPos = getTaskPos(activeId);
      const newPos = getTaskPos(overId);

      return {
        ...state,
        skills: arrayMove(state.skills, originalPos, newPos),
      };
    }
    case actionConstants.DELETE_SKILL: {
      return {
        ...state,
        skills: state.skills.filter((skill) => skill.id !== action.payload),
      };
    }
    case actionConstants.DELETE_EMPLOYMENT: {
      return {
        ...state,
        employment_history: state.employment_history.filter(
          (employment) => employment.id !== action.payload
        ),
      };
    }
    case actionConstants.DELETE_EDUCATION: {
      return {
        ...state,
        education: state.education.filter((edu) => edu.id !== action.payload),
      };
    }
    case actionConstants.ADD_EMPLOYMENT_HISTORY: {
      const newEmployment: (typeof state.employment_history)[0] = {
        job_title: "",
        employer: "",
        city: "",
        state: "",
        date_start: "",
        date_end: "",
        description: "",
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
    case actionConstants.REORDER_EMPLOYMENT_HISTORY: {
      const { activeId, overId } = action.payload;
      const getTaskPos = (id: string) =>
        state.employment_history.findIndex(
          (employment) => employment.id === id
        );
      const originalPos = getTaskPos(activeId);
      const newPos = getTaskPos(overId);

      return {
        ...state,
        employment_history: arrayMove(
          state.employment_history,
          originalPos,
          newPos
        ),
      };
    }
    case actionConstants.REORDER_EDUCATION: {
      const { activeId, overId } = action.payload;
      const getTaskPos = (id: string) =>
        state.education.findIndex((edu) => edu.id === id);
      const originalPos = getTaskPos(activeId);
      const newPos = getTaskPos(overId);

      return {
        ...state,
        education: arrayMove(state.education, originalPos, newPos),
      };
    }
    case actionConstants.UPDATE_EMPLOYMENT_HISTORY: {
      const { parentId, fieldPayload } = action.payload;
      const newState = state.employment_history.map((employment) =>
        employment.id === parentId
          ? {
              ...employment,
              ...{ [fieldPayload.label]: fieldPayload.value },
              fields: updateFieldState(employment.fields, fieldPayload),
            }
          : employment
      );
      return {
        ...state,
        employment_history: newState,
      };
    }
    case actionConstants.ADD_EDUCATION: {
      const newEmployment: (typeof state.education)[0] = {
        school: "",
        degree: "",
        city: "",
        state: "",
        id: uniqueId(),
        fields: [
          { id: uniqueId(), label: "school", type: "text", value: "" },
          { id: uniqueId(), label: "degree", type: "text", value: "" },
          { id: uniqueId(), label: "city", type: "text", value: "" },
          { id: uniqueId(), label: "state", type: "text", value: "" },
        ],
      };
      return {
        ...state,
        education: [...state.education, newEmployment],
      };
    }
    case actionConstants.UPDATE_EDUCATION: {
      const { parentId, fieldPayload } = action.payload;
      const newState = state.education.map((education) =>
        education.id === parentId
          ? {
              ...education,
              ...{ [fieldPayload.label]: fieldPayload.value },
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
