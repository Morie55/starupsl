import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to the admin dashboard for preview
  redirect("/admin/investor-approvals");
}
