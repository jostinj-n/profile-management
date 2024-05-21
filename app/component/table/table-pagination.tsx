import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Dictionary } from "@/dictionaries/dictionaries";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { setRequestParams } from "@/app/redux/features/seniority/requestParamsSlice";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

type PaginationProps = {
  seniority: Dictionary["workforce"]["seniority"];
  total: number;
};

const paginationSelector = (total: number) =>
  createSelector(
    (state: RootState) => state.requestParams.page,
    (state: RootState) => state.requestParams.perPage,
    (page, perPage) => {
      const pageNoUndef = page ?? 0;
      const perPageNoUndef = perPage ?? 0;

      return {
        nbPages: Math.ceil(total / (perPage ?? 1)),
        pageNoUndef,
        startIndex: (pageNoUndef - 1) * perPageNoUndef + 1,
        endIndex: Math.min(pageNoUndef * perPageNoUndef, total),
      };
    }
  );

export function TableGWPagination({
  seniority,
  total,
}: Readonly<PaginationProps>) {
  const dispatch = useAppDispatch();
  const { endIndex, startIndex, nbPages, pageNoUndef } = useAppSelector(
    paginationSelector(total)
  );

  const requestParams = useAppSelector((state) => state.requestParams);

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(
      setRequestParams({
        ...requestParams,
        page: newPage,
      })
    );
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={6} className="py-8 pl-10">
        {seniority.pagination.showing} {startIndex} {seniority.pagination.to}{" "}
        {endIndex} {seniority.pagination.of} {total}{" "}
        {seniority.pagination.results}
      </Grid>
      <Grid item xs={6}>
        <Pagination
          className="py-5 grid justify-end"
          count={nbPages}
          page={pageNoUndef}
          onChange={handleChangePage}
          color="primary"
        />
      </Grid>
    </Grid>
  );
}
