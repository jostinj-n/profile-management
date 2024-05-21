import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ClientWrapper } from "@/app/[lang]/employee/[id]/seniority/clientWrapper";

export default async function SeniorityPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const {
    employee: {
      profile: profileLabels,
      menu: menuLabels,
      seniority: seniorityLabels,
      lastUpdate: lastUpdateLabels,
    },
  } = await getDictionary(lang);

  return (
    <ClientWrapper
      id={id}
      profileLabels={profileLabels}
      menuLabels={menuLabels}
      seniorityLabels={seniorityLabels}
      lastUpdateLabels={lastUpdateLabels}
    />
  );
}
