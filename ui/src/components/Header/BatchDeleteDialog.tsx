import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import useApi from "../../hooks/useApi";

interface BatchDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  resumeList: { id: string; title: string }[];
  activeResumeId?: string;
  onDeleteSuccess: (deletedIds: string[]) => void;
  onError: (msg: string) => void;
}

const BatchDeleteDialog = ({
  open,
  onClose,
  resumeList,
  activeResumeId,
  onDeleteSuccess,
  onError,
}: BatchDeleteDialogProps) => {
  const { api } = useApi();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  const allSelected =
    resumeList.length > 0 && selectedIds.size === resumeList.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedIds(
      allSelected ? new Set() : new Set(resumeList.map((r) => r.id))
    );
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const ids = Array.from(selectedIds);
      await api.deleteMany(ids);
      onDeleteSuccess(ids);
    } catch {
      onError("Failed to delete resumes. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setSelectedIds(new Set());
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Resumes</DialogTitle>
      <DialogContent dividers>
        <FormControlLabel
          label="Select all"
          control={
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={handleSelectAll}
            />
          }
          sx={{ px: 1 }}
        />
        <List disablePadding>
          {resumeList.map(({ id, title }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton onClick={() => handleToggle(id)} dense>
                <Checkbox
                  edge="start"
                  checked={selectedIds.has(id)}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText
                  primary={title || "Untitled"}
                  secondary={id === activeResumeId ? "currently open" : undefined}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={selectedIds.size === 0 || isDeleting}
        >
          {`Delete Selected (${selectedIds.size})`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BatchDeleteDialog;
