import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useMemo, useState } from "react";

type DatePickerComponentProps<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  disablePast?: boolean;
  defaultValue?: Dayjs;
  size?: "small";
  required?: boolean;
} & UseControllerProps<T>;

export const DatePickerComponent = <T extends FieldValues>({
  control,
  label,
  name,
  size,
  disablePast,
  defaultValue,
  required = false,
}: DatePickerComponentProps<T>) => {
  const shouldDisableDate = (date: Dayjs) => {
    // Disable dates before the defaultValue
    return !!(defaultValue && date.isBefore(defaultValue, "day"));
  };
  const [error, setError] = useState<DateValidationError | null>(null);
  const errorMessage = useMemo(() => {
    switch (error) {
      case "shouldDisableDate": {
        return `Date must be greater than ${defaultValue}`;
      }
      case "invalidDate": {
        return "Your date is not valid";
      }
      default: {
        return "";
      }
    }
  }, [error, defaultValue]);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onError={(newError) => setError(newError)}
            {...field}
            disablePast={disablePast}
            format={"YYYY-MM-DD"}
            shouldDisableDate={shouldDisableDate}
            label={label}
            onChange={(date) => field.onChange(date)}
            slotProps={{
              textField: {
                required,
                size: size,
                helperText: errorMessage ? errorMessage : " ",
              },
              openPickerButton: { color: "primary" },
            }}
            slots={{ openPickerIcon: CalendarMonthIcon }}
            sx={{ width: "300px", minWidth: "300px" }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
