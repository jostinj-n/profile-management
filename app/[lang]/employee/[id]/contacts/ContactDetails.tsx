import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Dictionary } from "@/dictionaries/dictionaries";
import { fetchContactDetailsById } from "@/app/redux/features/contactDetailSlice";
import { RootState } from "@/app/redux/store";
import { Stack } from "@mui/material";

import { ContactDetailsCard } from "./ContactDetailsCard";
import { ContactAddressCard } from "./ContactAddressCard";
import { EmergencyContactCard } from "./EmergencyContactCard";

type Props = {
  employeeId: string;
  labels: Dictionary["employee"]["contactDetails"];
  contactAddressCardLabels: Dictionary["employee"]["contactAddressCard"];
  emergencyContactLabels: Dictionary["employee"]["emergencyContact"];
};

export const ContactDetails: FC<Props> = ({
  employeeId,
  labels,
  contactAddressCardLabels,
  emergencyContactLabels,
}) => {
  const dispatch = useAppDispatch();
  const { contactDetails, isLoading, error } = useAppSelector(
    (state: RootState) => state.contactDetail,
  );

  useEffect(() => {
    dispatch(fetchContactDetailsById(employeeId));
  }, [dispatch, employeeId]);

  if (isLoading || error) {
    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }

  return (
    <Stack spacing={2}>
      <ContactDetailsCard contactDetails={contactDetails} labels={labels} />
      <ContactAddressCard
        address={contactDetails.address}
        labels={contactAddressCardLabels}
      />

      {contactDetails.emergencyContacts?.map((emergencyContact) => (
        <EmergencyContactCard
          key={emergencyContact.emergencyContactId}
          contact={emergencyContact}
          labels={emergencyContactLabels}
        />
      ))}
    </Stack>
  );
};
