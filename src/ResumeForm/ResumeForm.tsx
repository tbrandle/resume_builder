import { capitalize } from "lodash";
import { Box, Button, InputLabel, Stack, TextField } from "@mui/material";
import { Action, actionConstants } from "../reducers/resumeReducer";
import { Field, IFormSection, Resume } from "../types/resumeTypes";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface FormSectionProps {
  data: IFormSection;
  handleUpdate: (payload: Field) => void;
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
      {data.fields.map((field) => {
        const { id, label, type, value } = field;
        console.log({ value });
        if (type === "html") {
          return (
            <div key={id} style={{ width: "100%", padding: "27px" }}>
              <InputLabel>{capitalize(label.replace("_", " "))}</InputLabel>
              <ReactQuill
                theme="snow"
                value={value as string}
                onChange={(e) => handleUpdate({ ...field, value: e })}
              />
            </div>
          );
        }
        return (
          <TextField
            key={id}
            id={id}
            select={type === "select"}
            type={type}
            label={capitalize(label.replace("_", " "))}
            value={value}
            sx={{ m: 3, width: "40%" }}
            onChange={(e) => handleUpdate({ ...field, value: e.target.value })}
          />
        );
      })}
    </>
  );
};

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
        {formData.skills.map((skill, i) => {
          return (
            <FormSection
              key={`${i}-${skill.id}`}
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
      </Stack>
    </Box>
  );
};

export default ResumeForm;
