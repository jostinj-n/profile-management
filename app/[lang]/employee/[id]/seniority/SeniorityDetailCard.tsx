import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  CardHeader,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { SeniorityDetails } from "@/app/types/employee";
import {
  BusinessCenterOutlined,
  CalendarMonthOutlined,
  EmojiFlagsOutlined,
  InsertDriveFileOutlined,
} from "@mui/icons-material";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  details: SeniorityDetails[];
  labels: Dictionary["employee"]["seniority"];
};

export const SeniorityDetailCard: FC<Props> = ({ details, labels }) => {
  return (
    <Card
      sx={{ minWidth: 275, border: 1, borderColor: "grey.300" }}
      elevation={0}
    >
      <CardHeader
        className="border-solid border-t-[0px] border-l-[0px] border-r-[0px] border-b-[1px] border-gray-200"
        title={<Typography variant="h6">{labels.title}</Typography>}
      />
      <CardContent className="bg-neutral-50">
        <List>
          <ListItem>
            <ListItemAvatar>
              <BusinessCenterOutlined color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.employmentInformationStatus}
                </Typography>
              }
              secondary={details[0].employmentInformationStatus}
            />
          </ListItem>

          {details.map((detail, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={6}>
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <CalendarMonthOutlined color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">
                          {detail.dateType}
                        </Typography>
                      }
                      secondary={detail.seniorityDate}
                    />
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  {detail.senioritySuppressFlag ? (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <EmojiFlagsOutlined color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.workLocationTieBreaker}
                          </Typography>
                        }
                        secondary={
                          <Stack
                            flexDirection={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <span>{detail.seniorityTieBreaker}</span>
                            {detail.senioritySuppressFlag ? (
                              <Chip
                                size="small"
                                sx={{ maxWidth: "100px" }}
                                label={labels.suppress}
                                color="success"
                                variant="outlined"
                              />
                            ) : null}
                          </Stack>
                        }
                      />
                    </ListItem>
                  ) : null}
                </Grid>
              </Grid>
            );
          })}

          <ListItem>
            <ListItemAvatar>
              <InsertDriveFileOutlined color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">{labels.note}</Typography>
              }
              secondary={details[0].notes}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
