import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ClientWrapper } from "@/app/[lang]/employee/clientWrapper";

export default async function Dashboard({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const {
    employee: {
      filterBar: filterLabels,
      table: tableLabels,
      listPage: listPageLabels,
      exportEmployeesModal: exportEmployeesModalLabels,
    },
    button,
  } = await getDictionary(lang);

  return (
    <ClientWrapper
      labels={listPageLabels}
      tableLabels={tableLabels}
      filterLabels={filterLabels}
      buttonLabels={button}
      exportEmployeesModalLabels={exportEmployeesModalLabels}
    />
  );
}