import { Button, Stack } from "@mui/material";
import ResumeForm from "../ResumeForm/ResumeForm";
import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { defaultResume } from "../data/defaultResume";
import resumeReducer from "../reducers/resumeReducer";
import { omit } from "lodash";
import { useReactToPrint } from "react-to-print";
import { Resume } from "../types/resumeTypes";

function App() {
  const [formData, dispatch] = useReducer(resumeReducer, defaultResume);

  useEffect(() => {
    const resumeListString = window.localStorage.getItem("resume_list") || "[]";
    const resumeList: Resume[] = JSON.parse(resumeListString);
    dispatch({
      type: "SET_RESUME",
      payload: resumeList[0] ? resumeList[0] : defaultResume,
    });
  }, []);

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
        <Stack direction={"row"} spacing={2} columnGap={3}>
          <Button
            style={{ margin: "30px 0", width: "fit-content" }}
            variant="contained"
            onClick={handlePrint}
          >
            Generate PDF
          </Button>
          <Button
            style={{ margin: "30px 0", width: "fit-content" }}
            variant="contained"
            onClick={() =>
              window.localStorage.setItem(
                "resume_list",
                JSON.stringify([formData])
              )
            }
          >
            Save PDF
          </Button>
        </Stack>
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
