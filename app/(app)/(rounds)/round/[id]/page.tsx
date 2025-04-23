import { getRoundById } from "@/app/actions/round-actions";
import RoundDetail from "@/components/round-detail";

export default async function RoundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    throw new Error("Round ID is required");
  }

  const round = await getRoundById(id);

  return <RoundDetail round={round!} />;
}
