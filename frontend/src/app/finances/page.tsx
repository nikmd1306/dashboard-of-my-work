import ru from "@/i18n/ru";

export default function FinancesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{ru.finances.title}</h1>
      <p className="mt-1 text-muted-foreground">{ru.finances.subtitle}</p>
    </div>
  );
}
