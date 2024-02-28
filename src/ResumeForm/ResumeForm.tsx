import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Action, actionConstants } from "../reducers/resumeReducer";
import { Resume } from "../types/resumeTypes";
import "react-quill/dist/quill.snow.css";
import { FormSection } from "./FormSection";

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
        <h3
          style={{
            paddingLeft: "10px",
          }}
        >
          Skills
        </h3>
        {formData.skills.map((skill, i) => {
          return (
            <FormSection
              key={`${i}-${skill.id}`}
              title={
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
              }
              data={skill}
              handleUpdate={(fieldPayload) =>
                dispatch({
                  type: actionConstants.UPDATE_SKILLS,
                  payload: { parentId: skill.id, fieldPayload },
                })
              }
            />
          );
        })}
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
                  <strong>{employment.job_title}</strong>
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
