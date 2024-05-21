import { useAppDispatch } from "@/app/redux/hooks";
import { back } from "@/app/redux/features/staffing-transaction/stfSlice";

import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { Dictionary } from "@/dictionaries/dictionaries";
import { LoadingButton } from "@mui/lab";

type Props = {
  buttonLabels: Dictionary["workforce"]["staffingTransaction"]["button"];
  handleSubmitToSave: () => Promise<void>;
  isLoading?: boolean;
};

export default function BackSubmitButtons({
  buttonLabels,
  handleSubmitToSave,
  isLoading = false,
}: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSubmit = () =>
    handleSubmitToSave().then(() => router.push("management"));

  return (
    <Stack
      paddingRight={2}
      position={"fixed"}
      bottom={5}
      right={2}
      direction="row"
      gap={5}
    >
      <Button variant="text" onClick={() => dispatch(back())} color="secondary">
        {buttonLabels.back}
      </Button>
      <LoadingButton
        loading={isLoading}
        variant="contained"
        onClick={handleSubmit}
      >
        {buttonLabels.submit}
      </LoadingButton>
    </Stack>
  );
}
