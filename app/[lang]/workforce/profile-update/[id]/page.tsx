import { ProfileUpdateWrapper } from "@/app/[lang]/workforce/profile-update/profileUpdateWrapper";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function ProfileUpdate({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const {
    workforce: { newProfile },
    button,
  } = await getDictionary(lang);
  return (
    <ProfileUpdateWrapper
      buttonLabels={button}
      updateProfileLabels={newProfile}
      id={id}
    />
  );
}
