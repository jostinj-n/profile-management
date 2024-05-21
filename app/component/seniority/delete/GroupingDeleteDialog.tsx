import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Dictionary } from "@/dictionaries/dictionaries";
import DeleteIcon from "@mui/icons-material/Delete";
import { GroupingRow } from "@/app/types/templates";
import { useAppDispatch } from "@/app/redux/hooks";
import { useDeleteGroupingMutation } from "@/app/redux/features/seniority/templateApi";
import { setRequestParams } from "@/app/redux/features/seniority/requestParamsSlice";
import { requestParamsInitial } from "@/app/types/request";
import { enqueueSuccessSnackbar } from "@/app/[lang]/workforce/profile-update/util/notistack";

type Props = {
  seniority: Dictionary["workforce"]["seniority"];
  groupingRow: GroupingRow;
  hiddenMenu: () => void;
};

export const GroupingDeleteDialog: React.FC<Props> = ({
  seniority,
  groupingRow,
  hiddenMenu,
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [deleteGrouping] = useDeleteGroupingMutation();

  const handleProcessing = () => {
    deleteGrouping(groupingRow.templateId);
    setOpen(false);

    //update liste
    enqueueSuccessSnackbar(seniority.groupingForms.successDelete);

    dispatch(
      setRequestParams({
        ...requestParamsInitial,
        forceUpdate: Date.now(),
      }),
    );
    hiddenMenu();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    hiddenMenu();
  };

  return (
    <>
      <Button
        sx={{ justifyContent: "left" }}
        fullWidth
        variant="text"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon color="primary" />}
        color="secondary"
      >
        {seniority.template.list.action.Delete}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {seniority.template.delete.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {seniority.template.delete.message.replace(
              "{g}",
              groupingRow.templateName,
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            variant="text"
            color="secondary"
          >
            {seniority.template.list.No}
          </Button>
          <Button
            onClick={handleProcessing}
            autoFocus
            variant="text"
            color="primary"
          >
            {seniority.template.list.Yes}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
