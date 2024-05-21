import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { ninthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, FieldErrors } from "react-hook-form";
import { NinthPageType } from "../ninthPage";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";

type Props = {
  vehicleDetails: ninthPageDictionnary["section"]["vehicleDetails"];
  control: Control<NinthPageType>;
  errors: FieldErrors<NinthPageType>;
  data: [];
};

export const VehicleDetails: FC<Props> = ({
  vehicleDetails,
  control,
  errors,
  data,
}) => {
  return (
    <Stack gap={3}>
      <Typography variant="h6">{vehicleDetails.label}</Typography>
      <Stack gap={3} direction={"row"}>
        <Stack gap={3}>
          <SelectFormControl
            control={control}
            errors={errors.vehicleMake}
            name="vehicleMake"
            values={data}
            inputLabel={vehicleDetails.vehicleMake}
            tableName="ref_vehicle_make"
          />
          <SelectFormControl
            control={control}
            errors={errors.vehicleColor}
            name="vehicleColor"
            values={data}
            inputLabel={vehicleDetails.vehicleColor}
            tableName="ref_vehicle_color"
          />
        </Stack>
        <Stack gap={3}>
          <TextFieldComponent
            control={control}
            name="vehicleModel"
            label={vehicleDetails.vehicleMModel}
            errors={errors.vehicleModel}
          />
          <TextFieldComponent
            control={control}
            name="vehiclePlate"
            label={vehicleDetails.vehiclePlate}
            errors={errors.vehiclePlate}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
