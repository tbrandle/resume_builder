import "./Header.css";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Delete from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import Save from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Dispatch, RefObject, useCallback, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { defaultResume } from "../../data/defaultData";
import useApi from "../../hooks/useApi";
import { Action, actionConstants } from "../../reducers/resumeReducer";
import { Resume } from "../../types/resumeTypes";
import { useSearchParams } from "react-router-dom";

interface HeaderProps {
  resume: Resume;
  isSaved: boolean;
  dispatch: Dispatch<Action>;
  pdfRef: RefObject<HTMLDivElement>;
}

const Header = ({ resume, isSaved, dispatch, pdfRef }: HeaderProps) => {
  const { api } = useApi();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectResumeList, setSelectResumeList] = useState<
    { id: string; title: string }[]
  >([]);

  const fetchAndSetMasterList = useCallback(async () => {
    const response = await api.get("list_ids");
    setSelectResumeList(response);
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
    const newResume = await api.post(duplicateResume);
    setSearchParams({ resumeId: newResume.id });
  };

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  const handleSave = async () => {
    try {
      resume.id ? await api.patch(resume.id, resume) : await api.post(resume);
      dispatch({
        type: actionConstants.SAVE_RESUME,
      });
      fetchAndSetMasterList();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    if (resume.id) {
      await api.delete(resume.id);
      searchParams.delete("resumeId");
      setSearchParams(searchParams);
      fetchAndSetMasterList();
    }
    dispatch({
      type: actionConstants.SET_RESUME,
      payload: defaultResume(),
    });
  };

  const createNewResume = async () => {
    const { id } = await api.post(defaultResume({ resume_title: "New" }));
    setSearchParams({ resumeId: id });
  };

  const handleSelectResume = async (e: SelectChangeEvent<string>) => {
    setSearchParams({ resumeId: e.target.value });
  };

  return (
    <Stack direction={"row"} className={"headerContainer"}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="resume-select-label">Select resume</InputLabel>
        <Select
          labelId="resume-select-label"
          id="demo-simple-select"
          onChange={handleSelectResume}
          value={
            selectResumeList.find(
              (resume) => resume.id === searchParams.get("resumeId")
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

      <Stack direction={"row"} columnGap={3} alignItems="center">
        <Tooltip title="New resume">
          <IconButton className={"iconButton"} onClick={createNewResume}>
            <AddCircleOutline />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download PDF">
          <IconButton className={"iconButton"} onClick={handlePrint}>
            <Download />
          </IconButton>
        </Tooltip>
        <Tooltip title="Duplicate">
          <IconButton className={"iconButton"} onClick={handleDuplicate}>
            <ContentCopy />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save">
          <IconButton
            className={"iconButton"}
            onClick={handleSave}
            disabled={isSaved}
          >
            <Save />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton className={"iconButton"} onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Header;
