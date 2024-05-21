import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  CardHeader,
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
  InsertDriveFileOutlined,
  Man,
  ManageAccountsOutlined,
} from "@mui/icons-material";
import { EmployeeProfile } from "../../../types/employee";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  profile: EmployeeProfile;
  labels: Dictionary["employee"]["profileCard"];
};

export const EmployeeProfileCard: FC<Props> = ({ labels, profile }) => {
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
                            {labels.resourceType}
                          </Typography>
                        }
                        secondary={profile.resourceType}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <BadgeOutlinedIcon color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.firstName}
                          </Typography>
                        }
                        secondary={profile.firstName}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <BadgeOutlinedIcon color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.lastName}
                          </Typography>
                        }
                        secondary={profile.lastName}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <Female color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.gender}
                          </Typography>
                        }
                        secondary={profile.gender}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <AccountBox color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.imageDate}
                          </Typography>
                        }
                        secondary={profile.imageDate}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <BadgeOutlinedIcon color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.formerFirstName}
                          </Typography>
                        }
                        secondary={profile.formerFirstName}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <InsertDriveFileOutlined color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.notes}
                          </Typography>
                        }
                        secondary={profile.notes}
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
                        {labels.middleName}
                      </Typography>
                    }
                    secondary={profile.middleName}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <BadgeOutlinedIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography className="font-bold">
                        {labels.preferredName}
                      </Typography>
                    }
                    secondary={profile.preferredName}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Man color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography className="font-bold">
                        {labels.species}
                      </Typography>
                    }
                    secondary={profile.species}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <BadgeOutlinedIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography className="font-bold">
                        {labels.formerLastName}
                      </Typography>
                    }
                    secondary={profile.formerLastName}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
