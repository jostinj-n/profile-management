import { useCallback, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { EmploymentInformation } from "@/app/types/employee";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  departmentOptions,
  divisionOptions,
  employmentStatusOptions,
  jobStatusOptions,
} from "../util/options";

type UpdateEmploymentModalProps = EmploymentInformation & {
  onDone: () => void;
};

const formSchema = z.object({
  employeeNumber: z.string().min(2, "LOL"),
  location: z.string(),
  employmentStatus: z.string(),
  jobStatus: z.string(),
  department: z.string(),
  division: z.string(),
});

type Form = z.infer<typeof formSchema>;

export default function UpdateEmploymentModal({
  employmentNumber,
  location,
  employmentStatus,
  jobStatus,
  department,
  division,
  onDone,
}: UpdateEmploymentModalProps) {
  const [open] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeNumber: employmentNumber,
      location,
      employmentStatus,
      jobStatus,
      department,
      division,
    },
  });

  const handleClose = useCallback(() => {
    onDone();
  }, [onDone]);

  const updateProfile = useCallback(async () => {
    setUpdateFailed(false);
    setUpdating(true);

    try {
      setUpdating(false);
      handleClose();
    } catch (e) {
      console.log("updateProfile.failed", e);
      setUpdating(false);
      setUpdateFailed(true);
    }
  }, [handleClose]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Employment Information</DialogTitle>
      <DialogContent>
        <Stack spacing={2} width={"40%"} pt={1}>
          <Controller
            control={control}
            name={"employeeNumber"}
            render={({ field }) => (
              <TextField
                inputRef={field.ref}
                error={!!errors.employeeNumber}
                required
                label="Employee Number"
                helperText={errors.employeeNumber?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name={"location"}
            render={({ field }) => (
              <TextField
                inputRef={field.ref}
                error={!!errors.location}
                required
                label="Location"
                helperText={errors.location?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name={"employmentStatus"}
            render={({ field }) => (
              <TextField
                select
                inputRef={field.ref}
                error={!!errors.employmentStatus}
                required
                label="Employment Status"
                helperText={errors.employmentStatus?.message}
                {...field}
              >
                {employmentStatusOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name={"jobStatus"}
            render={({ field }) => (
              <TextField
                select
                inputRef={field.ref}
                error={!!errors.jobStatus}
                required
                label="Job Status"
                helperText={errors.jobStatus?.message}
                {...field}
              >
                {jobStatusOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name={"department"}
            render={({ field }) => (
              <TextField
                select
                inputRef={field.ref}
                error={!!errors.department}
                required
                label="Department"
                helperText={errors.department?.message}
                {...field}
              >
                {departmentOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name={"division"}
            render={({ field }) => (
              <TextField
                select
                inputRef={field.ref}
                error={!!errors.division}
                required
                label="Division"
                helperText={errors.division?.message}
                {...field}
              >
                {divisionOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>

        <div>
          {updateFailed && (
            <Alert className="m-2" severity="error">
              Failed to update profile. Please try again, if the issue persists
              please contact an Administrator.
            </Alert>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          loading={updating}
          variant="contained"
          onClick={handleSubmit(
            () => updateProfile(),
            (formErrors) => console.log("invalid form", formErrors),
          )}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
