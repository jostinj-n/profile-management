import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import { EmploymentLastUpdates } from "@/app/types/employee";
import { Dictionary } from "@/dictionaries/dictionaries";

interface EmploymentUpdateRecordsCardProps {
  updates: EmploymentLastUpdates[];
  labels: Dictionary["employee"]["lastUpdate"];
}

export default function EmploymentUpdateRecordsCard (props: EmploymentUpdateRecordsCardProps) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        (props.updates || []).map((update, index) => {
          if (update.status === 'pending') {
            return (
              <ListItem key={index} className="bg-neutral-50" style={{
                border: '2px solid #ccc',
                borderRadius: 10
              }}>
                <ListItemAvatar>
                  <Avatar className="bg-transparent text-gwColor-grey">
                    <SyncOutlinedIcon className="text-gwColor-primary01" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={update.name} secondary={new Date(update.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) || "Uknown"} />
              </ListItem>
            )
          } else {
            return null
          }
        })
      }

      {
        (props.updates || []).map((update, index) => {
          if (update.status !== 'pending') {
            return (
              <ListItem key={index} className="border">
                <ListItemAvatar>
                  <Avatar className="bg-transparent text-gwColor-grey">
                    <SyncOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={update.name} secondary={new Date(update.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) || "Uknown"} />
              </ListItem>
            )
          } else {
            return null
          }
        })
      }
    </List>
  );
}