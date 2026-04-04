import ru from "@/i18n/ru";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{ru.dashboard.title}</h1>
      <p className="mt-1 text-muted-foreground">{ru.dashboard.subtitle}</p>
    </div>
  );
}
