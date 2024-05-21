import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { back } from "@/app/redux/features/staffing-transaction/stfSlice";

import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { createSelector } from "reselect";
import { Dictionary } from "@/dictionaries/dictionaries";

const backNextButtonComponentSelector = (
  buttonLabels: Dictionary["workforce"]["staffingTransaction"]["button"],
  handleBack: (() => void) | undefined,
) => {
  return createSelector(
    (state) => state.staffingTransaction.activeSteps,
    (activeSteps) => {
      const appRouterInstance = useRouter();
      const dispatch = useAppDispatch();
      return {
        backLabel: activeSteps === 0 ? buttonLabels.cancel : buttonLabels.back,
        handleButtonBack:
          activeSteps === 0
            ? () => appRouterInstance.back()
            : () => {
                if (handleBack) {
                  handleBack();
                } else {
                  dispatch(back());
                }
              },
      };
    },
  );
};

type Props = {
  buttonLabels: Dictionary["workforce"]["staffingTransaction"]["button"];
  handleNext: () => void;
  handleBack?: () => void;
};

export default function BackNextButtons({
  buttonLabels,
  handleNext,
  handleBack,
}: Readonly<Props>) {
  const { handleButtonBack, backLabel } = useAppSelector(
    backNextButtonComponentSelector(buttonLabels, handleBack),
  );

  return (
    <Stack
      paddingRight={2}
      position={"fixed"}
      bottom={5}
      right={2}
      direction="row"
      gap={5}
    >
      <Button variant="text" onClick={handleButtonBack} color="secondary">
        {backLabel}
      </Button>
      <Button variant="contained" onClick={handleNext}>
        {buttonLabels.next}
      </Button>
    </Stack>
  );
}
