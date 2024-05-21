import { FC } from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Employment, EmploymentDetail } from "@/app/types/employment";
import { Dictionary } from "@/dictionaries/dictionaries";
import { JobInformation } from "./JobInformation";
import { JobContactInformation } from "./JobContactInformation";
import { JobDatesInformation } from "./JobDatesInformation";

type Props = {
  employment: EmploymentDetail;
  otherDetails: Employment;
  labels: Dictionary["employee"]["employmentDetailsCard"];
};

export const EmploymentDetailsCard: FC<Props> = ({
  labels,
  employment,
  otherDetails,
}) => {
  return (
    <div>
      <Card
        sx={{ minWidth: 275, border: 1, borderColor: "grey.300" }}
        elevation={0}
      >
        <CardHeader
          className="border-solid border-t-[0px] border-l-[0px] border-r-[0px] border-b-[1px] border-gray-200"
          title={<Typography variant="h6">{labels.title}</Typography>}
        />
        <CardContent className="bg-neutral-50">
          <JobInformation employment={employment} labels={labels} />

          <Typography variant="body1">{labels.contactInformation}</Typography>
          <JobContactInformation employment={otherDetails} labels={labels} />

          <Typography variant="body1">{labels.dates}</Typography>
          <JobDatesInformation
            employment={employment}
            otherDetails={otherDetails}
            labels={labels}
          />
        </CardContent>
      </Card>
    </div>
  );
};
