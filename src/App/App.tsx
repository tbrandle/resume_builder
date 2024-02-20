import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import ResumeForm from "../ResumeForm/ResumeForm";
import "./App.css";
import PdfView from "../PdfView/PdfView";
import { useMemo, useReducer, useState } from "react";
import { defaultResume } from "../data/defaultResume";
import resumeReducer from "../reducers/resumeReducer";
import { Resume } from "../types/resumeTypes";
import { filter, omit } from "lodash";

function App() {
  const [formData, dispatch] = useReducer(resumeReducer, defaultResume);
  const [isOpen, setIsOpen] = useState(false);

  const personlDetails = omit(formData.personal_details, ["fields"]);

  // const buildPdfForm = (formData: T) => {
  //   return {};
  // };

  return (
    // <Container maxWidth="lg">
    <>
      <Stack direction={"row"}>
        <ResumeForm formData={formData} dispatch={dispatch} />
        <PdfView personalDetails={personlDetails} />
      </Stack>
    </>
    // </Container>
  );
}

export default App;
