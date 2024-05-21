"use client";
import { Dictionary } from "@/dictionaries/dictionaries";
import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { ThirdPageType } from "../thirdPage";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { ControlledCheckbox } from "@/app/component/createNewProfile/ControlledCheckBox";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  bankingInfo: Dictionary["workforce"]["newProfile"]["thirdPage"];
  control: Control<ThirdPageType>;
  errors: FieldErrors<ThirdPageType>;
  setValue: (
    name: keyof ThirdPageType,
    value: any,
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
    },
  ) => void;
  data: [];
};

export const BankingInfo: FC<Props> = ({
  bankingInfo,
  control,
  errors,
  setValue,
  data,
}) => {
  const [numOfBanks, setNumOfBanks] = useState<number>(1);
  const handleDelete = (index: number) => {
    setNumOfBanks((currentNum) => {
      const updatedNumOfBank = control._formValues.banks.filter(
        (_: unknown, idx: number) => idx !== index,
      );
      setValue("banks", updatedNumOfBank);
      return currentNum - 1;
    });
  };
  const defaultBank = {
    company: "",
    paymentTypeCode: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    IBAN: "",
    SWIFT: "",
    active: false,
  };
  const handleAddBank = () => {
    const newBanks = [...control._formValues.banks, defaultBank];
    setValue("banks", newBanks);
    setNumOfBanks(numOfBanks + 1);
  };
  return (
    <Stack gap={2}>
      <Typography variant="h6">{bankingInfo.label}</Typography>
      {Array.from(Array(numOfBanks).keys()).map((index) => (
        <React.Fragment key={index}>
          {index !== 0 && ( // Assuming you don't want to delete the first address
            <Divider />
          )}
          <Stack gap={3} direction="row" alignItems={"center"}>
            <SelectFormControl
              control={control}
              errors={errors.banks?.[index]?.company}
              name={`banks.${index}.company`}
              values={data}
              inputLabel={bankingInfo.company}
              required
              tableName="ref_company"
            />
            <TextFieldComponent
              control={control}
              name={`banks.${index}.accountType`}
              label={bankingInfo.accountType}
              errors={errors.banks?.[index]?.accountNumber}
              required
            />
            <Stack direction={"row"}>
              <ControlledCheckbox
                control={control}
                name={`banks.${index}.active`}
                label={bankingInfo.active}
              />
              {index !== 0 && ( // Assuming you don't want to delete the first address
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(index)}
                  size="large"
                ></Button>
              )}
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={3}>
            <Stack gap={3}>
              <SelectFormControl
                control={control}
                errors={errors.banks?.[index]?.paymentTypeCode}
                name={`banks.${index}.paymentTypeCode`}
                values={data}
                inputLabel={bankingInfo.paymentTypeCode}
                required
                tableName="ref_payment_type"
              />
              <TextFieldComponent
                control={control}
                name={`banks.${index}.accountNumber`}
                label={bankingInfo.accountNumber}
                errors={errors.banks?.[index]?.accountNumber}
                required
              />
              <TextFieldComponent
                control={control}
                name={`banks.${index}.IBAN`}
                label={bankingInfo.IBAN}
                errors={errors.banks?.[index]?.IBAN}
              />
            </Stack>
            <Stack gap={3}>
              <SelectFormControl
                control={control}
                errors={errors.banks?.[index]?.bankName}
                name={`banks.${index}.bankName`}
                values={data}
                inputLabel={bankingInfo.bankName}
                tableName="ref_banking_institution"
                required
              />
              <TextFieldComponent
                control={control}
                name={`banks.${index}.routingNumber`}
                label={bankingInfo.routingNumber}
                errors={errors.banks?.[index]?.routingNumber}
                required
              />
              <TextFieldComponent
                control={control}
                name={`banks.${index}.SWIFT`}
                label={bankingInfo.SWIFT}
                errors={errors.banks?.[index]?.SWIFT}
              />
            </Stack>
          </Stack>
        </React.Fragment>
      ))}
      <AddOrCancelButton
        buttonText={bankingInfo.add}
        pressed={numOfBanks}
        max={5}
        setPressed={handleAddBank}
      />
    </Stack>
  );
};
