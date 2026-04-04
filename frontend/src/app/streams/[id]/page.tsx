import ru from "@/i18n/ru";

interface StreamDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function StreamDetailPage({
  params,
}: StreamDetailPageProps) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-2xl font-semibold">{ru.streams.detail.title}</h1>
      <p className="mt-1 text-muted-foreground">Stream #{id}</p>
    </div>
  );
}
