import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import EditIcon from "@mui/icons-material/BorderColorOutlined";

import UpdateEmploymentModal from "../../../component/UpdateEmploymentModal";
import { EmploymentInformation } from "../../../types/employee";
import { Dictionary } from "@/dictionaries/dictionaries";

type EmploymentProps = {
  employment: EmploymentInformation;
  labels: Dictionary["employee"]["employmentInformation"];
};

export default function EmploymentInformationCard({
  employment,
  labels,
}: EmploymentProps) {
  const [showUpdateEmploymentModal, setShowUpdateEmploymentModal] =
    React.useState(false);

  return (
    <div>
      <Card
        sx={{ minWidth: 275, border: 1, borderColor: "grey.300" }}
        elevation={0}
      >
        <CardHeader
          className="border-solid border-t-[0px] border-l-[0px] border-r-[0px] border-b-[1px] border-gray-200"
          avatar={
            <span>
              <Avatar className="mr-3 bg-gwColor-primary01">GW</Avatar>
            </span>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => setShowUpdateEmploymentModal(true)}
            >
              <EditIcon className="text-gwColor-grey" />
            </IconButton>
          }
          title={<Typography variant="h6">GARDAWORLD</Typography>}
        />
        <CardContent className="bg-neutral-50">
          <div>
            <Typography variant="body1">{labels.workDetails}</Typography>
            <List>
              <div className="grid grid-cols-2">
                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <BusinessCenterOutlinedIcon className="text-gwColor-primary01" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">
                          {labels.workLocation}
                        </Typography>
                      }
                      secondary={employment.location}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <BadgeOutlinedIcon className="text-gwColor-primary01" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">
                          {labels.employmentStatus}
                        </Typography>
                      }
                      secondary={employment.employmentStatus}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <ContactPageOutlinedIcon className="text-gwColor-primary01" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">
                          {labels.department}
                        </Typography>
                      }
                      secondary={employment.department}
                    />
                  </ListItem>
                </div>

                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <LooksOneOutlinedIcon className="text-gwColor-primary01" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">
                          {labels.employeeNumber}
                        </Typography>
                      }
                      secondary={employment.employmentNumber}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <AvTimerOutlinedIcon className="text-gwColor-primary01" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">
                          {labels.statusClassification}
                        </Typography>
                      }
                      secondary={employment.jobStatus}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <CardTravelOutlinedIcon className="text-gwColor-primary01" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="font-bold">Division</Typography>
                      }
                      secondary={employment.division}
                    />
                  </ListItem>
                </div>
              </div>
            </List>
          </div>
        </CardContent>
      </Card>

      {showUpdateEmploymentModal && (
        <UpdateEmploymentModal
          personId={employment.personId}
          employmentNumber={employment.employmentNumber}
          location={employment.location}
          employmentStatus={employment.employmentStatus}
          jobStatus={employment.jobStatus}
          department={employment.department}
          division={employment.division}
          onDone={() => setShowUpdateEmploymentModal(false)}
        />
      )}
    </div>
  );
}
