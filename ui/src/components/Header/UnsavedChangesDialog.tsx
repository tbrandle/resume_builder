import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface UnsavedChangesDialogProps {
  open: boolean;
  onSaveAndContinue: () => Promise<void>;
  onDiscard: () => void;
  onCancel: () => void;
  isSaving: boolean;
  saveError: string | null;
}

const UnsavedChangesDialog = ({
  open,
  onSaveAndContinue,
  onDiscard,
  onCancel,
  isSaving,
  saveError,
}: UnsavedChangesDialogProps) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle>Unsaved Changes</DialogTitle>
    <DialogContent>
      <DialogContentText>
        You have unsaved changes that will be lost if you navigate away.
      </DialogContentText>
      {saveError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {saveError}
        </Alert>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} disabled={isSaving}>
        Cancel
      </Button>
      <Button onClick={onDiscard} color="error" disabled={isSaving}>
        Discard Changes
      </Button>
      <Button
        onClick={onSaveAndContinue}
        variant="contained"
        disabled={isSaving}
        startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : undefined}
      >
        {isSaving ? "Saving…" : "Save & Continue"}
      </Button>
    </DialogActions>
  </Dialog>
);

export default UnsavedChangesDialog;
