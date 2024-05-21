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

import { HomeOutlined, MarkunreadMailboxOutlined } from "@mui/icons-material";
import { EmployeeContactAddress } from "@/app/types/employee";

type Props = {
  address: EmployeeContactAddress;
  labels: Dictionary["employee"]["contactAddressCard"];
};

export const ContactAddressCard: FC<Props> = ({ address, labels }) => (
  <Card
    sx={{ minWidth: 275, border: 1, borderColor: "grey.300" }}
    elevation={0}
  >
    <CardHeader
      sx={{ borderBottom: 1, borderColor: "inherit" }}
      title={<Typography variant="h6">{labels.title}</Typography>}
    />
    <CardContent className="bg-neutral-50">
      <Grid container>
        <Grid item>
          <List>
            <ListItem>
              <ListItemAvatar>
                <HomeOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">
                    {labels.residentialAddress}
                  </Typography>
                }
                secondary={address?.residentialAddress}
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <MarkunreadMailboxOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">
                    {labels.mailingAddress}
                  </Typography>
                }
                secondary={address?.mailingAddress}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
