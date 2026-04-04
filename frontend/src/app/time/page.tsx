import ru from "@/i18n/ru";

export default function TimePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{ru.time.title}</h1>
      <p className="mt-1 text-muted-foreground">{ru.time.subtitle}</p>
    </div>
  );
}
