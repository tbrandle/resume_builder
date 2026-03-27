import React from "react";
import "../ResumeForm/ResumeForm.css";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="sectionTitle">{children}</h3>
);

export default SectionTitle;
