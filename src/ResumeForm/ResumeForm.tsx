import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Action, actionConstants } from "../reducers/resumeReducer";
import { Resume, Skill } from "../types/resumeTypes";
import "react-quill/dist/quill.snow.css";
import { FormSection } from "./FormSection";
import Delete from "@mui/icons-material/Delete";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import IconButton from "@mui/material/IconButton";
import "./ResumeForm.css";
import SortableColumn from "./SortableColumn";

const ResumeForm = ({
  formData,
  dispatch,
}: {
  formData: Resume;
  dispatch: React.Dispatch<Action>;
}) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        padding: "32px",
        overflow: "scroll",
        height: "100vh",
      }}
    >
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent={"space-between"}
      >
        <FormSection
          title={
            <h3
              style={{
                width: "100%",
                textAlign: "left",
                paddingLeft: "10px",
              }}
            >
              Personal Details
            </h3>
          }
          data={formData.personal_details}
          handleUpdate={(payload) =>
            dispatch({
              type: actionConstants.UPDATE_PERSONAL_DETAILS,
              payload,
            })
          }
        />
        <FormSection
          title={
            <h3
              style={{
                paddingLeft: "10px",
              }}
            >
              Social Media
            </h3>
          }
          data={formData.social_media}
          handleUpdate={(payload) =>
            dispatch({
              type: actionConstants.UPDATE_SOCIAL_MEDIA,
              payload,
            })
          }
        />

        <SortableColumn
          columnTitle={"Skills"}
          onDragEnd={(activeId, overId) => {
            dispatch({
              type: actionConstants.REORDER_SKILLS,
              payload: {
                activeId,
                overId,
              },
            });
          }}
          listItemTitle={(skill) => (
            <Stack
              style={{
                padding: "20px",
                fontSize: "13px",
              }}
              spacing={0.5}
            >
              <strong>{skill.skill}</strong>
              <div>{skill.skill_level}</div>
            </Stack>
          )}
          handleUpdate={(parentId: string) => (fieldPayload: any) => {
            dispatch({
              type: actionConstants.UPDATE_SKILLS,
              payload: { parentId, fieldPayload },
            });
          }}
          handleDelete={(parentId: string) => () => {
            dispatch({
              type: actionConstants.DELETE_SKILL,
              payload: parentId,
            });
          }}
          items={formData.skills}
        />
        <Button onClick={() => dispatch({ type: actionConstants.ADD_SKILL })}>
          Add new skill
        </Button>
        <p
          style={{
            width: "100%",
            textAlign: "left",
            paddingLeft: "10px",
          }}
        >
          Employment History
        </p>
        {formData.employment_history.map((employment, i) => {
          return (
            <Stack direction={"row"} width={"100%"} alignItems={"center"}>
              <FormSection
                key={`${i}-${employment.id}`}
                title={
                  <Stack
                    style={{
                      padding: "20px",
                      fontSize: "13px",
                    }}
                    spacing={0.5}
                  >
                    <strong>
                      {employment.job_title}, {employment.employer}
                    </strong>
                    {employment.date_start ? (
                      <div>
                        {employment.date_start} - {employment.date_end}
                      </div>
                    ) : null}
                  </Stack>
                }
                data={employment}
                handleUpdate={(payload) =>
                  dispatch({
                    type: actionConstants.UPDATE_EMPLOYMENT_HISTORY,
                    payload: { parentId: employment.id, fieldPayload: payload },
                  })
                }
              />
              <IconButton
                sx={{ color: "grey", marginLeft: "12px" }}
                onClick={() => {
                  dispatch({
                    type: actionConstants.DELETE_EMPLOYMENT,
                    payload: employment.id,
                  });
                }}
              >
                <Delete />
              </IconButton>
            </Stack>
          );
        })}
        <Button
          onClick={() =>
            dispatch({ type: actionConstants.ADD_EMPLOYMENT_HISTORY })
          }
        >
          Add new employment
        </Button>
        <p
          style={{
            width: "100%",
            textAlign: "left",
            paddingLeft: "10px",
          }}
        >
          Education
        </p>
        {formData.education.map((education, i) => {
          return (
            <Stack direction={"row"} width={"100%"} alignItems={"center"}>
              <FormSection
                key={`${i}-${education.id}`}
                title={
                  <Stack
                    style={{
                      padding: "20px",
                      fontSize: "13px",
                    }}
                    spacing={0.5}
                  >
                    <strong>{education.school}</strong>
                    <div>{education.degree}</div>
                  </Stack>
                }
                data={education}
                handleUpdate={(payload) =>
                  dispatch({
                    type: actionConstants.UPDATE_EDUCATION,
                    payload: { parentId: education.id, fieldPayload: payload },
                  })
                }
              />
              <IconButton
                sx={{ color: "grey", marginLeft: "12px" }}
                onClick={() => {
                  dispatch({
                    type: actionConstants.DELETE_EDUCATION,
                    payload: education.id,
                  });
                }}
              >
                <Delete />
              </IconButton>
            </Stack>
          );
        })}
        <Button
          onClick={() => dispatch({ type: actionConstants.ADD_EDUCATION })}
        >
          Add new education
        </Button>
      </Stack>
    </Box>
  );
};

export default ResumeForm;
