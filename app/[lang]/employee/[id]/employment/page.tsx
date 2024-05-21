import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ClientWrapper } from "@/app/[lang]/employee/[id]/employment/clientWrapper";

export default async function EmploymentPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const {
    employee: {
      menu: menuLabels,
      profile: profileLabels,
      employmentDetailsCard: employementDetailsCardLabels,
      specializedEmploymentDetailsCard: specializedDetailsCardLabels,
    },
  } = await getDictionary(lang);

  return (
    <ClientWrapper
      id={id}
      profileLabels={profileLabels}
      menuLabels={menuLabels}
      employmentDetailsCardLabels={employementDetailsCardLabels}
      specializedEmploymentDetailsCardLabels={specializedDetailsCardLabels}
    />
  );
}
