import {
  Education,
  EmploymentHistory,
  ProfileDetails,
  Skill,
  SocialMedia,
} from "../types/resumeTypes";
import DOMPurify from "isomorphic-dompurify";
import "./PdfView.css";
import { Container } from "@mui/material";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import React from "react";

interface PdfViewProps {
  personalDetails: ProfileDetails;
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
                  <div className="subTitle">
                    {employment.job_title}, {employment.employer}
                  </div>
                );
              })}
            </div>
            <div className="section">
              <div className="title">Education</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default PdfView;
