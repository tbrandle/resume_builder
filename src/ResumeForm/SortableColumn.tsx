import { Delete } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";
import { actionConstants } from "../reducers/resumeReducer";
import FormSection from "./FormSection";
import { Field, IFormSection, IFormSectionList } from "../types/resumeTypes";
import { ReactElement } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableFormItemProps {
  item: IFormSectionList;
  title: ReactElement<any, any>;
  handleUpdate: (payload: Field) => void;
  handleDelete: () => void;
}

interface SortableColumnProps {
  items: IFormSectionList[];
  listItemTitle: (item: any) => JSX.Element;
  columnTitle: ReactElement<any, any>;
  handleUpdate: (parentId: string) => any;
  handleDelete: (parentId: string) => any;
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

const SortableColumn = ({
  items,
  listItemTitle,
  columnTitle,
  handleUpdate,
  handleDelete,
}: SortableColumnProps) => {
  return (
    <>
      {columnTitle}

      <SortableContext items={items}>
        {items.map((item, i) => {
          return (
            <SortableFormItem
              key={`${item.id}-${i}`}
              title={listItemTitle(item)}
              handleUpdate={handleUpdate(item.id)}
              handleDelete={handleDelete(item.id)}
              item={item}
            />
          );
        })}
      </SortableContext>
    </>
  );
};

export default SortableColumn;
