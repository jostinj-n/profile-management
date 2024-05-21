"use client";
import React from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setGroupinRequest } from "@/app/redux/features/seniority/groupingRequestSlice";
import { useGetFilterQuery } from "@/app/redux/features/seniority/filtersApi";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { getField, getFieldKey, Table } from "@/app/util/referenceTable";
import { setRequestParams } from "@/app/redux/features/seniority/requestParamsSlice";
import { requestParamsInitial } from "@/app/types/request";
import Box from "@mui/material/Box";

type Props = {
  seniorityFilter: Dictionary["workforce"]["seniority"]["filter"];
  referenceTable: Table;
};
export default function FilterComponent({
  seniorityFilter,
  referenceTable,
}: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const groupingRequest = useAppSelector((state) => state.groupingRequest);
  const { data } = useGetFilterQuery(referenceTable);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(
      setRequestParams({
        ...requestParamsInitial,
      })
    );
    dispatch(
      setGroupinRequest({
        ...groupingRequest,
        ...getField(referenceTable, event.target.value),
      })
    );
  };

  const getValue = (table: string): string | undefined => {
    return String(groupingRequest[getFieldKey(table)] ?? -1);
  };

  const getLabel = (table: string) => {
    return seniorityFilter[table as keyof typeof seniorityFilter];
  };

  return (
    <Box>
      <FormControl
        sx={{ paddingY: 1, minWidth: 220, maxWidth: 220 }}
        size="small"
      >
        <InputLabel id={referenceTable}>{getLabel(referenceTable)}</InputLabel>
        <Select
          labelId={`${referenceTable}-label`}
          id={`${referenceTable}-select`}
          label={getLabel(referenceTable)}
          value={getValue(referenceTable)}
          onChange={handleChange}
        >
          <MenuItem value="-1">
            <em>{seniorityFilter.All}</em>
          </MenuItem>
          {data &&
            data.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
