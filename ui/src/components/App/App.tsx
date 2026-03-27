import Stack from "@mui/material/Stack";
import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useEffect, useReducer, useRef } from "react";
import { defaultResume } from "../../data/defaultData";
import resumeReducer, { actionConstants } from "../../reducers/resumeReducer";
import ResumeForm from "../ResumeForm/ResumeForm";
import Header from "../Header/Header";
import useBuildPdfData from "../../hooks/useBuildPdfData";
import { useSearchParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import useResizeObserver from "use-resize-observer";
import { PDF_PAGE_HEIGHT_PX } from "../../constants/pdf";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getThemeById, DEFAULT_THEME_ID, ThemeOptions } from "../../themes/resumeThemes";

function App() {
  const [{ resume, isSaved }, dispatch] = useReducer(resumeReducer, {
    isSaved: true,
    resume: defaultResume(),
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { api } = useApi();

  useEffect(() => {
    const fetchResume = async () => {
      const resumeId = searchParams.get("resumeId");
      if (resumeId) {
        try {
          const savedResume = await api.get(resumeId);
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
  }, [searchParams, api]);

  const { ref, height = 0 } = useResizeObserver({
    box: "content-box",
  });

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const { personalDetails, socialMedia, skills, employmentHistory, education } =
    useBuildPdfData(resume);

  const resolvedTheme = resume.customThemeJSON
    ? createTheme(resume.customThemeJSON)
    : (getThemeById(resume.theme) ?? getThemeById(DEFAULT_THEME_ID)!);

  const handleThemeChange = (themeId: string) => {
    dispatch({
      type: actionConstants.SET_THEME,
      payload: { theme: themeId, customThemeJSON: undefined },
    });
  };

  const handleCustomThemeUpload = (json: ThemeOptions) => {
    dispatch({
      type: actionConstants.SET_THEME,
      payload: { theme: "custom", customThemeJSON: json },
    });
  };

  return (
    <>
      <Header
        resume={resume}
        numberOfPages={Math.ceil(height / PDF_PAGE_HEIGHT_PX)}
        isSaved={isSaved}
        dispatch={dispatch}
        pdfRef={pdfRef}
        theme={resume.theme}
        onThemeChange={handleThemeChange}
        onCustomThemeUpload={handleCustomThemeUpload}
      />
      <Stack direction={"row"} useFlexGap>
        {resume.id ? (
          <>
            <ResumeForm resume={resume} dispatch={dispatch} />
            <Stack className={"pdfViewContainer"}>
              <ThemeProvider theme={resolvedTheme}>
                <PdfView
                  ref={pdfRef}
                  pageRef={ref}
                  personalDetails={personalDetails}
                  socialMedia={socialMedia}
                  skills={skills}
                  employmentHistory={employmentHistory}
                  education={education}
                />
              </ThemeProvider>
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
