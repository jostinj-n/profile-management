"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Stack,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  closeModal,
  exportCSV,
} from "@/app/redux/features/exportEmployeesModalSlice";
import { RootState } from "@/app/redux/store";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  labels: Dictionary["employee"]["exportEmployeesModal"];
  buttonLabels: Dictionary["button"];
};

export const ExportEmployeesModal: FC<Props> = ({labels, buttonLabels}) => {
  const dispatch = useAppDispatch();
  const { error, isLoading, isOpen, file } = useAppSelector((state: RootState) => state.exportEmployeesModal);

  useEffect(() => {
    if (isOpen) {
      dispatch(exportCSV())
    }
  }, [dispatch, isOpen]);

  const close = () => {
    dispatch(closeModal());
  };

  const downloadFile = () => {
    if (file) {
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'employees.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      close();
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{labels.title}</DialogTitle>
      <DialogContent>
        {
          isLoading && <Stack sx={{ width: '100%' }} spacing={2}>
            <LinearProgress />
            <p>{labels.loadingMessage}</p>
          </Stack>
        }
        {
          error && <Stack sx={{ width: '100%' }} spacing={2}>
            <p>{labels.errorMessage}</p>
          </Stack>
        }
        {
          file && <Stack sx={{ width: '100%' }} spacing={2}>
            <p>{labels.successMessage}</p>
          </Stack>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>{buttonLabels.close}</Button>
        <Button onClick={downloadFile}>{buttonLabels.download}</Button>
      </DialogActions>
    </Dialog>
  )
};