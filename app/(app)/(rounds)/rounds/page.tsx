// import RoundsTable from "@/rounds-table";
import { getAllRounds } from "@/app/actions/round-actions";
import RoundsTable from "@/components/rounds-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function RoundsPage() {
  let loading = true;
  const rounds = await getAllRounds();
  loading = false;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 p-10 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Funding Rounds</h1>
          <p className="text-muted-foreground">
            Current funding status and requirements
          </p>
        </div>
        <div className="flex gap-2">{/* {user?.id === company.userId } */}</div>
      </div>
      <RoundsTable rounds={rounds} loading={loading} />;
    </div>
  );
}
