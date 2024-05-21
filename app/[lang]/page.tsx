import React from "react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return <div>{dict.home}</div>;
}
