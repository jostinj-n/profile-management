"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { Dictionary } from "@/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setRequestParams } from "@/app/redux/features/seniority/requestParamsSlice";

type Props = {
  seniority: Dictionary["workforce"]["seniority"];
};
export default function GlobalSearch({ seniority }: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const requestParams = useAppSelector((state) => state.requestParams);

  const handleTypeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRequestParams({
        ...requestParams,
        global_search: e.target.value,
        page: 1,
      })
    );
  };
  return (
    <Box>
      <TextField
        sx={{ m: 1, minWidth: 300 }}
        size="small"
        className="flex flex-end"
        id="search-id"
        label={seniority.template.list.Search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </InputAdornment>
          ),
        }}
        placeholder={seniority.template.list.Search + "..."}
        onChange={handleTypeSearch}
      />
    </Box>
  );
}
