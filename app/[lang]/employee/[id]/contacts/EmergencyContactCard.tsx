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
import { EmergencyContact } from "@/app/types/employee";

import {
  AlternateEmail,
  BadgeOutlined,
  CallOutlined,
  Face3Outlined,
  InsertDriveFileOutlined,
  PersonOutlined,
  PublicOutlined,
  SmartphoneOutlined,
} from "@mui/icons-material";

import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  contact: EmergencyContact;
  labels: Dictionary["employee"]["emergencyContact"];
};

export const EmergencyContactCard: FC<Props> = ({ contact, labels }) => (
  <Card
    sx={{ minWidth: 275, border: 1, borderColor: "grey.300" }}
    elevation={0}
  >
    <CardHeader
      sx={{ borderBottom: 1, borderColor: "inherit" }}
      title={
        <Typography variant="h6">{`${labels.title} ${
          contact.primaryFlag ? "(Primary)" : ""
        }`}</Typography>
      }
    />
    <CardContent className="bg-neutral-50">
      <Grid container>
        <Grid xs={6} item>
          <List>
            <ListItem>
              <ListItemAvatar>
                <PersonOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span className="font-bold">{labels.personalPronoun}</span>
                }
                secondary={contact.personalPronoun}
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <BadgeOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={<span className="font-bold">{labels.name}</span>}
                secondary={`${contact.firstName} ${contact.lastName}`}
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <PublicOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={<span className="font-bold">{labels.language}</span>}
                secondary={contact.languageOfCommunication}
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <SmartphoneOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={<span className="font-bold">{labels.deviceType}</span>}
                secondary={contact.contactType}
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <CallOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span className="font-bold">{labels.phoneNumber}</span>
                }
                secondary={contact.phoneNumber}
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <AlternateEmail color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={<span className="font-bold">{labels.email}</span>}
                secondary={contact.emailAddress}
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <InsertDriveFileOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={<span className="font-bold">{labels.notes}</span>}
                secondary={contact.notes}
              />
            </ListItem>
          </List>
        </Grid>

        <Grid xs={6} item>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Face3Outlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span className="font-bold">{labels.relationship}</span>
                }
                secondary={contact.relationship}
              />
            </ListItem>

            {contact.otherRelationship ? (
              <ListItem>
                <ListItemAvatar>
                  <Face3Outlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span className="font-bold">
                      {labels.otherRelationship}
                    </span>
                  }
                  secondary={contact.otherRelationship}
                />
              </ListItem>
            ) : null}

            <ListItem>
              <ListItemAvatar>
                <PublicOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span className="font-bold">
                    {labels.languageProficiency}
                  </span>
                }
                secondary={contact.languageProficiency}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Grid xs={6} item>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Face3Outlined color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={<span className="font-bold">{labels.relationship}</span>}
              secondary={contact.relationship}
            />
          </ListItem>

          {contact.otherRelationship ? (
            <ListItem>
              <ListItemAvatar>
                <Face3Outlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span className="font-bold">{labels.otherRelationship}</span>
                }
                secondary={contact.otherRelationship}
              />
            </ListItem>
          ) : null}

          <ListItem>
            <ListItemAvatar>
              <PublicOutlined color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <span className="font-bold">{labels.languageProficiency}</span>
              }
              secondary={contact.languageProficiency}
            />
          </ListItem>
        </List>
      </Grid>
    </CardContent>
  </Card>
);
