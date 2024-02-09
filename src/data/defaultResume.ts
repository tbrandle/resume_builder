import { uniqueId } from "lodash";
import { Resume, SkillLevel } from "../types/resumeTypes";

const defaultResume: Resume = {
  personal_details: {
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
  skills: [
    {
      id: uniqueId(),
      fields: [
        {
          id: uniqueId(),
          label: "language",
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
  social_media: {
    fields: [
      { id: uniqueId(), label: "linked_in", type: "text", value: "" },
      { id: uniqueId(), label: "github", type: "text", value: "" },
      { id: uniqueId(), label: "portfolio", type: "text", value: "" },
    ],
  },
  employment_history: [
    {
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

export default defaultResume;
