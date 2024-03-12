"use strict";
// import { Prisma, PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// const main = async () => {
// const resume = {
//   resume_title: "Master",
//   personal_details: {
//     first_name: "Tim",
//     last_name: "Brandle",
//     job_title: "Senior Software Developer",
//     professional_summary:
//       "<p>Senior Full Stack Software Developer who specializes in React.js, with experience in Java and Node.js.</p>",
//     phone_number: "720-281-6350",
//     email: "tbrandle53@gmail.com",
//     fields: [
//       {
//         id: "1",
//         label: "first_name",
//         type: "text",
//         value: "Tim",
//       },
//       {
//         id: "2",
//         label: "last_name",
//         type: "text",
//         value: "Brandle",
//       },
//       {
//         id: "3",
//         label: "job_title",
//         type: "text",
//         value: "Senior Software Developer",
//       },
//       {
//         id: "4",
//         label: "professional_summary",
//         type: "html",
//         value:
//           "<p>Senior Full Stack Software Developer who specializes in React.js, with experience in Java and Node.js.</p>",
//       },
//       {
//         id: "5",
//         label: "phone_number",
//         type: "phone",
//         value: "720-281-6350",
//       },
//       {
//         id: "6",
//         label: "email",
//         type: "email",
//         value: "tbrandle53@gmail.com",
//       },
//     ],
//   },
//   social_media: {
//     linked_in: "",
//     github: "",
//     portfolio: "",
//     fields: [
//       {
//         id: "7",
//         label: "linked_in",
//         type: "text",
//         value: "",
//       },
//       {
//         id: "8",
//         label: "github",
//         type: "text",
//         value: "",
//       },
//       {
//         id: "9",
//         label: "portfolio",
//         type: "text",
//         value: "",
//       },
//     ],
//   },
//   skills: [
//     {
//       skill: "JavaScript",
//       skill_level: "Expert",
//       id: "10",
//       fields: [
//         {
//           id: "11",
//           label: "skill",
//           type: "text",
//           value: "JavaScript",
//         },
//         {
//           id: "12",
//           label: "skill_level",
//           type: "select",
//           value: "Expert",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "React",
//       skill_level: "Expert",
//       id: "22",
//       fields: [
//         {
//           id: "23",
//           label: "skill",
//           type: "text",
//           value: "React",
//         },
//         {
//           id: "24",
//           label: "skill_level",
//           type: "select",
//           value: "Expert",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "Redux",
//       skill_level: "Experienced",
//       id: "28",
//       fields: [
//         {
//           id: "29",
//           label: "skill",
//           type: "text",
//           value: "Redux",
//         },
//         {
//           id: "30",
//           label: "skill_level",
//           type: "select",
//           value: "Experienced",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "Typescript",
//       skill_level: "Expert",
//       id: "100",
//       fields: [
//         {
//           id: "101",
//           label: "skill",
//           type: "text",
//           value: "Typescript",
//         },
//         {
//           id: "102",
//           label: "skill_level",
//           type: "select",
//           value: "Expert",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "Next.js",
//       skill_level: "Experienced",
//       id: "34",
//       fields: [
//         {
//           id: "35",
//           label: "skill",
//           type: "text",
//           value: "Next.js",
//         },
//         {
//           id: "36",
//           label: "skill_level",
//           type: "select",
//           value: "Experienced",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "Node.js",
//       skill_level: "Skillful",
//       id: "40",
//       fields: [
//         {
//           id: "41",
//           label: "skill",
//           type: "text",
//           value: "Node.js",
//         },
//         {
//           id: "42",
//           label: "skill_level",
//           type: "select",
//           value: "Skillful",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "Java",
//       skill_level: "Skillful",
//       id: "46",
//       fields: [
//         {
//           id: "47",
//           label: "skill",
//           type: "text",
//           value: "Java",
//         },
//         {
//           id: "48",
//           label: "skill_level",
//           type: "select",
//           value: "Skillful",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "Spring Boot",
//       skill_level: "Skillful",
//       id: "52",
//       fields: [
//         {
//           id: "53",
//           label: "skill",
//           type: "text",
//           value: "Spring Boot",
//         },
//         {
//           id: "54",
//           label: "skill_level",
//           type: "select",
//           value: "Skillful",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "Docker",
//       skill_level: "Experienced",
//       id: "58",
//       fields: [
//         {
//           id: "59",
//           label: "skill",
//           type: "text",
//           value: "Docker",
//         },
//         {
//           id: "60",
//           label: "skill_level",
//           type: "select",
//           value: "Experienced",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "Kubernetes",
//       skill_level: "Skillful",
//       id: "64",
//       fields: [
//         {
//           id: "65",
//           label: "skill",
//           type: "text",
//           value: "Kubernetes",
//         },
//         {
//           id: "66",
//           label: "skill_level",
//           type: "select",
//           value: "Skillful",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "Kafka",
//       skill_level: "Skillful",
//       id: "70",
//       fields: [
//         {
//           id: "71",
//           label: "skill",
//           type: "text",
//           value: "Kafka",
//         },
//         {
//           id: "72",
//           label: "skill_level",
//           type: "select",
//           value: "Skillful",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "CSS",
//       skill_level: "Experienced",
//       id: "76",
//       fields: [
//         {
//           id: "77",
//           label: "skill",
//           type: "text",
//           value: "CSS",
//         },
//         {
//           id: "78",
//           label: "skill_level",
//           type: "select",
//           value: "Experienced",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//     {
//       skill: "PostgresQL",
//       skill_level: "Skillful",
//       id: "82",
//       fields: [
//         {
//           id: "83",
//           label: "skill",
//           type: "text",
//           value: "PostgresQL",
//         },
//         {
//           id: "84",
//           label: "skill_level",
//           type: "select",
//           value: "Skillful",
//           options: ["Novice", "Beginner", "Skillful", "Experienced", "Expert"],
//         },
//       ],
//     },
//   ],
//   employment_history: [
//     {
//       job_title: "Senior Software Developer",
//       employer: "ThoughtWorks",
//       city: "Denver",
//       state: "CO",
//       date_start: "Jan, 2021",
//       date_end: "Present",
//       description:
//         '<p>Served as a team technical anchor for a variety of clients, from Fortune 500 corporations to medium-sized startups.&nbsp;Developed tailored solutions to technical problems based on client needs.</p><p><strong>Projects</strong>:</p><p><em>Construction Machinery Auctioneer - Order Invoice Cash Team (OIC)</em></p><ul><li>Charged with building an order and invoice processing engine alongside additional, interconnected workflows for payment status, out-of-band payments, payment allocations, and finalized taxes.</li><li>Orchestrated a series of code optimization sprints resulting<span style="color: rgb(82, 87, 92);">&nbsp;</span>in a 30% reduction in time-to-market; client accolades for exceptional performance highlighted a 30% increase in velocity and unparalleled code quality consistency.</li></ul><p>Tech stack: Java, Spring Boot, Kafka, Docker, Kubernetes</p><p><em>Construction Machinery Auctioneer - Experience Checkout&nbsp;Team</em></p><ul><li>Transformed the manual auction process into an online e-commerce platform, facilitating the automation of construction equipment sales through various payment solutions and streamlined checkout flows. </li><li>The new checkout flow resulted in a 50% increase in auction event revenue.</li></ul><p>Tech Stack: React, Next.js, Typescript, Java, Stripe API</p><p><em>Pizza Delivery App</em></p><ul><li>Spearheaded the development of a robust digital platform, implementing performance enhancements that boosted online ordering speed by 40% for web and mobile applications, enhancing user experience and increasing customer satisfaction.</li></ul><p>Tech Stack: React, Redux, GraphQL, Next.js, Typescript</p>',
//       id: "13",
//       fields: [
//         {
//           id: "14",
//           label: "job_title",
//           type: "text",
//           value: "Senior Software Developer",
//         },
//         {
//           id: "15",
//           label: "employer",
//           type: "text",
//           value: "ThoughtWorks",
//         },
//         {
//           id: "16",
//           label: "city",
//           type: "text",
//           value: "Denver",
//         },
//         {
//           id: "17",
//           label: "state",
//           type: "text",
//           value: "CO",
//         },
//         {
//           id: "18",
//           label: "date_start",
//           type: "text",
//           value: "Jan, 2021",
//         },
//         {
//           id: "19",
//           label: "date_end",
//           type: "text",
//           value: "Present",
//         },
//         {
//           id: "20",
//           label: "description",
//           type: "html",
//           value:
//             '<p>Served as a team technical anchor for a variety of clients, from Fortune 500 corporations to medium-sized startups.&nbsp;Developed tailored solutions to technical problems based on client needs.</p><p><strong>Projects</strong>:</p><p><em>Construction Machinery Auctioneer - Order Invoice Cash Team (OIC)</em></p><ul><li>Charged with building an order and invoice processing engine alongside additional, interconnected workflows for payment status, out-of-band payments, payment allocations, and finalized taxes.</li><li>Orchestrated a series of code optimization sprints resulting<span style="color: rgb(82, 87, 92);">&nbsp;</span>in a 30% reduction in time-to-market; client accolades for exceptional performance highlighted a 30% increase in velocity and unparalleled code quality consistency.</li></ul><p>Tech stack: Java, Spring Boot, Kafka, Docker, Kubernetes</p><p><em>Construction Machinery Auctioneer - Experience Checkout&nbsp;Team</em></p><ul><li>Transformed the manual auction process into an online e-commerce platform, facilitating the automation of construction equipment sales through various payment solutions and streamlined checkout flows. </li><li>The new checkout flow resulted in a 50% increase in auction event revenue.</li></ul><p>Tech Stack: React, Next.js, Typescript, Java, Stripe API</p><p><em>Pizza Delivery App</em></p><ul><li>Spearheaded the development of a robust digital platform, implementing performance enhancements that boosted online ordering speed by 40% for web and mobile applications, enhancing user experience and increasing customer satisfaction.</li></ul><p>Tech Stack: React, Redux, GraphQL, Next.js, Typescript</p>',
//         },
//       ],
//     },
//     {
//       job_title: "Software Developer",
//       employer: "ThoughtWorks",
//       city: "Denver",
//       state: "CO",
//       date_start: "Jun, 2019",
//       date_end: "Jan 2021",
//       description:
//         "<p><strong>Projects:</strong></p><p><em>Small Business App - Accounts Payable Team</em></p><ul><li>Tim worked as a full stack developer with the Accounts Payable dev team to modernize their existing .NET monolith to a React app with .NET-CORE backend.&nbsp;</li><li>Responsible for managing the life cycle of bills and credit notes for accountants.</li></ul><p>Tech Stack: React, Redux, Typescript, C#, .NET Core</p><p><em>Green Cloud - Internal ThoughtWorks Initiative</em></p><ul><li>Worked on the Green Cloud initiative to build an application that provides visibility and tooling to measure the user's cloud carbon footprint.&nbsp;</li></ul><p>Tech Stack: React, Material UI, AWS, GCP</p><p><em>Cyber Security Startup - Batch Enrollment Team</em></p><ul><li>Tim delivered a scalable batch user enrollment tool under a short deadline</li></ul><p>Tech Stack: React</p><p><em>Retail Corporation - Sitewide Team</em></p><ul><li>Tim helped spearhead the homepage micro-frontend service which was the entry point for third-party services as well as building and maintaining headers, footers, and homepage content&nbsp;</li><li>The sitewide micro-frontend was actively utilized on the homepage of the client's main company site and 5 subsidiary company homepages.&nbsp;</li></ul><p>Tech Stack: React</p>",
//       id: "21",
//       fields: [
//         {
//           id: "22",
//           label: "job_title",
//           type: "text",
//           value: "Software Developer",
//         },
//         {
//           id: "23",
//           label: "employer",
//           type: "text",
//           value: "ThoughtWorks",
//         },
//         {
//           id: "24",
//           label: "city",
//           type: "text",
//           value: "Denver",
//         },
//         {
//           id: "25",
//           label: "state",
//           type: "text",
//           value: "CO",
//         },
//         {
//           id: "26",
//           label: "date_start",
//           type: "text",
//           value: "Jun, 2019",
//         },
//         {
//           id: "27",
//           label: "date_end",
//           type: "text",
//           value: "Jan 2021",
//         },
//         {
//           id: "28",
//           label: "description",
//           type: "html",
//           value:
//             "<p><strong>Projects:</strong></p><p><em>Small Business App - Accounts Payable Team</em></p><ul><li>Tim worked as a full stack developer with the Accounts Payable dev team to modernize their existing .NET monolith to a React app with .NET-CORE backend.&nbsp;</li><li>Responsible for managing the life cycle of bills and credit notes for accountants.</li></ul><p>Tech Stack: React, Redux, Typescript, C#, .NET Core</p><p><em>Green Cloud - Internal ThoughtWorks Initiative</em></p><ul><li>Worked on the Green Cloud initiative to build an application that provides visibility and tooling to measure the user's cloud carbon footprint.&nbsp;</li></ul><p>Tech Stack: React, Material UI, AWS, GCP</p><p><em>Cyber Security Startup - Batch Enrollment Team</em></p><ul><li>Tim delivered a scalable batch user enrollment tool under a short deadline</li></ul><p>Tech Stack: React</p><p><em>Retail Corporation - Sitewide Team</em></p><ul><li>Tim helped spearhead the homepage micro-frontend service which was the entry point for third-party services as well as building and maintaining headers, footers, and homepage content&nbsp;</li><li>The sitewide micro-frontend was actively utilized on the homepage of the client's main company site and 5 subsidiary company homepages.&nbsp;</li></ul><p>Tech Stack: React</p>",
//         },
//       ],
//     },
//     {
//       job_title: "Software Developer",
//       employer: "Bowtie.co",
//       city: "Denver",
//       state: "CO",
//       date_start: "Oct, 2017",
//       date_end: "Jun, 2019",
//       description:
//         "<p>Led the development of the React component library and application boilerplates following the Atomic Design Methodology. Developed greenfield React applications custom-designed to solve client needs.&nbsp;</p><p><strong>Projects:</strong></p><p><em>ASIRD</em></p><ul><li>Built an administrative tool to manage all doctors within the ASIRD association.&nbsp;</li><li>Tim automated the process of creating, editing, and viewing a model page increasing developer velocity and efficiency.</li></ul><p>Tech Stack: React, Recompose, Ruby on Rails, Docker, Bootstrap</p><p><em>BriteBee</em></p><ul><li>Tim led the frontend development of BriteBee which allowed users to anonymously request insurance quotes from agents for home, auto, or life.</li></ul><p>Tech Stack: React, Recompose, Ruby on Rails, Docker</p><p><em>Homebot - First Time Home Buyer App</em></p><ul><li>Tim led the development of the frontend application designed to provide real estate market data for first-time homebuyers.&nbsp;</li></ul><p>Tech Stack: React, Recompose, D3, Ruby on Rails, Docker</p><p><em>Houndstooth</em></p><ul><li>Tim created an open-sourced text and Jekyll CMS editor. Built to accompany the Bowtie Web hosting service, RazorSite.&nbsp;</li></ul><p>Tech Stack: Serverless, React, Recompose, Docker, Atomic Design Methodology</p>",
//       id: "52",
//       fields: [
//         {
//           id: "53",
//           label: "job_title",
//           type: "text",
//           value: "Software Developer",
//         },
//         {
//           id: "54",
//           label: "employer",
//           type: "text",
//           value: "Bowtie.co",
//         },
//         {
//           id: "55",
//           label: "city",
//           type: "text",
//           value: "Denver",
//         },
//         {
//           id: "56",
//           label: "state",
//           type: "text",
//           value: "CO",
//         },
//         {
//           id: "57",
//           label: "date_start",
//           type: "text",
//           value: "Oct, 2017",
//         },
//         {
//           id: "58",
//           label: "date_end",
//           type: "text",
//           value: "Jun, 2019",
//         },
//         {
//           id: "59",
//           label: "description",
//           type: "html",
//           value:
//             "<p>Led the development of the React component library and application boilerplates following the Atomic Design Methodology. Developed greenfield React applications custom-designed to solve client needs.&nbsp;</p><p><strong>Projects:</strong></p><p><em>ASIRD</em></p><ul><li>Built an administrative tool to manage all doctors within the ASIRD association.&nbsp;</li><li>Tim automated the process of creating, editing, and viewing a model page increasing developer velocity and efficiency.</li></ul><p>Tech Stack: React, Recompose, Ruby on Rails, Docker, Bootstrap</p><p><em>BriteBee</em></p><ul><li>Tim led the frontend development of BriteBee which allowed users to anonymously request insurance quotes from agents for home, auto, or life.</li></ul><p>Tech Stack: React, Recompose, Ruby on Rails, Docker</p><p><em>Homebot - First Time Home Buyer App</em></p><ul><li>Tim led the development of the frontend application designed to provide real estate market data for first-time homebuyers.&nbsp;</li></ul><p>Tech Stack: React, Recompose, D3, Ruby on Rails, Docker</p><p><em>Houndstooth</em></p><ul><li>Tim created an open-sourced text and Jekyll CMS editor. Built to accompany the Bowtie Web hosting service, RazorSite.&nbsp;</li></ul><p>Tech Stack: Serverless, React, Recompose, Docker, Atomic Design Methodology</p>",
//         },
//       ],
//     },
//   ],
//   education: [
//     {
//       school: "Turing School of Software and Design",
//       degree: "Front-end Development",
//       city: "Denver",
//       state: "CO",
//       id: "10",
//       fields: [
//         {
//           id: "11",
//           label: "school",
//           type: "text",
//           value: "Turing School of Software and Design",
//         },
//         {
//           id: "12",
//           label: "degree",
//           type: "text",
//           value: "Front-end Development",
//         },
//         {
//           id: "13",
//           label: "city",
//           type: "text",
//           value: "Denver",
//         },
//         {
//           id: "14",
//           label: "state",
//           type: "text",
//           value: "CO",
//         },
//       ],
//     },
//     {
//       school: "Colorado State University",
//       degree: "BS, Business Administration",
//       city: "Fort Collins",
//       state: "CO",
//       id: "30",
//       fields: [
//         {
//           id: "31",
//           label: "school",
//           type: "text",
//           value: "Colorado State University",
//         },
//         {
//           id: "32",
//           label: "degree",
//           type: "text",
//           value: "BS, Business Administration",
//         },
//         {
//           id: "33",
//           label: "city",
//           type: "text",
//           value: "Fort Collins",
//         },
//         {
//           id: "34",
//           label: "state",
//           type: "text",
//           value: "CO",
//         },
//       ],
//     },
//   ],
// } as Prisma.JsonObject;
//   const resumeResponse = await prisma.resume.create({
//     data: {resume}
//   })
// console.log(resumeResponse.resume );
// const deletedResume = await prisma.resume.delete({
//   where: {
//     id: resumeResponse.id,
//   },
// });
// console.log({ deletedResume });
// }
// main()
//   .catch(e => {
//       console.error(e.message)
//   })
//   .finally(async () => {
//       await prisma.$disconnect()
//   })
