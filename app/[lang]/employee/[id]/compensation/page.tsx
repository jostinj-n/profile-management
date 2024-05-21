import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ClientWrapper } from "@/app/[lang]/employee/[id]/compensation/clientWrapper";

export default async function CompensationPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const {
    employee: {
      menu: menuLabels,
      profile: profileLabels,
      compensationPage: compensationPageLabels,
    },
  } = await getDictionary(lang);

  return (
    <ClientWrapper
      id={id}
      profileLabels={profileLabels}
      menuLabels={menuLabels}
      labels={compensationPageLabels}
    />
  );
}
