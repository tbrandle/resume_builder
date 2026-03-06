import Stack from "@mui/material/Stack";

interface SortableItemSummaryProps {
  primary: string;
  secondary?: string;
}

const SortableItemSummary = ({ primary, secondary }: SortableItemSummaryProps) => (
  <Stack style={{ padding: "20px", fontSize: "13px" }} spacing={0.5}>
    <strong>{primary}</strong>
    {secondary && <div>{secondary}</div>}
  </Stack>
);

export default SortableItemSummary;
