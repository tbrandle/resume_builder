import Stack from "@mui/material/Stack";

import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { defaultResume } from "../../data/defaultData";
import resumeReducer, { actionConstants } from "../../reducers/resumeReducer";
import ResumeForm from "../ResumeForm/ResumeForm";
import Header from "../Header/Header";
import useBuildPdfData from "../../hooks/useBuildPdfData";
import { useSearchParams } from "react-router-dom";
import useApi from "../../hooks/useApi";

function App() {
  const [formData, dispatch] = useReducer(resumeReducer, defaultResume());

  const [searchParams] = useSearchParams();
  const params = useMemo(() => searchParams, [searchParams]);
  const { api } = useApi();

  useEffect(() => {
    const fetchResume = async () => {
      const resumeId = params.get("resumeId");
      if (resumeId) {
        const resume = await api.get(resumeId);
        dispatch({
          type: actionConstants.SET_RESUME,
          payload: resume,
        });
      }
    };

    fetchResume();
  }, [params, api]);

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const { personlDetails, socialMedia, skills, employmentHistory, education } =
    useBuildPdfData(formData);

  return (
    <>
      <Header formData={formData} dispatch={dispatch} pdfRef={pdfRef} />
      <Stack direction={"row"} useFlexGap>
        {formData.id ? (
          <>
            <ResumeForm formData={formData} dispatch={dispatch} />
            <Stack className={"pdfViewContainer"}>
              <PdfView
                ref={pdfRef}
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
