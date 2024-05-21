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
import { EmployeeBankingInformation } from "@/app/types/employee";
import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  banking: EmployeeBankingInformation;
  labels: Dictionary["employee"]["bankDetails"];
};

export const EmployeeBankingInformationCard: FC<Props> = ({
  banking,
  labels,
}) => (
  <Card
    sx={{ minWidth: 275, border: 1, borderColor: "grey.300" }}
    elevation={0}
  >
    <CardHeader
      sx={{ borderBottom: 1, borderColor: "inherit" }}
      title={
        <Typography variant="h6">{`${labels.title} ${
          banking.isActive ? `(${labels.active})` : ""
        }`}</Typography>
      }
    />
    <CardContent className="bg-neutral-50">
      <List>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ListItem>
              <ListItemAvatar>
                <AccountBalanceWalletOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">
                    {labels.companyId}
                  </Typography>
                }
                secondary={banking.company}
              />
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <ListItemAvatar>
                <AccountBalanceWalletOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">
                    {labels.paymentTypeCode}
                  </Typography>
                }
                secondary={banking.paymentTypeCode}
              />
            </ListItem>
          </Grid>
        </Grid>

        <ListItem>
          <ListItemAvatar>
            <AccountBalanceWalletOutlined color="primary" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography className="font-bold">{labels.bankName}</Typography>
            }
            secondary={banking.bankName}
          />
        </ListItem>

        <Grid container>
          <Grid item xs={6}>
            <ListItem>
              <ListItemAvatar>
                <AccountBalanceWalletOutlined color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">
                    {labels.accountNumber}
                  </Typography>
                }
                secondary={banking.accountNumber}
              />
            </ListItem>
          </Grid>

          <Grid item xs={6}>
            <ListItem>
              <ListItemAvatar>
                <ArticleOutlinedIcon className="text-gwColor-primary01" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">
                    {labels.routingNumber}
                  </Typography>
                }
                secondary={banking.routingNumber}
              />
            </ListItem>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <ListItem>
              <ListItemAvatar>
                <LooksOneOutlinedIcon className="text-gwColor-primary01" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">{labels.iban}</Typography>
                }
                secondary={banking.iban}
              />
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <ListItemAvatar>
                <LooksOneOutlinedIcon className="text-gwColor-primary01" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-bold">{labels.swift}</Typography>
                }
                secondary={banking.swift}
              />
            </ListItem>
          </Grid>
        </Grid>
      </List>
    </CardContent>
  </Card>
);
