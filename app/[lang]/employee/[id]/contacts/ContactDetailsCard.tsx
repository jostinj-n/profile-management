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

import {
  AlternateEmail,
  CallOutlined,
  SmartphoneOutlined,
  SmsOutlined,
} from "@mui/icons-material";
import { ContactDetails } from "@/app/types/employee";

type Props = {
  contactDetails: ContactDetails;
  labels: Dictionary["employee"]["contactDetails"];
};

export const ContactDetailsCard: FC<Props> = ({ contactDetails, labels }) => {
  return (
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
          <Grid xs={6} item>
            <List>
              <div className="grid grid-cols-2">
                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <SmartphoneOutlined color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">
                          {labels.personalDeviceType}
                        </Typography>
                      }
                      secondary={
                        contactDetails.contactDetails?.personalDeviceType
                      }
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <CallOutlined color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">
                          {labels.phoneNumberPrimary}
                        </Typography>
                      }
                      secondary={
                        contactDetails.contactDetails?.primaryPhoneNumber
                      }
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <AlternateEmail color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">
                          {labels.personalEmailAddressPrimary}
                        </Typography>
                      }
                      secondary={
                        contactDetails.contactDetails?.primaryEmailAddress
                      }
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
                  <SmsOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.smsAllowed}
                    </Typography>
                  }
                  secondary={
                    contactDetails.contactDetails?.isSmsAllowedPrimary
                      ? labels.yes
                      : labels.no
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <AlternateEmail color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.emailGeneralCorrespondenceAllowed}
                    </Typography>
                  }
                  secondary={
                    contactDetails.contactDetails?.emailCommunicationAllowed
                      ? labels.yes
                      : labels.no
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
