"use client";
import * as React from "react";
import { Tab, Tabs } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { changeActiveStep } from "@/app/redux/features/updateProfile/sideNavSlice";

const menuItems = [
  { id: 1, text: "Person Profile" },
  { id: 2, text: "Banking Information" },
  { id: 3, text: "Contact Details" },
  { id: 4, text: "Government ID's" },
  { id: 5, text: "Employment Information" },
  { id: 6, text: "Seniority" },
];

export default function SideNavbar() {
  const activeStep = useAppSelector(
    (state) => state.profileUpdateSideNav.activeStep,
  );
  const dispatch = useAppDispatch();
  return (
    <Tabs
      orientation={"vertical"}
      value={activeStep}
      sx={{
        padding: 1,
        ".MuiTabs-indicator": {
          display: "none",
        },
      }}
    >
      {menuItems.map((item, index) => (
        <Tab
          sx={{
            ":hover": {
              borderRadius: 1,
              backgroundColor: "#D52B1E",
              color: "white",
            },
            alignItems: "flex-start",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "400",
          }}
          onClick={() => dispatch(changeActiveStep(index))}
          key={item.id}
          label={item.text}
        />
      ))}
    </Tabs>
  );
}
