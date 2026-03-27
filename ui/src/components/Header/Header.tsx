import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Delete from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import Save from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  Dispatch,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import { defaultResume } from "../../data/defaultData";
import useApi from "../../hooks/useApi";
import { Action, actionConstants } from "../../reducers/resumeReducer";
import { Resume } from "../../types/resumeTypes";
import { useSearchParams } from "react-router-dom";

interface HeaderProps {
  resume: Resume;
  numberOfPages: number;
  isSaved: boolean;
  dispatch: Dispatch<Action>;
  pdfRef: RefObject<HTMLDivElement>;
}

const Header = ({
  resume,
  numberOfPages,
  isSaved,
  dispatch,
  pdfRef,
}: HeaderProps) => {
  const { api } = useApi();
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectResumeList, setSelectResumeList] = useState<
    { id: string; title: string }[]
  >([]);

  const fetchAndSetMasterList = useCallback(async () => {
    try {
      const response = await api.get("list_ids");
      setSelectResumeList(response);
    } catch (error) {
      setErrorMsg("Failed to load resume list.");
    }
  }, [setSelectResumeList, api]);

  useEffect(() => {
    const fetchResumes = async () => {
      await fetchAndSetMasterList();
    };
    fetchResumes();
  }, [fetchAndSetMasterList, searchParams]);

  const handleDuplicate = async () => {
    const duplicateResume: Resume = {
      ...resume,
      resume_title: `${resume.resume_title} (duplicate)`,
    };
    delete duplicateResume.id;
    try {
      const newResume = await api.post(duplicateResume);
      setSearchParams({ resumeId: newResume.id });
    } catch (error) {
      setErrorMsg("Failed to duplicate resume. Please try again.");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: resume.resume_title,
  });

  const handleSave = async () => {
    try {
      resume.id ? await api.patch(resume.id, resume) : await api.post(resume);
      dispatch({
        type: actionConstants.SAVE_RESUME,
      });
      fetchAndSetMasterList();
    } catch (e) {
      setErrorMsg("Failed to save resume. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (resume.id) {
      try {
        await api.delete(resume.id);
        searchParams.delete("resumeId");
        setSearchParams(searchParams);
        fetchAndSetMasterList();
      } catch (error) {
        setErrorMsg("Failed to delete resume. Please try again.");
        return;
      }
    }
    dispatch({
      type: actionConstants.SET_RESUME,
      payload: defaultResume(),
    });
  };

  const createNewResume = async () => {
    try {
      const { id } = await api.post(defaultResume({ resume_title: "New" }));
      setSearchParams({ resumeId: id });
    } catch (error) {
      setErrorMsg("Failed to create resume. Please try again.");
    }
  };

  const handleSelectResume = (e: SelectChangeEvent<string>) => {
    setSearchParams({ resumeId: e.target.value });
  };

  const iconButtonSx = { "&:hover": { color: "black" } };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: "rgb(172, 168, 168)",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <Stack direction={"row"} columnGap={4}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="resume-select-label">Select resume</InputLabel>
            <Select
              labelId="resume-select-label"
              id="demo-simple-select"
              onChange={handleSelectResume}
              value={
                selectResumeList.find(
                  (resume) => resume.id === searchParams.get("resumeId"),
                )?.id || ""
              }
            >
              {selectResumeList.map(({ id, title }, i) => {
                return (
                  <MenuItem key={`${id}-${i}`} value={id}>
                    {" "}
                    {title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
        <Box sx={{ alignContent: "center" }}>
          {numberOfPages} {numberOfPages < 2 ? "page" : "pages"}
        </Box>
        <Stack direction={"row"} columnGap={3} alignItems="center">
          <Tooltip title="New resume">
            <IconButton sx={iconButtonSx} onClick={createNewResume}>
              <AddCircleOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download PDF">
            <IconButton sx={iconButtonSx} onClick={handlePrint}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Duplicate">
            <IconButton sx={iconButtonSx} onClick={handleDuplicate}>
              <ContentCopy />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save">
            <span>
              <IconButton
                sx={iconButtonSx}
                onClick={handleSave}
                disabled={isSaved}
              >
                <Save />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton sx={iconButtonSx} onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setErrorMsg(null)}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
