import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { Dictionary } from "@/dictionaries/dictionaries";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { PopupList } from "@/app/component/profileUpdate/profileUpdatePopUp/PopupList";

type Props = {
  labels: Dictionary["employee"]["profile"];
  isOpen: boolean;
  onClose: () => void;
  id: string;
};
export const UpdateProfileModal: FC<Props> = ({
  labels,
  isOpen,
  onClose,
  id,
}) => {
  const [nextStepUrl, setNextStep] = useState("");
  const router = useRouter();
  const updateProfilePage = () => {
    router.push(nextStepUrl);
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{labels.profileUpdate}</DialogTitle>
      <Divider />
      <DialogContent sx={{ padding: 0.5 }}>
        <PopupList nextStepUrl={setNextStep} profileID={id} />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack
          height={"100%"}
          gap={1}
          p={1}
          pr={2}
          direction="row"
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Button
            variant="cancel"
            onClick={() => {
              onClose();
              setNextStep("");
            }}
          >
            CANCEL
          </Button>
          <Button
            onClick={updateProfilePage}
            variant="contained"
            disableElevation={true}
            disabled={nextStepUrl === ""}
          >
            NEXT
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
