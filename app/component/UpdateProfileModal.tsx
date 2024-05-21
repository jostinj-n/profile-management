import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { languageIsValid, nameIsValid } from "@/app/util/validators";
import { LoadingButton } from "@mui/lab";
import { EmployeeUpdateParams } from "@/app/api/employees/route";

type UpdateProfileModalProps = {
  first_name: string;
  last_name: string;
  middle_name: string;
  preferred_name: string;
  language: string;
  person_id: number;
  onDone: () => void;
};

type FormState = {
  dirty: boolean;
  required: boolean;
  valid: boolean;
};

type Form = {
  first_name: FormState;
  last_name: FormState;
  middle_name: FormState;
  preferred_name: FormState;
  language: FormState;
};

export default function UpdateProfileModal(props: UpdateProfileModalProps) {
  const [open] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const [state, setState] = useState<EmployeeUpdateParams>({
    first_name: "",
    last_name: "",
    middle_name: "",
    preferred_name: "",
    language: "",
  });
  const [form, setForm] = useState<Form>({
    first_name: {
      dirty: false,
      required: true,
      valid: false,
    },
    last_name: {
      dirty: false,
      required: true,
      valid: false,
    },
    middle_name: {
      dirty: false,
      required: false,
      valid: false,
    },
    preferred_name: {
      dirty: false,
      required: false,
      valid: false,
    },
    language: {
      dirty: false,
      required: true,
      valid: false,
    },
  });
  const languageOptions = [
    {
      label: "English",
      value: "en-us",
    },
    {
      label: "French",
      value: "fr-ca",
    },
  ];

  const updateFormValidity = (key: string, val: any) => {
    const updatedForm = { ...form };

    switch (key) {
      case "first_name":
        updatedForm.first_name.valid = nameIsValid(val);
        break;
      case "last_name":
        updatedForm.last_name.valid = nameIsValid(val);
        break;
      case "middle_name":
        updatedForm.middle_name.valid = val ? nameIsValid(val) : true;
        break;
      case "preferred_name":
        updatedForm.preferred_name.valid = val ? nameIsValid(val) : true;
        break;
      case "language":
        updatedForm.language.valid = languageIsValid(val);
        break;
      default:
        break;
    }
    setForm(updatedForm);
  };

  const updateFormDirtyState = (key: string) => {
    const keyTyped = key as keyof Form;

    setForm({
      ...form,
      [key]: {
        ...form[keyTyped],
        dirty: true,
      },
    });
  };

  const formIsValid = () =>
    Object.keys(form).every((key) => form[key as keyof Form].valid);

  useEffect(() => {
    setState({
      first_name: props.first_name,
      last_name: props.last_name,
      middle_name: props.middle_name,
      preferred_name: props.preferred_name,
      language: props.language,
    });

    // Object.keys(props).forEach((key) => {
    //   const keyTyped = key as keyof Form;
    //   console.log("key", key, props[keyTyped]);
    //   updateFormValidity(key, props[keyTyped]);
    // });
  }, [props]);

  const handleClose = () => {
    props.onDone();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    updateFormValidity(name, value);
    updateFormDirtyState(name);
  };

  const updateProfile = async () => {
    console.log("updateProfile", state, form, formIsValid());
    if (!formIsValid()) {
      return;
    }

    setUpdateFailed(false);
    setUpdating(true);

    try {
      await fetch("/api/employees", {
        method: "PATCH",
        body: JSON.stringify(state),
      });
      setUpdating(false);
      handleClose();
    } catch (e) {
      console.log("updateProfile.failed", e);
      setUpdating(false);
      setUpdateFailed(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        >
          <div className="mt-5">
            <TextField
              error={form.first_name.dirty && !form.first_name.valid}
              required={form.first_name.required}
              name="first_name"
              label="First Name"
              value={state.first_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              helperText={
                form.first_name.dirty && !form.first_name.valid
                  ? "Must be 2 characters or more"
                  : ""
              }
            />
            <TextField
              error={form.middle_name.dirty && !form.middle_name.valid}
              required={form.middle_name.required}
              label="Middle Name"
              placeholder="Middle Name"
              value={state.middle_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              helperText={
                form.middle_name.dirty && !form.middle_name.valid
                  ? "Must be 2 characters or more"
                  : ""
              }
            />
            <TextField
              error={form.last_name.dirty && !form.last_name.valid}
              required={form.last_name.required}
              name="last_name"
              label="Last Name"
              placeholder="Last Name"
              value={state.last_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              helperText={
                form.last_name.dirty && !form.last_name.valid
                  ? "Must be 2 characters or more"
                  : ""
              }
            />

            <TextField
              error={form.preferred_name.dirty && !form.preferred_name.valid}
              required={form.preferred_name.required}
              label="Preferred Name"
              name="preferred_name"
              placeholder="Preferred Name"
              value={state.preferred_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              helperText={
                form.preferred_name.dirty && !form.preferred_name.valid
                  ? "Must be 2 characters or more"
                  : ""
              }
            />
          </div>
          <div>
            <TextField
              select
              error={form.language.dirty && !form.language.valid}
              name="language"
              label="Primary Communication Language"
              placeholder="Select"
              value={state.language}
              onChange={handleChange}
            >
              {languageOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Box>

        <div>
          {updateFailed ? (
            <Alert className="m-2" severity="error">
              Failed to update profile. Please try again, if the issue persists
              please contact an Administrator.
            </Alert>
          ) : null}
        </div>
      </DialogContent>
      <DialogActions>
        <Button className="text-gwColor-charcoal" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton
          loading={updating}
          variant="contained"
          onClick={updateProfile}
          disabled={updating}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
