import { uniqueId } from "lodash";
import { Resume, SkillLevel } from "../types/resumeTypes";

export const defaultResume: Resume = {
  personal_details: {
    first_name: "Tim",
    last_name: "Brandle",
    job_title: "Senior Software Developer",
    professional_summary:
      "<p>Senior Full Stack Software Developer who specializes in React.js, with experience in Java and Node.js.</p>",
    phone_number: "720-281-6350",
    email: "tbrandle53@gmail.com",
    fields: [
      { id: uniqueId(), label: "first_name", type: "text", value: "Tim" },
      { id: uniqueId(), label: "last_name", type: "text", value: "Brandle" },
      {
        id: uniqueId(),
        label: "job_title",
        type: "text",
        value: "Senior Software Developer",
      },
      {
        id: uniqueId(),
        label: "professional_summary",
        type: "html",
        value:
          "<p>Senior Full Stack Software Developer who specializes in React.js, with experience in Java and Node.js.</p>",
      },
      {
        id: uniqueId(),
        label: "phone_number",
        type: "phone",
        value: "720-281-6350",
      },
      {
        id: uniqueId(),
        label: "email",
        type: "email",
        value: "tbrandle53@gmail.com",
      },
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
      skill: "JavaScript",
      skill_level: SkillLevel.Expert,
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
      job_title: "Senior Software Developer",
      employer: "ThoughtWorks",
      city: "Denver",
      state: "CO",
      date_start: "Jan, 2021",
      date_end: "Present",
      description: "",
      id: uniqueId(),
      fields: [
        {
          id: uniqueId(),
          label: "job_title",
          type: "text",
          value: "Senior Software Developer",
        },
        {
          id: uniqueId(),
          label: "employer",
          type: "text",
          value: "ThoughtWorks",
        },
        { id: uniqueId(), label: "city", type: "text", value: "Denver" },
        { id: uniqueId(), label: "state", type: "text", value: "CO" },
        {
          id: uniqueId(),
          label: "date_start",
          type: "text",
          value: "Jan, 2021",
        },
        { id: uniqueId(), label: "date_end", type: "text", value: "Present" },
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
