import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Dictionary } from "@/dictionaries/dictionaries";

interface Props {
  children?: React.ReactNode;
  seniorityTemplateList: Dictionary["workforce"]["seniority"]["template"]["list"];
}
export default function AlertNotice({
  children,
  seniorityTemplateList,
}: Readonly<Props>) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          sx={{ mb: 2 }}
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {children}
        </Alert>
      </Collapse>
      <Button
        startIcon={<InfoOutlinedIcon />}
        color="secondary"
        className={`text-[10px] -mt-10 italic ` + (open ? `hidden` : ``)}
        variant="text"
        onClick={() => setOpen(true)}
      >
        {seniorityTemplateList.noticeBox}
      </Button>
    </Box>
  );
}
