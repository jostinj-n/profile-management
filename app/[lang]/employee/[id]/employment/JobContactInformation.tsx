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
import { Employment } from "@/app/types/employment";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  employment: Employment;
  labels: Dictionary["employee"]["employmentDetailsCard"];
};

export const JobContactInformation: FC<Props> = ({ employment, labels }) => {
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
                      {labels.workDevicePhoneNumber}
                    </Typography>
                  }
                  secondary={employment.workDevicePhoneNumber}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <BadgeOutlinedIcon color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.workEmailAddress}
                    </Typography>
                  }
                  secondary={employment.workEmailAddress}
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
                  {labels.workContactDeviceType}
                </Typography>
              }
              secondary={employment.workContactDeviceType}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
