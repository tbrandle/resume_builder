import { Delete } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";
import { actionConstants } from "../reducers/resumeReducer";
import FormSection from "./FormSection";
import { Field, IFormSectionList } from "../types/resumeTypes";
import { ReactElement } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableFormItemProps {
  item: IFormSectionList;
  title: ReactElement<any, any>;
  handleUpdate: (payload: Field) => void;
  handleDelete: () => void;
}

const SortableFormItem = ({
  item,
  title,
  handleUpdate,
  handleDelete,
}: SortableFormItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      alignItems={"center"}
      key={item.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <FormSection title={title} data={item} handleUpdate={handleUpdate} />
      <IconButton
        sx={{ color: "grey", marginLeft: "12px" }}
        onClick={handleDelete}
      >
        <Delete />
      </IconButton>
    </Stack>
  );
};

export default SortableFormItem;
