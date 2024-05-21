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
  Stack,
  Typography,
} from "@mui/material";
import { Employment, EmploymentDetail } from "@/app/types/employment";
import { Dictionary } from "@/dictionaries/dictionaries";

import {
  AccountBox,
  BadgeOutlined,
  Female,
  ManageAccountsOutlined,
} from "@mui/icons-material";

type Props = {
  employment: Employment;
  details: EmploymentDetail;
  labels: Dictionary["employee"]["specializedEmploymentDetailsCard"];
};

export const SpecializedEmploymentDetailsCard: FC<Props> = ({
  labels,
  employment,
  details,
}) => {
  return (
    <Stack spacing={2}>
      {employment?.associatedIds?.map((item, index) => {
        return (
          <Card
            sx={{ minWidth: 275, border: 1, borderColor: "grey.300" }}
            elevation={0}
            key={index}
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
                                {labels.otherEmployeeIdTypes}
                              </Typography>
                            }
                            secondary={item.otherEmployeeAssociatedIdType}
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemAvatar>
                            <BadgeOutlined color="primary" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography className="font-bold">
                                {labels.otherEmployeeIdExpiry}
                              </Typography>
                            }
                            secondary={
                              item.otherEmployeeAssociatedIdExpiryDates
                            }
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemAvatar>
                            <BadgeOutlined color="primary" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography className="font-bold">
                                {labels.language}
                              </Typography>
                            }
                            secondary={employment.languages}
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemAvatar>
                            <BadgeOutlined color="primary" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography className="font-bold">
                                {labels.isActive}
                              </Typography>
                            }
                            secondary={
                              employment.isActiveHAndS ? labels.yes : labels.no
                            }
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemAvatar>
                            <BadgeOutlined color="primary" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography className="font-bold">
                                {labels.isActive}
                              </Typography>
                            }
                            secondary={
                              employment.isActiveHAndS ? labels.yes : labels.no
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
                        <Female color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.otherEmployeeIdValues}
                          </Typography>
                        }
                        secondary={item.otherEmployeeAssociatedIdValues}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <AccountBox color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.isBilingual}
                          </Typography>
                        }
                        secondary={
                          employment.isBilingualFlag ? labels.yes : labels.no
                        }
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <BadgeOutlined color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.catsaJobLevel}
                          </Typography>
                        }
                        secondary={details.catsaJobLevel}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <BadgeOutlined color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className="font-bold">
                            {labels.isActiveUnionSteward}
                          </Typography>
                        }
                        secondary={
                          employment.isActiveUnionSteward
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
      })}
    </Stack>
  );
};
