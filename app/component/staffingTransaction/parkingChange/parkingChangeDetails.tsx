import { useAppSelector } from "@/app/redux/hooks";

import { Dictionary } from "@/dictionaries/dictionaries";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

import ListOfPass from "./ListOfPass";
import ParkingChangeForm from "./ParkingChangeForm";

const parkingDetailsSelector = createSelector(
  (state: RootState) => state.employment.employment?.personId.toString(),
  (state: RootState) => state.parkingChange.activeFormView,
  (personId, activeFormView) => {
    return {
      personId,
      activeFormView,
    };
  },
);

type Props = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
};
export default function ParkingChangeDetails({
  staffingTransaction,
}: Readonly<Props>) {
  const { personId, activeFormView } = useAppSelector(parkingDetailsSelector);

  return (
    <>
      {!activeFormView && (
        <ListOfPass
          staffingTransaction={staffingTransaction}
          employeeId={personId}
        />
      )}
      {activeFormView && (
        <ParkingChangeForm staffingTransaction={staffingTransaction} />
      )}
    </>
  );
}
