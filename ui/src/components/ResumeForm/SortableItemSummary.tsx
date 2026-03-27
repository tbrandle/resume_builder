import Stack from "@mui/material/Stack";
import "./ResumeForm.css";

interface SortableItemSummaryProps {
  primary: string;
  secondary?: string;
}

const SortableItemSummary = ({ primary, secondary }: SortableItemSummaryProps) => (
  <Stack className="sortableItemSummary" spacing={0.5}>
    <strong>{primary}</strong>
    {secondary && <div>{secondary}</div>}
  </Stack>
);

export default SortableItemSummary;
