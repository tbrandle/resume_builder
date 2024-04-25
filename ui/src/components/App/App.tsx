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
import useResizeObserver from "use-resize-observer";

function App() {
  const [{ resume, isSaved }, dispatch] = useReducer(resumeReducer, {
    isSaved: true,
    resume: defaultResume(),
  });

  const [isBotTheme, setIsBotTheme] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => searchParams, [searchParams]);
  const { api, isLoading, error } = useApi();

  console.log({ isLoading });

  useEffect(() => {
    const fetchResume = async () => {
      const resumeId = params.get("resumeId");
      if (resumeId) {
        try {
          const savedResume = await api.get(resumeId);
          console.log({ savedResume });
          dispatch({
            type: actionConstants.SET_RESUME,
            payload: savedResume,
          });
        } catch (error) {
          setSearchParams();
        }
      }
    };

    fetchResume();
  }, [params, api]);

  const { ref, height = 0 } = useResizeObserver({
    box: "content-box"
  });

  if(height) {
    console.log({ height }, new Date(Date.now()).toLocaleString());
  }

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const { personlDetails, socialMedia, skills, employmentHistory, education } =
    useBuildPdfData(resume);

  return (
    <>
      <Header
        resume={resume}
        numberOfPages={Math.ceil(height / 1094)}
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
                pageRef={ref}
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
