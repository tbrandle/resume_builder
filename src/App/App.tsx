import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { defaultResume } from "../data/defaultResume";
import resumeReducer, { actionConstants } from "../reducers/resumeReducer";
import { omit } from "lodash";
import { useReactToPrint } from "react-to-print";
import { Resume } from "../types/resumeTypes";
import ResumeForm from "../ResumeForm/ResumeForm";
import { Delete } from "@mui/icons-material";

function App() {
  const [formData, dispatch] = useReducer(resumeReducer, defaultResume);
  const [masterList, setMasterList] = useState([]);
  const [isSaved, setIsSaved] = useState(true)

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
      type: actionConstants.SET_RESUME,
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

  const fetchAndSetMasterList = async () => {
    try {
      const response = await fetch("http://localhost:8080/resumes/list_ids");
      const resumes = await response.json();
      setMasterList(resumes);
    } catch (error) {
      console.log({ error });
    }
  };

  const getResume = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/resumes/${id}`);
      const resume = await response.json();
      console.log({ resume });
      return resume;
    } catch (error) {
      console.log({ error });
    }
  };

  const createNewResume = async (resume: Resume) => {
    try {
      const response = await fetch(`http://localhost:8080/resumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resume),
      });
      const savedId = await response.json();
    } catch (error) {
      console.log({ error });
    }
  };

  const updateResume = async (resume: Resume) => {
    try {
      const response = await fetch(
        `http://localhost:8080/resumes/${resume.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resume),
        }
      );
      const savedId = await response.json();

      console.log({ savedId });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSave = async () => {
    formData.id 
      ? await updateResume(formData) 
      : await createNewResume(formData);
    fetchAndSetMasterList();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/resumes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const deletedId = await response.json();

      console.log({ deletedId });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSelectResume = async (e: any) => {
    console.log(e.target.value);
    if (e.target.value === "new") {
      dispatch({
        type: actionConstants.SET_RESUME,
        payload: defaultResume,
      });
    } else {
      const resume = await getResume(e.target.value);
      dispatch({
        type: actionConstants.SET_RESUME,
        payload: resume,
      });
    }
  };

  return (
    <>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 200, margin: "32px" }}
      >
        <InputLabel id="resume-select-label">Select resume</InputLabel>
        <Select
          labelId="resume-select-label"
          id="demo-simple-select"
          defaultValue={formData.resume_title}
          title={formData.resume_title}
          onChange={handleSelectResume}
        >
          {masterList.map(({ id, title }) => (
            <MenuItem value={id}> {title}</MenuItem>
          ))}
          <MenuItem value={"new"}>Create new resume</MenuItem>
        </Select>
      </FormControl>
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
          <Stack
            direction={"row"}
            spacing={2}
            columnGap={3}
            alignItems="center"
          >
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
            <IconButton
              sx={{ color: "grey", marginLeft: "12px" }}
              onClick={async () => {
                if (formData.id) {
                  await handleDelete(formData.id);
                  fetchAndSetMasterList();
                }
                dispatch({
                  type: actionConstants.SET_RESUME,
                  payload: defaultResume,
                });
              }}
            >
              <Delete />
            </IconButton>
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
