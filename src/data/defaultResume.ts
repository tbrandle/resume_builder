import { uniqueId } from "lodash";
import { Resume, Skill, SkillLevel } from "../types/resumeTypes";

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
      skill_level: "Expert",
      id: "10",
      fields: [
        {
          id: "11",
          label: "skill",
          type: "text",
          value: "JavaScript",
        },
        {
          id: "12",
          label: "skill_level",
          type: "select",
          value: "Expert",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "React",
      skill_level: "Expert",
      id: "22",
      fields: [
        {
          id: "23",
          label: "skill",
          type: "text",
          value: "React",
        },
        {
          id: "24",
          label: "skill_level",
          type: "select",
          value: "Expert",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "Redux",
      skill_level: "Experienced",
      id: "28",
      fields: [
        {
          id: "29",
          label: "skill",
          type: "text",
          value: "Redux",
        },
        {
          id: "30",
          label: "skill_level",
          type: "select",
          value: "Experienced",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "Next.js",
      skill_level: "Experienced",
      id: "34",
      fields: [
        {
          id: "35",
          label: "skill",
          type: "text",
          value: "Next.js",
        },
        {
          id: "36",
          label: "skill_level",
          type: "select",
          value: "Experienced",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "Node.js",
      skill_level: "Skillful",
      id: "40",
      fields: [
        {
          id: "41",
          label: "skill",
          type: "text",
          value: "Node.js",
        },
        {
          id: "42",
          label: "skill_level",
          type: "select",
          value: "Skillful",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "Java",
      skill_level: "Skillful",
      id: "46",
      fields: [
        {
          id: "47",
          label: "skill",
          type: "text",
          value: "Java",
        },
        {
          id: "48",
          label: "skill_level",
          type: "select",
          value: "Skillful",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "Spring Boot",
      skill_level: "Skillful",
      id: "52",
      fields: [
        {
          id: "53",
          label: "skill",
          type: "text",
          value: "Spring Boot",
        },
        {
          id: "54",
          label: "skill_level",
          type: "select",
          value: "Skillful",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "Docker",
      skill_level: "Experienced",
      id: "58",
      fields: [
        {
          id: "59",
          label: "skill",
          type: "text",
          value: "Docker",
        },
        {
          id: "60",
          label: "skill_level",
          type: "select",
          value: "Experienced",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "Kubernetes",
      skill_level: "Skillful",
      id: "64",
      fields: [
        {
          id: "65",
          label: "skill",
          type: "text",
          value: "Kubernetes",
        },
        {
          id: "66",
          label: "skill_level",
          type: "select",
          value: "Skillful",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "Kafka",
      skill_level: "Skillful",
      id: "70",
      fields: [
        {
          id: "71",
          label: "skill",
          type: "text",
          value: "Kafka",
        },
        {
          id: "72",
          label: "skill_level",
          type: "select",
          value: "Skillful",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "CSS",
      skill_level: "Experienced",
      id: "76",
      fields: [
        {
          id: "77",
          label: "skill",
          type: "text",
          value: "CSS",
        },
        {
          id: "78",
          label: "skill_level",
          type: "select",
          value: "Experienced",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
        },
      ],
    },
    {
      skill: "PostgresQL",
      skill_level: "Skillful",
      id: "82",
      fields: [
        {
          id: "83",
          label: "skill",
          type: "text",
          value: "PostgresQL",
        },
        {
          id: "84",
          label: "skill_level",
          type: "select",
          value: "Skillful",
          options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
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
      description:
        "<p>Served as a team technical anchor for a variety of clients, from Fortune 500 corporations to medium-sized startups. &nbsp;Developed tailored solutions to technical problems based on client needs.</p><p><strong>Projects</strong>:</p><p><em>Construction Machinery Auctioneer - Order Invoice Cash Team (OIC)</em></p><ul><li>Charged with building an order and invoice processing engine alongside additional, interconnected workflows for payment status, out-of-band payments, payment allocations, and finalized taxes.</li><li>Team was recognized several times by the client for outstanding performance in velocity and code quality.</li></ul><p>Tech stack: Java, Spring Boot, Kafka, Docker, Kubernetes</p><p><em>Construction Machinery Auctioneer - Experience Checkout&nbsp;Team</em></p><ul><li>Transitioned the manual auction process to an online e-commerce marketplace supporting multiple payment solutions and checkout flows for purchasing construction equipment.</li><li>Tim served as the technical anchor for building out the checkout flow for a greenfield React/Next.js application and a Java backend for frontend (BFF).&nbsp;</li></ul><p>Tech Stack: React, Next.js, Typescript, Java, Stripe API</p><p><em>Pizza Delivery App</em></p><ul><li>Served as the technical anchor to build a more reliable, more responsive digital platform to enhance the online ordering experience for both web and mobile.</li></ul><p>Tech Stack: React, Redux, GraphQL, Next.js, Typescript</p>",
      id: "13",
      fields: [
        {
          id: "14",
          label: "job_title",
          type: "text",
          value: "Senior Software Developer",
        },
        {
          id: "15",
          label: "employer",
          type: "text",
          value: "ThoughtWorks",
        },
        {
          id: "16",
          label: "city",
          type: "text",
          value: "Denver",
        },
        {
          id: "17",
          label: "state",
          type: "text",
          value: "CO",
        },
        {
          id: "18",
          label: "date_start",
          type: "text",
          value: "Jan, 2021",
        },
        {
          id: "19",
          label: "date_end",
          type: "text",
          value: "Present",
        },
        {
          id: "20",
          label: "description",
          type: "html",
          value:
            "<p>Served as a team technical anchor for a variety of clients, from Fortune 500 corporations to medium-sized startups. &nbsp;Developed tailored solutions to technical problems based on client needs.</p><p><strong>Projects</strong>:</p><p><em>Construction Machinery Auctioneer - Order Invoice Cash Team (OIC)</em></p><ul><li>Charged with building an order and invoice processing engine alongside additional, interconnected workflows for payment status, out-of-band payments, payment allocations, and finalized taxes.</li><li>Team was recognized several times by the client for outstanding performance in velocity and code quality.</li></ul><p>Tech stack: Java, Spring Boot, Kafka, Docker, Kubernetes</p><p><em>Construction Machinery Auctioneer - Experience Checkout&nbsp;Team</em></p><ul><li>Transitioned the manual auction process to an online e-commerce marketplace supporting multiple payment solutions and checkout flows for purchasing construction equipment.</li><li>Tim served as the technical anchor for building out the checkout flow for a greenfield React/Next.js application and a Java backend for frontend (BFF).&nbsp;</li></ul><p>Tech Stack: React, Next.js, Typescript, Java, Stripe API</p><p><em>Pizza Delivery App</em></p><ul><li>Served as the technical anchor to build a more reliable, more responsive digital platform to enhance the online ordering experience for both web and mobile.</li></ul><p>Tech Stack: React, Redux, GraphQL, Next.js, Typescript</p>",
        },
      ],
    },
    {
      job_title: "Software Developer",
      employer: "ThoughtWorks",
      city: "Denver",
      state: "CO",
      date_start: "Jun, 2019",
      date_end: "Jan 2021",
      description:
        "<p><strong>Projects:</strong></p><p><em>Small Business App - Accounts Payable Team</em></p><ul><li>Tim worked as a full stack developer with the Accounts Payable dev team to modernize their existing .NET monolith to a React app with .NET-CORE backend.&nbsp;</li><li>Responsible for managing the life cycle of bills and credit notes for accountants.</li></ul><p>Tech Stack: React, Redux, Typescript, C#, .NET Core</p><p><em>Green Cloud - Internal ThoughtWorks Initiative</em></p><ul><li>Worked on the Green Cloud initiative to build an application that provides visibility and tooling to measure the user's cloud carbon footprint.&nbsp;</li></ul><p>Tech Stack: React, Material UI, AWS, GCP</p><p><em>Cyber Security Startup - Batch Enrollment Team</em></p><ul><li>Tim delivered a scalable batch user enrollment tool under a short deadline</li></ul><p>Tech Stack: React</p><p><em>Retail Corporation - Sitewide Team</em></p><ul><li>Tim helped spearhead the homepage micro-frontend service which was the entry point for third-party services as well as building and maintaining headers, footers, and homepage content&nbsp;</li><li>The sitewide micro-frontend was actively utilized on the homepage of the client's main company site and 5 subsidiary company homepages.&nbsp;</li></ul><p>Tech Stack: React</p>",
      id: "21",
      fields: [
        {
          id: "22",
          label: "job_title",
          type: "text",
          value: "Software Developer",
        },
        {
          id: "23",
          label: "employer",
          type: "text",
          value: "ThoughtWorks",
        },
        {
          id: "24",
          label: "city",
          type: "text",
          value: "Denver",
        },
        {
          id: "25",
          label: "state",
          type: "text",
          value: "CO",
        },
        {
          id: "26",
          label: "date_start",
          type: "text",
          value: "Jun, 2019",
        },
        {
          id: "27",
          label: "date_end",
          type: "text",
          value: "Jan 2021",
        },
        {
          id: "28",
          label: "description",
          type: "html",
          value:
            "<p><strong>Projects:</strong></p><p><em>Small Business App - Accounts Payable Team</em></p><ul><li>Tim worked as a full stack developer with the Accounts Payable dev team to modernize their existing .NET monolith to a React app with .NET-CORE backend.&nbsp;</li><li>Responsible for managing the life cycle of bills and credit notes for accountants.</li></ul><p>Tech Stack: React, Redux, Typescript, C#, .NET Core</p><p><em>Green Cloud - Internal ThoughtWorks Initiative</em></p><ul><li>Worked on the Green Cloud initiative to build an application that provides visibility and tooling to measure the user's cloud carbon footprint.&nbsp;</li></ul><p>Tech Stack: React, Material UI, AWS, GCP</p><p><em>Cyber Security Startup - Batch Enrollment Team</em></p><ul><li>Tim delivered a scalable batch user enrollment tool under a short deadline</li></ul><p>Tech Stack: React</p><p><em>Retail Corporation - Sitewide Team</em></p><ul><li>Tim helped spearhead the homepage micro-frontend service which was the entry point for third-party services as well as building and maintaining headers, footers, and homepage content&nbsp;</li><li>The sitewide micro-frontend was actively utilized on the homepage of the client's main company site and 5 subsidiary company homepages.&nbsp;</li></ul><p>Tech Stack: React</p>",
        },
      ],
    },
    {
      job_title: "Software Developer",
      employer: "Bowtie.co",
      city: "Denver",
      state: "CO",
      date_start: "Oct, 2017",
      date_end: "Jun, 2019",
      description:
        "<p>Led the development of the React component library and application boilerplates following the Atomic Design Methodology. Developed greenfield React applications custom-designed to solve client needs.&nbsp;</p><p><strong>Projects:</strong></p><p><em>ASIRD</em></p><ul><li>Built an administrative tool to manage all doctors within the ASIRD association.&nbsp;</li><li>Tim automated the process of creating, editing, and viewing a model page increasing developer velocity and efficiency.</li></ul><p>Tech Stack: React, Recompose, Ruby on Rails, Docker, Bootstrap</p><p><em>BriteBee</em></p><ul><li>Tim led the frontend development of BriteBee which allowed users to anonymously request insurance quotes from agents for home, auto, or life.</li></ul><p>Tech Stack: React, Recompose, Ruby on Rails, Docker</p><p><em>Homebot - First Time Home Buyer App</em></p><ul><li>Tim led the development of the frontend application designed to provide real estate market data for first-time homebuyers.&nbsp;</li></ul><p>Tech Stack: React, Recompose, D3, Ruby on Rails, Docker</p><p><em>Houndstooth</em></p><ul><li>Tim created an open-sourced text and Jekyll CMS editor. Built to accompany the Bowtie Web hosting service, RazorSite.&nbsp;</li></ul><p>Tech Stack: Serverless, React, Recompose, Docker, Atomic Design Methodology</p>",
      id: "52",
      fields: [
        {
          id: "53",
          label: "job_title",
          type: "text",
          value: "Software Developer",
        },
        {
          id: "54",
          label: "employer",
          type: "text",
          value: "Bowtie.co",
        },
        {
          id: "55",
          label: "city",
          type: "text",
          value: "Denver",
        },
        {
          id: "56",
          label: "state",
          type: "text",
          value: "CO",
        },
        {
          id: "57",
          label: "date_start",
          type: "text",
          value: "Oct, 2017",
        },
        {
          id: "58",
          label: "date_end",
          type: "text",
          value: "Jun, 2019",
        },
        {
          id: "59",
          label: "description",
          type: "html",
          value:
            "<p>Led the development of the React component library and application boilerplates following the Atomic Design Methodology. Developed greenfield React applications custom-designed to solve client needs.&nbsp;</p><p><strong>Projects:</strong></p><p><em>ASIRD</em></p><ul><li>Built an administrative tool to manage all doctors within the ASIRD association.&nbsp;</li><li>Tim automated the process of creating, editing, and viewing a model page increasing developer velocity and efficiency.</li></ul><p>Tech Stack: React, Recompose, Ruby on Rails, Docker, Bootstrap</p><p><em>BriteBee</em></p><ul><li>Tim led the frontend development of BriteBee which allowed users to anonymously request insurance quotes from agents for home, auto, or life.</li></ul><p>Tech Stack: React, Recompose, Ruby on Rails, Docker</p><p><em>Homebot - First Time Home Buyer App</em></p><ul><li>Tim led the development of the frontend application designed to provide real estate market data for first-time homebuyers.&nbsp;</li></ul><p>Tech Stack: React, Recompose, D3, Ruby on Rails, Docker</p><p><em>Houndstooth</em></p><ul><li>Tim created an open-sourced text and Jekyll CMS editor. Built to accompany the Bowtie Web hosting service, RazorSite.&nbsp;</li></ul><p>Tech Stack: Serverless, React, Recompose, Docker, Atomic Design Methodology</p>",
        },
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
