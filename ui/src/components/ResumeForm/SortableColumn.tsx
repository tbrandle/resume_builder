import Delete from "@mui/icons-material/Delete";
import DragIndicator from "@mui/icons-material/DragIndicator";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FormSection from "./FormSection";
import { Field, FormItemSingleList } from "../../types/resumeTypes";
import { ReactElement } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCorners } from "@dnd-kit/core";

interface SortableFormItemProps {
  item: FormItemSingleList;
  title: ReactElement<unknown, string>;
  handleUpdate: (payload: Field) => void;
  handleDelete: () => void;
}

interface SortableColumnProps {
  items: FormItemSingleList[];
  listItemTitle: (item: any) => JSX.Element;
  columnTitle: string;
  handleUpdate: (parentId: string) => any;
  handleDelete: (parentId: string) => any;
  onDragEnd: (activeId: string, overId: string) => void;
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
    >
      <IconButton {...listeners}>
        <DragIndicator />
      </IconButton>
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
  onDragEnd,
}: SortableColumnProps) => {
  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={(event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        onDragEnd(active.id.toString(), over.id.toString());
      }}
    >
      <h3
        style={{
          paddingLeft: "10px",
          textAlign: "left",
          width: "100%",
        }}
      >
        {columnTitle}
      </h3>
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
    </DndContext>
  );
};

export default SortableColumn;
