import { useReducer, useState } from "react";
import defaultResume from "../data/defaultResume";
import { capitalize } from "lodash";
import { Box, Stack, TextField } from "@mui/material";
import resumeReducer, { actionConstants } from "../reducers/resumeReducer";
import { IFormSection } from "../types/resumeTypes";

interface FormSectionProps {
  data: IFormSection;
  handleUpdate: (payload: Record<any, any>) => void;
  title?: string;
}

const FormSection = ({ data, handleUpdate, title }: FormSectionProps) => {
  return (
    <>
      <p
        style={{
          width: "100%",
          textAlign: "left",
          paddingLeft: "10px",
        }}
      >
        {title}
      </p>
      {data.fields.map(({ id, label, type, value }) => {
        return (
          <TextField
            id={id}
            select={type === "select"}
            type={type}
            label={capitalize(label.replace("_", " "))}
            value={value}
            sx={{ m: 3, width: "40%" }}
            onChange={(e) => handleUpdate({ id, value: e.target.value })}
          />
        );
      })}
    </>
  );
};

const ResumeForm = () => {
  const [formData, dispatch] = useReducer(resumeReducer, defaultResume);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: "flex", flexDirection: "column", width: "50%" }}
    >
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent={"space-between"}
      >
        <FormSection
          title={"Personal Details"}
          data={formData.personal_details}
          handleUpdate={(payload) =>
            dispatch({
              type: actionConstants.UPDATE_PERSONAL_DETAILS,
              payload,
            })
          }
        />
        <FormSection
          title={"Social Media"}
          data={formData.social_media}
          handleUpdate={(payload) =>
            dispatch({
              type: actionConstants.UPDATE_SOCIAL_MEDIA,
              payload,
            })
          }
        />
        <p
          style={{
            width: "100%",
            textAlign: "left",
            paddingLeft: "10px",
          }}
        >
          Skills
        </p>
        {formData.skills.map((skill) => {
          return (
            <FormSection
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

        {formData.employment_history.map((employment) => {
          return (
            <FormSection
              title={"Employment History"}
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
        {/* 
        <FormSection
          title={"Education"}
          data={formData.education}
          handleUpdate={(payload) =>
            dispatch({
              type: actionConstants.UPDATE_EDUCATION,
              payload,
            })
          }
        /> */}
      </Stack>
    </Box>
  );
};

export default ResumeForm;
