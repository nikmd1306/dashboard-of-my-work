import { Clock } from "lucide-react";

import ru from "@/i18n/ru";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";

export default function TimePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title={ru.time.title} subtitle={ru.time.subtitle} />
      <EmptyState
        icon={Clock}
        title={ru.time.empty.title}
        description={ru.time.empty.description}
      />
    </div>
  );
}
