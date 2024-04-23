import { Field, ReduxState, Resume } from "../types/resumeTypes";
import { arrayMove } from "@dnd-kit/sortable";
import {
  defaultEducation,
  defaultEmployment,
  defaultSkill,
} from "../data/defaultData";

export const actionConstants = {
  UPDATE_RESUME_TITLE: "UPDATE_RESUME_TITLE",
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
  SAVE_RESUME: "SAVE_RESUME",
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
      type: typeof actionConstants.SAVE_RESUME;
    }
  | {
      type: typeof actionConstants.UPDATE_RESUME_TITLE;
      payload: string;
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
      : field,
  );

const resumeReducer = (state: ReduxState, action: Action) => {
  const updateResume = (resumeValue: Partial<Resume>) => ({
    isSaved: false,
    resume: {
      ...state.resume,
      ...resumeValue,
    },
  });
  switch (action.type) {
    case actionConstants.SET_RESUME: {
      return { isSaved: true, resume: action.payload };
    }
    case actionConstants.SAVE_RESUME: {
      return { ...state, isSaved: true };
    }
    case actionConstants.UPDATE_RESUME_TITLE: {
      const { payload } = action;
      return updateResume({ resume_title: payload });
    }

    case actionConstants.UPDATE_PERSONAL_DETAILS: {
      const { payload } = action;
      const newPersonalDetails = {
        personal_details: {
          ...state.resume.personal_details,
          ...{ [payload.label]: payload.value },
          fields: updateFieldState(
            state.resume.personal_details.fields,
            payload,
          ),
        },
      };
      return updateResume(newPersonalDetails);
    }
    case actionConstants.UPDATE_SOCIAL_MEDIA: {
      const { payload } = action;

      const newSocialMedia = {
        social_media: {
          ...state.resume.social_media,
          ...{ [payload.label]: payload.value },
          fields: updateFieldState(state.resume.social_media.fields, payload),
        },
      };

      return updateResume(newSocialMedia);
    }
    case actionConstants.UPDATE_SKILLS: {
      const { parentId, fieldPayload } = action.payload;
      const skills = state.resume.skills.map((skill) =>
        skill.id === parentId
          ? {
              ...skill,
              ...{ [fieldPayload.label]: fieldPayload.value },
              fields: updateFieldState(skill.fields, fieldPayload),
            }
          : skill,
      );
      return updateResume({ skills });
    }
    case actionConstants.ADD_SKILL: {
      return updateResume({ skills: [...state.resume.skills, defaultSkill()] });
    }
    case actionConstants.REORDER_SKILLS: {
      const { activeId, overId } = action.payload;
      const getTaskPos = (id: string) =>
        state.resume.skills.findIndex((skill) => skill.id === id);
      const originalPos = getTaskPos(activeId);
      const newPos = getTaskPos(overId);
      return updateResume({
        skills: arrayMove(state.resume.skills, originalPos, newPos),
      });
    }
    case actionConstants.DELETE_SKILL: {
      return updateResume({
        skills: state.resume.skills.filter(
          (skill) => skill.id !== action.payload,
        ),
      });
    }
    case actionConstants.DELETE_EMPLOYMENT: {
      return updateResume({
        employment_history: state.resume.employment_history.filter(
          (employment) => employment.id !== action.payload,
        ),
      });
    }

    case actionConstants.DELETE_EDUCATION: {
      return updateResume({
        education: state.resume.education.filter(
          (edu) => edu.id !== action.payload,
        ),
      });
    }
    case actionConstants.ADD_EMPLOYMENT_HISTORY: {
      return updateResume({
        employment_history: [
          ...state.resume.employment_history,
          defaultEmployment(),
        ],
      });
    }
    case actionConstants.REORDER_EMPLOYMENT_HISTORY: {
      const { activeId, overId } = action.payload;
      const getTaskPos = (id: string) =>
        state.resume.employment_history.findIndex(
          (employment) => employment.id === id,
        );
      const originalPos = getTaskPos(activeId);
      const newPos = getTaskPos(overId);

      return updateResume({
        employment_history: arrayMove(
          state.resume.employment_history,
          originalPos,
          newPos,
        ),
      });
    }
    case actionConstants.REORDER_EDUCATION: {
      const { activeId, overId } = action.payload;
      const getTaskPos = (id: string) =>
        state.resume.education.findIndex((edu) => edu.id === id);
      const originalPos = getTaskPos(activeId);
      const newPos = getTaskPos(overId);

      return updateResume({
        education: arrayMove(state.resume.education, originalPos, newPos),
      });
    }
    case actionConstants.UPDATE_EMPLOYMENT_HISTORY: {
      const { parentId, fieldPayload } = action.payload;
      const newState = state.resume.employment_history.map((employment) =>
        employment.id === parentId
          ? {
              ...employment,
              ...{ [fieldPayload.label]: fieldPayload.value },
              fields: updateFieldState(employment.fields, fieldPayload),
            }
          : employment,
      );
      return updateResume({
        employment_history: newState,
      });
    }
    case actionConstants.ADD_EDUCATION: {
      return updateResume({
        education: [...state.resume.education, defaultEducation()],
      });
    }
    case actionConstants.UPDATE_EDUCATION: {
      const { parentId, fieldPayload } = action.payload;
      const newState = state.resume.education.map((education) =>
        education.id === parentId
          ? {
              ...education,
              ...{ [fieldPayload.label]: fieldPayload.value },
              fields: updateFieldState(education.fields, fieldPayload),
            }
          : education,
      );

      return updateResume({
        education: newState,
      });
    }
    default:
      return state;
  }
};

export default resumeReducer;
