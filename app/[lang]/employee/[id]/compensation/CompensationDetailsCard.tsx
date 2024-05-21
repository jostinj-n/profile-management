import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
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
import { fetchCompensationById } from "@/app/redux/features/employeeCompensationSlice";

import {
  AccountBalanceOutlined,
  BadgeOutlined,
  CalendarMonthOutlined,
  DirectionsCarOutlined,
  LocalParkingOutlined,
  PaymentsOutlined,
  PercentOutlined,
} from "@mui/icons-material";

type Props = {
  employeeId: string;
  labels: Dictionary["employee"]["compensationPage"];
};

export const CompensationDetailsCard: FC<Props> = ({ employeeId, labels }) => {
  const dispatch = useAppDispatch();
  const { compensation, isLoading, error } = useAppSelector(
    (state: RootState) => state.compensationDetail,
  );

  useEffect(() => {
    dispatch(fetchCompensationById(employeeId));
  }, [dispatch, employeeId]);

  if (isLoading || error) {
    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }

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
        <List>
          <ListItem>
            <ListItemAvatar>
              <LocalParkingOutlined color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.issuedPassType}
                </Typography>
              }
              secondary={compensation.issuedPassType}
            />
          </ListItem>

          <Grid container>
            <Grid item xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <CalendarMonthOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.reimbursementType}
                    </Typography>
                  }
                  secondary={compensation.reimbursementType}
                />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <PercentOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.reimbursementPercentage}
                    </Typography>
                  }
                  secondary={compensation.reimbursementPercentage}
                />
              </ListItem>
            </Grid>
          </Grid>

          <Grid container>
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
                  secondary={compensation.issuingAgency}
                />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <PaymentsOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.passMonthCost}
                    </Typography>
                  }
                  secondary={compensation.passMonthlyCost}
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
                  secondary={compensation.effectiveFrom}
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
                  secondary={compensation.effectiveTo}
                />
              </ListItem>
            </Grid>
          </Grid>

          <ListItem>
            <ListItemAvatar>
              <BadgeOutlined color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.passNumber}
                </Typography>
              }
              secondary={compensation.passNumber}
            />
          </ListItem>

          <Grid container>
            <Grid item xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <DirectionsCarOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.vehicleMake}
                    </Typography>
                  }
                  secondary={compensation.vehicleMake}
                />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <DirectionsCarOutlined color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="font-bold">
                      {labels.vehicleModel}
                    </Typography>
                  }
                  secondary={compensation.vehicleModel}
                />
              </ListItem>
            </Grid>
          </Grid>

          <ListItem>
            <ListItemAvatar>
              <DirectionsCarOutlined color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.vehicleColor}
                </Typography>
              }
              secondary={compensation.vehicleColor}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <BadgeOutlined color="primary" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className="font-bold">
                  {labels.vehicleLicensePlate}
                </Typography>
              }
              secondary={compensation.licensePlate}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
