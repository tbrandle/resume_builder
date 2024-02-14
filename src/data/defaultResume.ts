import { uniqueId } from "lodash";
import { Resume, SkillLevel } from "../types/resumeTypes";

export const defaultResume: Resume = {
  personal_details: {
    first_name: "",
    last_name: "",
    job_title: "",
    professional_summary: "",
    phone_number: "",
    email: "",
    fields: [
      { id: uniqueId(), label: "first_name", type: "text", value: "" },
      { id: uniqueId(), label: "last_name", type: "text", value: "" },
      { id: uniqueId(), label: "job_title", type: "text", value: "" },
      {
        id: uniqueId(),
        label: "professional_summary",
        type: "html",
        value: "",
      },
      { id: uniqueId(), label: "phone_number", type: "phone", value: "" },
      { id: uniqueId(), label: "email", type: "email", value: "" },
    ],
  },
  social_media: {
    linked_in: "",
    github: "",
    portfolio: "",
    fields: [
      { id: uniqueId(), label: "linked_in", type: "text", value: "" },
      { id: uniqueId(), label: "github", type: "text", value: "" },
      { id: uniqueId(), label: "portfolio", type: "text", value: "" },
    ],
  },
  skills: [
    {
      skill: "",
      skill_level: "",
      id: uniqueId(),
      fields: [
        {
          id: uniqueId(),
          label: "skill",
          type: "text",
          value: "JavaScript",
        },
        {
          id: uniqueId(),
          label: "skill_level",
          type: "select",
          value: SkillLevel.Expert,
          options: SkillLevel,
        },
      ],
    },
    {
      skill: "",
      skill_level: "",
      id: uniqueId(),
      fields: [
        {
          id: uniqueId(),
          label: "skill",
          type: "text",
          value: "JavaScript",
        },
        {
          id: uniqueId(),
          label: "skill_level",
          type: "select",
          value: SkillLevel.Expert,
          options: SkillLevel,
        },
      ],
    },
  ],
  employment_history: [
    {
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
    },
  ],
  education: [
    {
      degree: "",
      certification: "",
      school: "",
      city: "",
      state: "",
      id: uniqueId(),
      fields: [
        { id: uniqueId(), label: "degree", type: "text", value: "" },
        { id: uniqueId(), label: "certification", type: "text", value: "" },
        { id: uniqueId(), label: "school", type: "text", value: "" },
        { id: uniqueId(), label: "city", type: "text", value: "" },
        { id: uniqueId(), label: "state", type: "text", value: "" },
      ],
    },
  ],
};

const resumeData = {
  personal_details: [
    { id: uniqueId(), label: "linked_in", type: "text", value: "" },
    { id: uniqueId(), label: "github", type: "text", value: "" },
    { id: uniqueId(), label: "portfolio", type: "text", value: "" },
  ],
  social_media: [],
  skills: [],
  employment_history: [],
  education: [],
};
