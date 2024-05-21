"use client";
import { Dictionary } from "@/dictionaries/dictionaries";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

type Props = {
  back: Dictionary["workforce"]["seniority"]["template"]["back"];
};
export default function NavigationBack({ back }: Readonly<Props>) {
  const router = useRouter();
  return (
    <Button type="button" color="secondary" onClick={() => router.back()}>
      <ArrowBackIosIcon className="w-3 h-3" />
      {back}
    </Button>
  );
}
