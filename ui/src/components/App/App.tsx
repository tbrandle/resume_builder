import Stack from "@mui/material/Stack";

import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { defaultResume } from "../../data/defaultData";
import resumeReducer, { actionConstants } from "../../reducers/resumeReducer";
import ResumeForm from "../ResumeForm/ResumeForm";
import Header from "../Header/Header";
import useBuildPdfData from "../../hooks/useBuildPdfData";
import { useSearchParams } from "react-router-dom";
import useApi from "../../hooks/useApi";

function App() {
  const [{ resume, isSaved }, dispatch] = useReducer(resumeReducer, {
    isSaved: true,
    resume: defaultResume(),
  });

  const [isBotTheme, setIsBotTheme] = useState(false);

  const [searchParams] = useSearchParams();
  const params = useMemo(() => searchParams, [searchParams]);
  const { api } = useApi();

  useEffect(() => {
    const fetchResume = async () => {
      const resumeId = params.get("resumeId");
      if (resumeId) {
        const savedResume = await api.get(resumeId);
        dispatch({
          type: actionConstants.SET_RESUME,
          payload: savedResume,
        });
      }
    };

    fetchResume();
  }, [params, api]);

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const { personlDetails, socialMedia, skills, employmentHistory, education } =
    useBuildPdfData(resume);

  return (
    <>
      <Header
        resume={resume}
        isSaved={isSaved}
        dispatch={dispatch}
        pdfRef={pdfRef}
        isBotTheme={isBotTheme}
        setIsBotTheme={setIsBotTheme}
      />
      <Stack direction={"row"} useFlexGap>
        {resume.id ? (
          <>
            <ResumeForm resume={resume} dispatch={dispatch} />
            <Stack className={"pdfViewContainer"}>
              <PdfView
                ref={pdfRef}
                isBotTheme={isBotTheme}
                personalDetails={personlDetails}
                socialMedia={socialMedia}
                skills={skills}
                employmentHistory={employmentHistory}
                education={education}
              />
            </Stack>
          </>
        ) : (
          <Stack className={"emptyStateContainer"}>
            Select a resume or create new
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default App;
