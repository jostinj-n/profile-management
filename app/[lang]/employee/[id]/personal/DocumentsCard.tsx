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
  AccountBalanceOutlined,
  AccountCircleOutlined,
  BadgeOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import { EmployeeDocument } from "@/app/types/employee";

type Props = {
  details: EmployeeDocument;
  labels: Dictionary["employee"]["documentDetailCard"];
};

export const DocumentCard: FC<Props> = ({ details, labels }) => {
  return (
    <Card
      sx={{ minWidth: 275, border: 1, borderColor: "grey.300" }}
      elevation={0}
    >
      <CardHeader
        sx={{ borderBottom: 1, borderColor: "inherit" }}
        title={
          <Typography variant="h6">
            {details.idType} {labels.title}
          </Typography>
        }
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
                      {labels.idType}
                    </Typography>
                  }
                  secondary={details.idType}
                />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <AccountBalanceOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.issuingAgency}
                    </Typography>
                  }
                  secondary={details.issuingAgency}
                />
              </ListItem>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <BadgeOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.value}
                    </Typography>
                  }
                  secondary={details.idNumber}
                />
              </ListItem>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <CalendarMonthOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.effectiveFrom}
                    </Typography>
                  }
                  secondary={
                    details.effectiveFrom
                      ? details.effectiveFrom
                      : labels.notApplicable
                  }
                />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <CalendarMonthOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.effectiveTo}
                    </Typography>
                  }
                  secondary={
                    details.effectiveTo
                      ? details.effectiveTo
                      : labels.notApplicable
                  }
                />
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </CardContent>
    </Card>
  );
};
