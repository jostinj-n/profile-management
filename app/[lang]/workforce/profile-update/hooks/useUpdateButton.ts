import { usePersonProfileForm } from "@/app/[lang]/workforce/profile-update/hooks/useFormPersonProfile";
import { useBankingInformationForm } from "@/app/[lang]/workforce/profile-update/hooks/useBankingInformationForm";
import { useContactDetailsForm } from "@/app/[lang]/workforce/profile-update/hooks/useContactDetailsForm";
import { areFormsValid } from "@/app/[lang]/workforce/profile-update/util/areFormsValid";
import { useUpdateContact } from "@/app/[lang]/workforce/profile-update/util/useUpdateContact";
import { useUpdateBanks } from "@/app/[lang]/workforce/profile-update/util/useUpdateBanks";
import { useHandleUpdate } from "@/app/[lang]/workforce/profile-update/util/useUpdatePersonProfile";
import { useIdRecordsForm } from "@/app/[lang]/workforce/profile-update/hooks/useIdRecordsForm";
import { useUpdateIdRecords } from "@/app/[lang]/workforce/profile-update/util/useUpdateIdRecords";
import { enqueueWarningSnackbar } from "@/app/[lang]/workforce/profile-update/util/notistack";
import { useSeniorityForm } from "@/app/[lang]/workforce/profile-update/hooks/useSeniorityForm";
import { useUpdateSeniority } from "@/app/[lang]/workforce/profile-update/util/useUpdateSeniority";

export const useUpdateButton = (id: string) => {
  const { profileForm } = usePersonProfileForm(id);
  const { banksForm } = useBankingInformationForm(id);
  const { contactForm } = useContactDetailsForm(id);
  const { idRecords } = useIdRecordsForm(id);
  const { seniorityForm } = useSeniorityForm(id);

  const handlePersonUpdate = useHandleUpdate(profileForm.getValues);
  const handleContactUpdate = useUpdateContact(contactForm.getValues);
  const handleBanksUpdate = useUpdateBanks(banksForm.getValues);
  const handleIdRecordsUpdate = useUpdateIdRecords(idRecords.getValues);
  const handleSeniorityUpdate = useUpdateSeniority(seniorityForm.getValues);

  const formsValid = [
    profileForm.isValid,
    banksForm.isValid,
    contactForm.isValid,
  ];

  const handleClick = () => {
    if (areFormsValid(formsValid)) {
      handleContactUpdate();
      handlePersonUpdate();
      handleBanksUpdate();
      handleIdRecordsUpdate();
      handleSeniorityUpdate();
    } else {
      enqueueWarningSnackbar("Required field missing");
    }
  };

  return {
    handleClick,
    personForm: {
      control: profileForm.control,
      errors: profileForm.errors,
      getValues: profileForm.getValues,
    },
    bankingForm: {
      control: banksForm.control,
      errors: banksForm.errors,
      getValues: banksForm.getValues,
    },
    contactForm: {
      control: contactForm.control,
      errors: contactForm.errors,
    },
    idRecordsForm: {
      control: idRecords.control,
      errors: idRecords.errors,
    },
    seniorityForm: {
      control: seniorityForm.control,
      errors: seniorityForm.errors,
    },
  };
};
