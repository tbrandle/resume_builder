import { Button, MenuItem, Select, Stack } from "@mui/material";
import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { defaultResume } from "../data/defaultResume";
import resumeReducer from "../reducers/resumeReducer";
import { omit } from "lodash";
import { useReactToPrint } from "react-to-print";
import { Resume } from "../types/resumeTypes";
import ResumeForm from "../ResumeForm/ResumeForm";

function App() {
  const [formData, dispatch] = useReducer(resumeReducer, defaultResume);
  const [masterList, setMasterList] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch("http://localhost:8080/resumes/list_ids");
        const resumes = await response.json();
        setMasterList(resumes);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchResumes();
  }, []);

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

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/resumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const savedId = await response.json();

      console.log({ savedId });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSelectResume = async (e: any) => {
    console.log(e.target.value);
    if(e.target.value === "new") {
       dispatch({
         type: "SET_RESUME",
         payload: defaultResume,
       });
    } else {
      try {
        const response = await fetch(`http://localhost:8080/resumes/${e.target.value}`);
        const resume = await response.json();
        console.log({resume})

        dispatch({
          type: "SET_RESUME",
          payload: resume,
        });
      } catch (error) {
        console.log({error})
      }
    }
  };

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={formData.resume_title}
        placeholder="Select resume"
        label="Choose resume"
        onChange={handleSelectResume}
      >
        {masterList.map(({ id, title }) => (
          <MenuItem value={id}>{title}</MenuItem>
        ))}
        <MenuItem value={"new"}>Create new resume</MenuItem>
      </Select>
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
              onClick={handleSave}
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
    </>
  );
}

export default App;
