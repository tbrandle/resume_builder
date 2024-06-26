import { capitalize } from "lodash";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Field, FormItemSingle } from "../../types/resumeTypes";
import ReactQuill from "react-quill";
import { styled } from "@mui/material/styles";
import { ReactElement, useState } from "react";

interface FormSectionProps {
  data: FormItemSingle;
  handleUpdate: (payload: Field) => void;
  title?: ReactElement<unknown, string>;
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const FormSection = ({
  data,
  handleUpdate,
  title,
}: FormSectionProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card style={{ width: "100%", margin: "12px auto" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        onClick={() => setExpanded(!expanded)}
        sx={{
          backgroundColor: "#f7f7f7",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {title}
        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {data.fields.map((field) => {
          const { id, label, type, value } = field;
          if (type === "html") {
            return (
              <div key={id} style={{ width: "100%", padding: "27px" }}>
                <InputLabel>{capitalize(label.replace("_", " "))}</InputLabel>
                <ReactQuill
                  theme="snow"
                  modules={{
                    clipboard: {
                      matchVisual: false,
                    },
                  }}
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
              onChange={(e) =>
                handleUpdate({ ...field, value: e.target.value })
              }
            >
              {field.options &&
                field.options.map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          );
        })}
      </Collapse>
    </Card>
  );
};

export default FormSection;
