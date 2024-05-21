"use client";
import { Dictionary } from "@/dictionaries/dictionaries";
import Box from "@mui/material/Box";
import AlertNotice from "../alert-notice";
import Typography from "@mui/material/Typography";
import Title from "../title";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

type Props = {
  seniorityTemplate: Dictionary["workforce"]["seniority"]["template"];
};
export default function GroupingHeader({ seniorityTemplate }: Readonly<Props>) {
  const route = useRouter();
  return (
    <>
      <Box className="grid md:grid-cols-2 gap-4 grid-cols-1  pb-3">
        <Box className="flex justify-start">
          <Title title={seniorityTemplate.list.title} />
        </Box>

        <Box className=" grid justify-end">
          {
            <Button
              variant="contained"
              onClick={() => route.push(`create-grouping`)}
              size="medium"
              startIcon={<AddIcon />}
            >
              {seniorityTemplate.list.buttonEdit}
            </Button>
          }
        </Box>
      </Box>
      <Box>
        <AlertNotice seniorityTemplateList={seniorityTemplate.list}>
          <>
            <Typography variant="subtitle2" gutterBottom>
              {seniorityTemplate.notice.title}
            </Typography>
            <ol className="list-decimal">
              {seniorityTemplate.notice.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </>
        </AlertNotice>
      </Box>
    </>
  );
}
