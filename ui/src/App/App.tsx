import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Delete from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import Save from "@mui/icons-material/Save";
import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { defaultResume } from "../data/defaultData";
import resumeReducer, {
  actionConstants,
} from "../reducers/resumeReducer";
import { omit } from "lodash";
import { useReactToPrint } from "react-to-print";
import { Resume } from "../types/resumeTypes";
import ResumeForm from "../ResumeForm/ResumeForm";
import useApi from "../hooks/useApi";

function App() {
  const [formData, dispatch] = useReducer(resumeReducer, defaultResume());
  const [selectResumeList, setSelectResumeList] = useState<{ id: string; title: string }[]>(
    []
  );

  const { api, error, isLoading } = useApi();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch("http://localhost:8080/resumes/list_ids");
        const resumes = await response.json();
        setSelectResumeList(resumes);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchResumes();
  }, []);


  const pdfRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  const handleDuplicate = async () => {
    const duplicateResume: Resume = {...formData, resume_title: `${formData.resume_title} (duplicate)`}
    delete duplicateResume.id
    const newResume = await api.post(duplicateResume)
    await fetchAndSetMasterList();
     dispatch({
       type: actionConstants.SET_RESUME,
       payload: await api.get(newResume.id),
     });
  };

  const personlDetails = useMemo(
    () => omit(formData.personal_details, ["fields"]),
    [formData.personal_details]
  );
  const socialMedia = useMemo(
    () => omit(formData.social_media, ["fields"]),
    [formData.social_media]
  );
  const skills = useMemo(() => {
    return formData.skills.map((skill) => omit(skill, ["fields"]));
  }, [formData.skills]);
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
    const response = await api.get("list_ids");
    setSelectResumeList(response);
  };

  const handleSave = async () => {
    formData.id
      ? await api.patch(formData.id, formData)
      : await api.post(formData);
    fetchAndSetMasterList();
  };

  const handleDelete = async (id: string) => {
    console.log("DELETE", id)
    await api.delete(id);
  };

  const [selectedResume, setSelectedResume] = useState({id: formData.id, title: formData.resume_title})

  const createNewResume = async() => {
    const { id } = await api.post(defaultResume({ resume_title: "New" }));
    const newResume = await api.get(id);
    await fetchAndSetMasterList()
    dispatch({
      type: actionConstants.SET_RESUME,
      payload: newResume,
    });
  }

  const handleSelectResume = async (e: any) => {
    
      const resume = await api.get(e.target.value);
      dispatch({
        type: actionConstants.SET_RESUME,
        payload: resume,
      });
  };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: "rgb(172, 168, 168)",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="resume-select-label">Select resume</InputLabel>
          <Select
            labelId="resume-select-label"
            id="demo-simple-select"
            onChange={handleSelectResume}
          >
            {selectResumeList.map(({ id, title }) => {
              return <MenuItem value={id}> {title}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <Stack direction={"row"} columnGap={3} alignItems="center">
          <IconButton
            style={{ width: "fit-content" }}
            onClick={createNewResume}
          >
            <AddCircleOutline />
          </IconButton>
          <IconButton style={{ width: "fit-content" }} onClick={handlePrint}>
            <Download />
          </IconButton>
          <IconButton
            style={{ width: "fit-content" }}
            onClick={handleDuplicate}
          >
            <ContentCopy />
          </IconButton>
          <IconButton style={{ width: "fit-content" }} onClick={handleSave}>
            <Save />
          </IconButton>
          <IconButton
            // sx={{ color: "grey", marginLeft: "12px" }}
            onClick={async () => {
              if (formData.id) {
                await handleDelete(formData.id);
                fetchAndSetMasterList();
              }
              dispatch({
                type: actionConstants.SET_RESUME,
                payload: defaultResume(),
              });
            }}
          >
            <Delete />
          </IconButton>
        </Stack>
      </Stack>
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
