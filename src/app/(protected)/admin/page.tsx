import { DashboardHeader } from "../_components/dashboard-header";

export default function AdminPage() {
  return (
    <div>
      <DashboardHeader
        heading="Admin Panel"
        text="Access only for users with ADMIN role."
      />
    </div>
  );
}
