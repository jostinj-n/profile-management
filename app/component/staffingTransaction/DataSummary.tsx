import { Box, Typography } from "@mui/material";
import { Fragment } from "react";

export type DataSummaryType = {
  label: string;
  value: string;
};
type Props = {
  title: string;
  data: DataSummaryType[];
};
export default function DataSummary({ title, data }: Readonly<Props>) {
  return (
    <Box width={700}>
      <Typography variant="h6" pb={2}>
        {title}
      </Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr"}>
        {data.map((item: DataSummaryType) => (
          <Fragment key={item.label}>
            <Typography variant="subtitle2">{item.label}</Typography>
            <Typography>{item.value}</Typography>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
