import React from "react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import StaffingTransaction from "./component/StaffingTransaction";

export default async function Page({
  params: { lang, id },
}: Readonly<{
  params: { lang: Locale; id: string };
}>) {
  const {
    workforce: { staffingTransaction },
  } = await getDictionary(lang);

  return (
    <StaffingTransaction staffingTransaction={staffingTransaction} id={id} />
  );
}
