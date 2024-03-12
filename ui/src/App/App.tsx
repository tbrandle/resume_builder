
import Stack from "@mui/material/Stack";

import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useReducer, useRef } from "react";
import { defaultResume } from "../data/defaultData";
import resumeReducer from "../reducers/resumeReducer";
import ResumeForm from "../ResumeForm/ResumeForm";
import Header from "../Header/Header";
import useBuildPdfData from "../hooks/useBuildPdfData";

function App() {
  const [formData, dispatch] = useReducer(resumeReducer, defaultResume());

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const { 
    personlDetails, 
    socialMedia, 
    skills, 
    employmentHistory, 
    education 
  } = useBuildPdfData(formData);

  return (
    <>
      <Header formData={formData} dispatch={dispatch} pdfRef={pdfRef} />
      <Stack direction={"row"} useFlexGap>
        <ResumeForm formData={formData} dispatch={dispatch} />
        <Stack
          style={{
            flexGrow: "1",
            alignItems: "center",
            backgroundColor: "#aca8a8",
            overflow: "scroll",
            height: "94vh",
            paddingBottom: "30px",
          }}
        >
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
    </>
  );
}

export default App;
