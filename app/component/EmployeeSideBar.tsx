import React, { FC } from "react";
import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Employee } from "@/app/types/employee";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  employee: Employee;
  labels: Dictionary["employee"]["profile"];
};

type EmployeeProfileListProps = {
    employee: Employee;
    labels: Dictionary["employee"]["profile"];
};
  
  function EmployeeProfileList({ employee, labels }: EmployeeProfileListProps) {
    return (
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start" sx={{paddingLeft: 0}}>
          <ListItemText
            primary={<strong>{labels.employeeNumber}</strong>}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                className="text-gray-500"
              >
                {employee.employee_number || "Uknown"}
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start" sx={{paddingLeft: 0}}>
          <ListItemText
            primary={<strong>{labels.lms}</strong>}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                className="text-gray-500"
              >
                {employee.lms || "Uknown"}
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start" sx={{paddingLeft: 0}}>
          <ListItemText
            primary={<strong>{labels.statusClassification}</strong>}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                className="text-gray-500"
              >
                {employee.status_classification}
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start" sx={{paddingLeft: 0}}>
          <ListItemText
            primary={<strong>{labels.companyName}</strong>}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                className="text-gray-500"
              >
                {employee.company_name}
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start" sx={{paddingLeft: 0}}>
          <ListItemText
            primary={<strong>{labels.division}</strong>}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                className="text-gray-500"
              >
                {employee.division}
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start" sx={{paddingLeft: 0}}>
          <ListItemText
            primary={<strong>{labels.workLocation}</strong>}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                className="text-gray-500"
              >
                {employee.location}
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start" sx={{paddingLeft: 0}}>
          <ListItemText
            primary={<strong>{labels.department}</strong>}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                className="text-gray-500"
              >
                {employee.department}
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start" sx={{paddingLeft: 0}}>
          <ListItemText
            primary={<strong>{labels.languageOfCommunications}</strong>}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                className="text-gray-500"
              >
                {employee.primary_language_of_communication}
              </Typography>
            }
          />
        </ListItem>
      </List>
    );
  }
  

export const EmployeeSideBar: FC<Props> = ({employee, labels}) => {
    return (
        <div>
            <div className="flex items-start">
            <Avatar
                sx={{ width: 96, height: 96 }}
                variant="square"
                src={`https://i.pravatar.cc/150?img=${employee.person_id}`}
            />
            <span className="ml-5">
                <h3 className="mb-1 mt-1">
                {employee.first_name} {employee.last_name}
                </h3>
                <p className="mt-1 mb-1 text-gray-500">
                {employee.preferred_name || ""}
                </p>
                <Chip label="Active" color="success" />
            </span>
            </div>

            <EmployeeProfileList labels={labels} employee={employee} />
        </div>
    )
}