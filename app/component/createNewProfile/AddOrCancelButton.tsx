import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  buttonText: string;
  pressed: number;
  max: number;
  setPressed: () => void;
};

export const AddOrCancelButton: FC<Props> = ({
  buttonText,
  pressed,
  setPressed,
  max,
}) => {
  return (
    <Stack direction={"row"}>
      <Button
        color="primary"
        variant="text"
        onClick={() => setPressed()}
        sx={pressed >= max ? { display: "none" } : {}}
        startIcon={<AddIcon color="primary" fontSize="medium" />} // Place AddIcon at the beginning
      >
        <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
          {" "}
          {buttonText}
        </Typography>
      </Button>
    </Stack>
  );
};
