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
import {
  AccountBox,
  Female,
  ManageAccountsOutlined,
} from "@mui/icons-material";
import { EmploymentDetail } from "@/app/types/employment";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  employment: EmploymentDetail;
  labels: Dictionary["employee"]["employmentDetailsCard"];
};

export const JobInformation: FC<Props> = ({ employment, labels }) => {
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
                      {labels.primaryWorkLocationCode}
                    </Typography>
                  }
                  secondary={employment.primaryWorkLocationCode}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <BadgeOutlinedIcon color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.organizationalRole}
                    </Typography>
                  }
                  secondary={employment.organizationalRole}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <BadgeOutlinedIcon color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.jobTitle}
                    </Typography>
                  }
                  secondary={employment.jobTitle}
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
              <Female color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.otherWorkLocations}
                </Typography>
              }
              secondary={employment.otherWorkLocations}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <AccountBox color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.organizationalRoleSubtype}
                </Typography>
              }
              secondary={employment.organizationalRoleSubtype}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <BadgeOutlinedIcon color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.unionizedPosition}
                </Typography>
              }
              secondary={employment.unionizedPosition ? labels.yes : labels.no}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
