// import RoundsTable from "@/rounds-table";
import { getAllRounds } from "@/app/actions/round-actions";
import RoundsTable from "@/components/rounds-table";

export default async function RoundsPage() {
  let loading = true;
  const rounds = await getAllRounds();
  loading = false;

  return <RoundsTable rounds={rounds} loading={loading} />;
}
