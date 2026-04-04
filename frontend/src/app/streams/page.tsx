import ru from "@/i18n/ru";

export default function StreamsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{ru.streams.title}</h1>
      <p className="mt-1 text-muted-foreground">{ru.streams.subtitle}</p>
    </div>
  );
}
