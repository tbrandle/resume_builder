import {
  Education,
  EmploymentHistory,
  PersonalDetails,
  Skill,
  SocialMedia,
} from "../types/resumeTypes";
import DOMPurify from "isomorphic-dompurify";
import "./PdfView.css";
import React from "react";

interface PdfViewProps {
  personalDetails: PersonalDetails;
  socialMedia: SocialMedia;
  skills: Skill[];
  employmentHistory: EmploymentHistory[];
  education: Education[];
}

// Create Document Component
const PdfView = React.forwardRef<HTMLDivElement | null, PdfViewProps>(
  (props, ref) => {
    const {
      personalDetails,
      socialMedia,
      skills,
      employmentHistory,
      education,
    } = props;

    return (
      <div
        style={{
          border: "1px #131212 solid",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
          margin: "0 auto",
          width: "fit-content",
        }}
      >
        <div ref={ref}>
          <div className="page">
            <div className="nameTitle">
              <div className="name title">
                {personalDetails.first_name} {personalDetails.last_name}
              </div>
              <div className="jobTitle">{personalDetails.job_title}</div>
            </div>
            <div className="col colLeft">
              <div className="details section firstPageOffset">
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
                {skills.map(({ skill, skill_level }) => (
                  <>
                    <div className="skill">{skill}</div>
                    {/* <div>{skill_level}</div> */}
                  </>
                ))}
              </div>
            </div>
            <div className="col colRight">
              <div className="section firstPageOffset">
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
                {employmentHistory.map((employment) => {
                  return (
                    <div>
                      <div className="employmentHeader">
                        <div className="employmentDetails">
                          <div className="subTitle">
                            {employment.job_title}, {employment.employer}
                          </div>
                          <div>
                            {employment.city}, {employment.state}
                          </div>
                        </div>
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
                {education.map((ed) => {
                  return (
                    <div
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
          </div>
        </div>
      </div>
    );
  }
);

export default PdfView;
