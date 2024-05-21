import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ClientWrapper } from "@/app/[lang]/employee/[id]/personal/clientWrapper";

export default async function PersonalPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const {
    employee: {
      menu: menuLabels,
      profile: profileLabels,
      documentDetailCard: documentDetailCardLabels,
      personalDetails: personalDetailLabels,
      bankDetails: bankDetailLabels,
    },
    // button,
  } = await getDictionary(lang);

  return (
    <ClientWrapper
      id={id}
      menuLabels={menuLabels}
      profileLabels={profileLabels}
      personalDetailLabels={personalDetailLabels}
      documentDetailCardLabels={documentDetailCardLabels}
      bankDetailLabels={bankDetailLabels}
    />
  );
}
