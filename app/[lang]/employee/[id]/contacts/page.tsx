import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ClientWrapper } from "@/app/[lang]/employee/[id]/contacts/clientWrapper";

export default async function ContactPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const {
    employee: {
      menu: menuLabels,
      profile: profileLabels,
      contactDetails: contactDetailLabels,
      contactAddressCard: contactAddressCardLabels,
      emergencyContact: emergencyContactLabels,
    },
  } = await getDictionary(lang);

  return (
    <ClientWrapper
      id={id}
      profileLabels={profileLabels}
      menuLabels={menuLabels}
      contactAddressCardLabels={contactAddressCardLabels}
      contactDetailLabels={contactDetailLabels}
      emergencyContactLabels={emergencyContactLabels}
    />
  );
}
