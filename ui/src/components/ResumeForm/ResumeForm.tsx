import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useCallback } from "react";
import { Action, actionConstants } from "../../reducers/resumeReducer";
import { Field, Resume } from "../../types/resumeTypes";
import "react-quill/dist/quill.snow.css";
import { FormSection } from "./FormSection";
import SortableColumn from "./SortableColumn";
import SortableItemSummary from "./SortableItemSummary";
import SectionTitle from "../shared/SectionTitle";
import TextField from "@mui/material/TextField";

const ResumeForm = ({
  resume,
  dispatch,
}: {
  resume: Resume;
  dispatch: React.Dispatch<Action>;
}) => {
  const handleUpdatePersonalDetails = useCallback(
    (payload: Field) =>
      dispatch({ type: actionConstants.UPDATE_PERSONAL_DETAILS, payload }),
    [dispatch],
  );

  const handleUpdateSocialMedia = useCallback(
    (payload: Field) =>
      dispatch({ type: actionConstants.UPDATE_SOCIAL_MEDIA, payload }),
    [dispatch],
  );

  const handleSkillsUpdate = useCallback(
    (parentId: string) => (fieldPayload: Field) =>
      dispatch({
        type: actionConstants.UPDATE_SKILLS,
        payload: { parentId, fieldPayload },
      }),
    [dispatch],
  );

  const handleSkillsDelete = useCallback(
    (parentId: string) => () =>
      dispatch({ type: actionConstants.DELETE_SKILL, payload: parentId }),
    [dispatch],
  );

  const handleSkillsDragEnd = useCallback(
    (activeId: string, overId: string) =>
      dispatch({
        type: actionConstants.REORDER_SKILLS,
        payload: { activeId, overId },
      }),
    [dispatch],
  );

  const handleEmploymentUpdate = useCallback(
    (parentId: string) => (fieldPayload: Field) =>
      dispatch({
        type: actionConstants.UPDATE_EMPLOYMENT_HISTORY,
        payload: { parentId, fieldPayload },
      }),
    [dispatch],
  );

  const handleEmploymentDelete = useCallback(
    (parentId: string) => () =>
      dispatch({
        type: actionConstants.DELETE_EMPLOYMENT,
        payload: parentId,
      }),
    [dispatch],
  );

  const handleEmploymentDragEnd = useCallback(
    (activeId: string, overId: string) =>
      dispatch({
        type: actionConstants.REORDER_EMPLOYMENT_HISTORY,
        payload: { activeId, overId },
      }),
    [dispatch],
  );

  const handleEducationUpdate = useCallback(
    (parentId: string) => (fieldPayload: Field) =>
      dispatch({
        type: actionConstants.UPDATE_EDUCATION,
        payload: { parentId, fieldPayload },
      }),
    [dispatch],
  );

  const handleEducationDelete = useCallback(
    (parentId: string) => () =>
      dispatch({
        type: actionConstants.DELETE_EDUCATION,
        payload: parentId,
      }),
    [dispatch],
  );

  const handleEducationDragEnd = useCallback(
    (activeId: string, overId: string) =>
      dispatch({
        type: actionConstants.REORDER_EDUCATION,
        payload: { activeId, overId },
      }),
    [dispatch],
  );

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        p: 4,
        overflow: "scroll",
        height: "92vh",
      }}
    >
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent={"space-between"}
      >
        <TextField
          id="standard-basic"
          label={"Resume Title"}
          value={resume.resume_title}
          variant="standard"
          fullWidth
          onChange={(e) => {
            dispatch({
              type: actionConstants.UPDATE_RESUME_TITLE,
              payload: e.target.value,
            });
          }}
        />
        <FormSection
          title={<SectionTitle>Personal Details</SectionTitle>}
          data={resume.personal_details}
          handleUpdate={handleUpdatePersonalDetails}
        />
        <FormSection
          title={<SectionTitle>Social Media</SectionTitle>}
          data={resume.social_media}
          handleUpdate={handleUpdateSocialMedia}
        />

        <SortableColumn
          columnTitle={"Skills"}
          onDragEnd={handleSkillsDragEnd}
          listItemTitle={(skill) => (
            <SortableItemSummary
              primary={skill.skill}
              secondary={skill.skill_level}
            />
          )}
          handleUpdate={handleSkillsUpdate}
          handleDelete={handleSkillsDelete}
          items={resume.skills}
        />
        <Button onClick={() => dispatch({ type: actionConstants.ADD_SKILL })}>
          Add new skill
        </Button>

        <SortableColumn
          columnTitle={"Employment History"}
          onDragEnd={handleEmploymentDragEnd}
          listItemTitle={(employment) => (
            <SortableItemSummary
              primary={`${employment.job_title}, ${employment.employer}`}
              secondary={
                employment.date_start
                  ? `${employment.date_start} - ${employment.date_end}`
                  : undefined
              }
            />
          )}
          handleUpdate={handleEmploymentUpdate}
          handleDelete={handleEmploymentDelete}
          items={resume.employment_history}
        />
        <Button
          onClick={() =>
            dispatch({ type: actionConstants.ADD_EMPLOYMENT_HISTORY })
          }
        >
          Add new employment
        </Button>

        <SortableColumn
          columnTitle={"Education"}
          onDragEnd={handleEducationDragEnd}
          listItemTitle={(education) => (
            <SortableItemSummary
              primary={education.school}
              secondary={education.degree}
            />
          )}
          handleUpdate={handleEducationUpdate}
          handleDelete={handleEducationDelete}
          items={resume.education}
        />

        <Button
          onClick={() => dispatch({ type: actionConstants.ADD_EDUCATION })}
        >
          Add new education
        </Button>
      </Stack>
    </Box>
  );
};

export default React.memo(ResumeForm);
