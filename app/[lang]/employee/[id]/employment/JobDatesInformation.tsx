import { FC } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { ManageAccountsOutlined } from "@mui/icons-material";
import { Employment, EmploymentDetail } from "@/app/types/employment";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  employment: EmploymentDetail;
  otherDetails: Employment;
  labels: Dictionary["employee"]["employmentDetailsCard"];
};

export const JobDatesInformation: FC<Props> = ({
  employment,
  otherDetails,
  labels,
}) => {
  return (
    <Grid container>
      <Grid xs={6} item>
        <List>
          <div className="grid grid-cols-2">
            <div>
              <ListItem>
                <ListItemAvatar>
                  <ManageAccountsOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.jobHireDate}
                    </Typography>
                  }
                  secondary={employment.jobHireDate}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <BadgeOutlinedIcon color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.probationDate}
                    </Typography>
                  }
                  secondary={otherDetails.probationDate}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <BadgeOutlinedIcon color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.lastDayOfWork}
                    </Typography>
                  }
                  secondary={employment.lastDayOfWorkOnRole}
                />
              </ListItem>
            </div>
          </div>
        </List>
      </Grid>
      <Grid xs={6} item>
        <List>
          <ListItem>
            <ListItemAvatar>
              <BadgeOutlinedIcon color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.firstDayOfWork}
                </Typography>
              }
              secondary={employment.firstDayOfWorkOnRole}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <BadgeOutlinedIcon color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.originalHireDate}
                </Typography>
              }
              secondary={otherDetails.originalHireDate}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <BadgeOutlinedIcon color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.terminationDate}
                </Typography>
              }
              secondary={otherDetails.terminationDate}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
