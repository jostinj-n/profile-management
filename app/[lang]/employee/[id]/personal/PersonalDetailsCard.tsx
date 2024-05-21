import { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Dictionary } from "@/dictionaries/dictionaries";
import { AccountCircleOutlined } from "@mui/icons-material";
import { EmployeePersonalDetails } from "@/app/types/employee";

type Props = {
  details: EmployeePersonalDetails;
  labels: Dictionary["employee"]["personalDetails"];
};

export const PersonalDetailsCard: FC<Props> = ({ details, labels }) => (
  <Card
    sx={{ minWidth: 275, border: 1, borderColor: "grey.300" }}
    elevation={0}
  >
    <CardHeader
      sx={{ borderBottom: 1, borderColor: "inherit" }}
      title={<Typography variant="h6">{labels.title}</Typography>}
    />
    <CardContent className="bg-neutral-50">
      <List>
        <Grid container>
          <Grid item xs={6}>
            <ListItem>
              <ListItemAvatar>
                <AccountCircleOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">
                    {labels.dateOfBirth}
                  </Typography>
                }
                secondary={details.dateOfBirth}
              />
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <ListItemAvatar>
                <AccountCircleOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">
                    {labels.binaryGenderSelection}
                  </Typography>
                }
                secondary={details.gender}
              />
            </ListItem>
          </Grid>
        </Grid>
      </List>
    </CardContent>
  </Card>
);
