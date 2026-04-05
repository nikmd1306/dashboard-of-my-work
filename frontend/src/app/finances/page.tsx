import { Wallet } from "lucide-react";

import ru from "@/i18n/ru";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";

export default function FinancesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        title={ru.finances.title}
        subtitle={ru.finances.subtitle}
      />
      <EmptyState
        icon={Wallet}
        title={ru.finances.empty.title}
        description={ru.finances.empty.description}
      />
    </div>
  );
}
