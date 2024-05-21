import { enqueueSnackbar } from "notistack";

export const enqueueSuccessSnackbar = (message?: string) => {
  if (message) {
    enqueueSnackbar(message, { variant: "success", autoHideDuration: 6000 });
  }
};

export const enqueueErrorsSnackbar = (message?: string) => {
  if (message) {
    enqueueSnackbar(message, { variant: "error", autoHideDuration: 6000 });
  }
};
export const enqueueWarningSnackbar = (message?: string) => {
  if (message) {
    enqueueSnackbar(message, { variant: "warning", autoHideDuration: 6000 });
  }
};
export const enqueueInfoSnackbar = (message?: string) => {
  if (message) {
    enqueueSnackbar(message, { variant: "info", autoHideDuration: 6000 });
  }
};
