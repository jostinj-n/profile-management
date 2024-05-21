import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ClientWrapper } from "@/app/[lang]/employee/[id]/clientWrapper";

export default async function ProfilePage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const {
    employee: {
      menu: menuLabels,
      profileCard: employeeProfileCardLabels,
      profile: profileLabels,
      employmentInformation: employmentInformationLabels,
    },
  } = await getDictionary(lang);

  return (
    <ClientWrapper
      id={id}
      menuLabels={menuLabels}
      profileLabels={profileLabels}
      employeeProfileCardLabels={employeeProfileCardLabels}
      employmentInformationLabels={employmentInformationLabels}
    />
  );
}
