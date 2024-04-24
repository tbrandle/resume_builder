import {
  Education,
  EmploymentHistory,
  PersonalDetails,
  Skill,
  SocialMedia,
} from "../../types/resumeTypes";
import DOMPurify from "isomorphic-dompurify";
import "./PdfView.css";
import React, { Fragment, useRef } from "react";
import Stack from "@mui/material/Stack";
import { useResizeObserver } from "usehooks-ts";
import { useReactToPrint } from "react-to-print";

interface PdfViewProps {
  isBotTheme: boolean;
  personalDetails: PersonalDetails;
  socialMedia: SocialMedia;
  skills: Skill[];
  employmentHistory: EmploymentHistory[];
  education: Education[];
}

// Create Document Component
const PdfView = React.forwardRef<HTMLDivElement | null, PdfViewProps>(
  function PdfView(props, ref) {
    const {
      personalDetails,
      skills,
      employmentHistory,
      education,
      isBotTheme,
    } = props;

    const pageRef = useRef<HTMLDivElement>(null);
    const { width = 0, height = 0 } = useResizeObserver({
      ref: pageRef,
      box: "border-box",
    });

    return (
      <div className="pageContainer">
          <Stack ref={ref} className="page">
            <div className="nameTitleContainer">
              <div
                className="nameTitle"
                style={
                  isBotTheme
                    ? {
                        backgroundImage: "unset",
                        border: "unset",
                        padding: "unset",
                      }
                    : undefined
                }
              >
                <div className="name title">
                  {personalDetails.first_name} {personalDetails.last_name}
                </div>
                <div className="jobTitle">{personalDetails.job_title}</div>
              </div>
            </div>
            <Stack direction={"row"}>
              <div className="col colLeft">
                <div className="details section">
                  <div className="title">Details</div>

                  <div className="section">
                    <div className="subTitle">Phone</div>
                    <div>{personalDetails.phone_number}</div>
                  </div>
                  <div className="section">
                    <div className="subTitle">Email</div>
                    <div>{personalDetails.email}</div>
                  </div>
                </div>
                <div className="details section ">
                  <div className="title">Skills</div>
                  {skills.map(({ skill, skill_level }, i) => (
                    <Fragment key={`${skill}-${i}`}>
                      <div
                        className="skill"
                        style={
                          isBotTheme
                            ? {
                                border: "unset",
                                padding: "unset",
                              }
                            : undefined
                        }
                      >
                        {skill}
                      </div>
                      {/* <div>{skill_level}</div> */}
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="col colRight">
                <div className="section">
                  <div className="title">Profile</div>
                  <div
                    className="professionalSummary"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        personalDetails.professional_summary
                      ),
                    }}
                  />
                </div>
                <div className="section">
                  <div className="title">Employment History</div>
                  {employmentHistory.map((employment, i) => {
                    return (
                      <div key={i}>
                        <div className="employmentHeader">
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                          >
                            <div className="subTitle">
                              {employment.job_title}, {employment.employer}
                            </div>
                            <div>
                              {employment.city}, {employment.state}
                            </div>
                          </Stack>
                          <div>
                            {employment.date_start} - {employment.date_end}
                          </div>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(employment.description),
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="section">
                  <div className="title">Education</div>
                  {education.map((ed, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="subTitle">
                          {ed.degree}, {ed.school}
                        </div>
                        <div>
                          {ed.city}, {ed.state}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Stack>
          </Stack>
        </div>
    );
  },
);

export default PdfView;
