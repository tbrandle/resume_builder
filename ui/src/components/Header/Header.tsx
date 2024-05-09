import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
  formData: Resume;
  dispatch: Dispatch<Action>;
  pdfRef: RefObject<HTMLDivElement>;
}

const Header = ({ formData, dispatch, pdfRef }: HeaderProps) => {
  const { api } = useApi();
  let [searchParams, setSearchParams] = useSearchParams();

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
      ...formData,
      resume_title: `${formData.resume_title} (duplicate)`,
    };
    delete duplicateResume.id;
    const newResume = await api.post(duplicateResume);
    setSearchParams({ resumeId: newResume.id });
  };

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  const handleSave = async () => {
    formData.id
      ? await api.patch(formData.id, formData)
      : await api.post(formData);
    fetchAndSetMasterList();
  };

  const handleDelete = async (id: string) => {
    await api.delete(id);
    searchParams.delete("resumeId");
    setSearchParams(searchParams);
  };

  const createNewResume = async () => {
    const { id } = await api.post(defaultResume({ resume_title: "New" }));
    setSearchParams({ resumeId: id })
  };

  const handleSelectResume = async (e: any) => {
    setSearchParams({ resumeId: e.target.value });
  };

  return (
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
          value={selectResumeList.find((resume) => resume.id === searchParams.get("resumeId"))?.id || ""}
        >
          {selectResumeList.map(({ id, title }, i) => {
            return <MenuItem key={`${id}-${i}`} value={id}> {title}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <Stack direction={"row"} columnGap={3} alignItems="center">
        <Tooltip title="New resume">
          <IconButton
            style={{ width: "fit-content" }}
            onClick={createNewResume}
          >
            <AddCircleOutline />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download PDF">
          <IconButton style={{ width: "fit-content" }} onClick={handlePrint}>
            <Download />
          </IconButton>
        </Tooltip>
        <Tooltip title="Duplicate">
          <IconButton
            style={{ width: "fit-content" }}
            onClick={handleDuplicate}
          >
            <ContentCopy />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save">
          <IconButton style={{ width: "fit-content" }} onClick={handleSave}>
            <Save />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
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
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Header;
