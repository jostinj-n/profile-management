import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormGetValues,
} from "react-hook-form";
import { ThirdPageDictionnary } from "@/dictionaries/dictionaries";
import { BankingInformationType } from "@/app/[lang]/workforce/profile-update/bankingInformation/zodSchema/bankingInformationSchema";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";
import { InputBooleanField } from "@/app/component/profileUpdate/InputBooleanField";
import { Bank } from "@/app/types/bank";

type Props = {
  bankingInformationDictionary: ThirdPageDictionnary;
  control: Control<BankingInformationType>;
  errors: FieldErrors<BankingInformationType>;
  data: Option[];
  getBanksValues: UseFormGetValues<BankingInformationType>;
};

export const BankingInformationSection: FC<Props> = ({
  bankingInformationDictionary,
  control,
  errors,
  data,
  getBanksValues,
}) => {
  const bankingInfo: Bank = {
    personId: getBanksValues(`banks.${0}.personId`),
    bankingDetailId: 1, //TODO
    company: "",
    paymentTypeCode: "",
    bankName: "",
    accountNumber: "",
    transitNumber: "",
    IBAN: "",
    SWIFT: "",
    isActive: false,
  };
  const { fields, append, remove } = useFieldArray({
    name: "banks",
    control,
  });
  return (
    <>
      <Typography variant="body1">
        {bankingInformationDictionary.label}
      </Typography>
      {fields.map((field, index) => (
        <Stack key={field.id} gap={0.5}>
          {index !== 0 && ( // Assuming you don't want to delete the first address
            <Divider sx={{ marginBottom: "1.2rem" }} />
          )}
          <Stack direction={"row"} gap={3} alignItems={"start"}>
            <SelectFormControl
              control={control}
              errors={errors.banks?.[index]?.company}
              name={`banks.${index}.company`}
              values={data}
              inputLabel={bankingInformationDictionary.company}
              required
              tableName="ref_company"
              size={"small"}
            />
            <InputBooleanField
              control={control}
              label={bankingInformationDictionary.active}
              name={`banks.${index}.isActive`}
            />
            {index !== 0 && ( // Assuming you don't want to delete the first names
              <IconButton
                color={"primary"}
                onClick={() => remove(index)}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
          <Stack direction={"row"} gap={3}>
            <SelectFormControl
              control={control}
              errors={errors.banks?.[index]?.paymentTypeCode}
              name={`banks.${index}.paymentTypeCode`}
              values={data}
              inputLabel={bankingInformationDictionary.paymentTypeCode}
              required
              tableName="ref_payment_type"
              size={"small"}
            />
            <SelectFormControl
              control={control}
              errors={errors.banks?.[index]?.bankName}
              name={`banks.${index}.bankName`}
              values={data}
              inputLabel={bankingInformationDictionary.bankName}
              tableName="ref_banking_institution"
              required
              size={"small"}
            />
          </Stack>
          <Stack direction={"row"} gap={3}>
            <TextFieldComponent
              control={control}
              name={`banks.${index}.accountNumber`}
              label={bankingInformationDictionary.accountNumber}
              errors={errors.banks?.[index]?.accountNumber}
              required
              size={"small"}
            />
            <TextFieldComponent
              control={control}
              name={`banks.${index}.transitNumber`}
              label={bankingInformationDictionary.transitNumber}
              errors={errors.banks?.[index]?.transitNumber}
              required
              size={"small"}
            />
          </Stack>
          <Stack direction={"row"} gap={3}>
            <TextFieldComponent
              control={control}
              name={`banks.${index}.SWIFT`}
              label={bankingInformationDictionary.SWIFT}
              errors={errors.banks?.[index]?.SWIFT}
              size={"small"}
            />
            <TextFieldComponent
              control={control}
              name={`banks.${index}.IBAN`}
              label={bankingInformationDictionary.IBAN}
              errors={errors.banks?.[index]?.IBAN}
              size={"small"}
            />
          </Stack>
        </Stack>
      ))}
      <Stack direction={"row"}>
        {fields.length < 5 && (
          <Button
            variant="text"
            startIcon={<AddIcon color="primary" fontSize="medium" />}
            onClick={() => append(bankingInfo)}
          >
            {bankingInformationDictionary.add}
          </Button>
        )}
      </Stack>
    </>
  );
};
