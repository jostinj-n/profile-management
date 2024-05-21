import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ClientWrapper } from "@/app/[lang]/workforce/create-profile/clientWrapper";

const getSteps = (dict: {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  six: string;
  seven: string;
  eight: string;
  nine: string;
}) => [
  dict.first,
  dict.second,
  dict.third,
  dict.fourth,
  dict.fifth,
  dict.six,
  dict.seven,
  dict.eight,
  dict.nine,
];

export default async function CreateNewProfile({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const {
    workforce: { newProfile },
    button,
  } = await getDictionary(lang);
  const steps = getSteps(newProfile.stepper);

  return (
    <ClientWrapper
      newProfileLabels={newProfile}
      buttonLabels={button}
      steps={steps}
    />
  );
}
