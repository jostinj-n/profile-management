import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ClientWrapper } from "@/app/[lang]/employee/[id]/management/clientWrapper";

export default async function ManagementPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const {
    button: buttonLabels,
    employee: {
      menu: menuLabels,
      profile: profileLabels,
      profileManagementPage: managementPageLabels,
      profileUpdateAuditTable,
      employeeStaffingTransactionsTable: staffingTransactionTableLabels,
    },
  } = await getDictionary(lang);

  return (
    <ClientWrapper
      id={id}
      buttonLabels={buttonLabels}
      menuLabels={menuLabels}
      profileLabels={profileLabels}
      labels={managementPageLabels}
      stfTableLabels={staffingTransactionTableLabels}
      profileUpdateAuditTableLabels={profileUpdateAuditTable}
    />
  );
}
