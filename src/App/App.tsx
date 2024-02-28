import { Button, Stack } from "@mui/material";
import ResumeForm from "../ResumeForm/ResumeForm";
import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useMemo, useReducer, useRef, useState } from "react";
import { defaultResume } from "../data/defaultResume";
import resumeReducer from "../reducers/resumeReducer";
import { Resume } from "../types/resumeTypes";
import { omit } from "lodash";
import { useReactToPrint } from "react-to-print";

function App() {
  const [formData, dispatch] = useReducer(resumeReducer, defaultResume);

  const pdfRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  const personlDetails = useMemo(
    () => omit(formData.personal_details, ["fields"]),
    [formData.personal_details]
  );
  const socialMedia = useMemo(
    () => omit(formData.social_media, ["fields"]),
    [formData.social_media]
  );
  const skills = useMemo(
    () => formData.skills.map((skill) => omit(skill, ["fields"])),
    [formData.skills]
  );

  const employmentHistory = useMemo(
    () =>
      formData.employment_history.map((history) => omit(history, ["fields"])),
    [formData.employment_history]
  );

  const education = useMemo(
    () => formData.education.map((education) => omit(education, ["fields"])),
    [formData.education]
  );

  return (
    <Stack direction={"row"} useFlexGap>
      <ResumeForm formData={formData} dispatch={dispatch} />
      <Stack
        style={{
          flexGrow: "1",
          alignItems: "center",
          backgroundColor: "#aca8a8",
          overflow: "scroll",
          height: "100vh",
          paddingBottom: "30px",
        }}
      >
        <Button
          style={{ margin: "30px 0", width: "fit-content" }}
          variant="contained"
          onClick={handlePrint}
        >
          Generate PDF
        </Button>
        <PdfView
          ref={pdfRef}
          personalDetails={personlDetails}
          socialMedia={socialMedia}
          skills={skills}
          employmentHistory={employmentHistory}
          education={education}
        />
      </Stack>
    </Stack>
  );
}

export default App;
