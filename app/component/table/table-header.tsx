import { setRequestParams } from "@/app/redux/features/seniority/requestParamsSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

export type Order = "asc" | "desc";

export type HeadCell = {
  id: string;
  label: string;
  position: number;
  isSort: boolean;
};

type TableProps = {
  headCells: HeadCell[];
};

export function TableHeader(props: Readonly<TableProps>) {
  const dispatch = useAppDispatch();

  const requestParams = useAppSelector((state) => state.requestParams);
  const { order, orderBy } = requestParams;

  const createSortHandler = (propertyPosition: number) => () => {
    const isAsc = orderBy === propertyPosition && order === "asc";
    const orderProperty = isAsc ? "desc" : "asc";
    dispatch(
      setRequestParams({
        ...requestParams,
        order: orderProperty,
        orderBy: propertyPosition,
        user_sorting: propertyPosition + orderProperty,
      })
    );
  };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell: any) => (
          <TableCell
            key={headCell.label}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.position ? order : false}
          >
            {headCell.isSort ? (
              <TableSortLabel
                active={orderBy === headCell.position}
                direction={orderBy === headCell.position ? order : "asc"}
                onClick={createSortHandler(headCell.position)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
