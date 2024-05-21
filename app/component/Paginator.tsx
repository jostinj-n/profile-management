import { MouseEvent, useState } from "react";
import TablePagination from "@mui/material/TablePagination";

type PaginatorProps = {
  page: number;
  total: number;
  labelForRows?: string | null;
  onChangePage?: (newPage: number) => void;
};

export default function Paginator({ page, total, labelForRows, onChangePage }: PaginatorProps) {
  const [rowsPerPage] = useState(10);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (onChangePage) {
      onChangePage(newPage);
    }
  };

  return (
    <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10]}
      labelDisplayedRows={({ from, to }) => `${labelForRows ? labelForRows : `Employees from`} ${from} to ${to} of ${total}`}
    />
  );
}
