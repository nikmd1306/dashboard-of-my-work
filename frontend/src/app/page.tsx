import { LayoutDashboard } from "lucide-react";

import ru from "@/i18n/ru";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title={ru.dashboard.title} subtitle={ru.dashboard.subtitle} />
      <EmptyState
        icon={LayoutDashboard}
        title={ru.dashboard.empty.title}
        description={ru.dashboard.empty.description}
      />
    </div>
  );
}
