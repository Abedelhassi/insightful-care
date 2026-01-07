import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { PatientTable } from "@/components/dashboard/PatientTable";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { Users, Activity, AlertTriangle, FileText } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle="Welcome back, Dr. Wilson"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value={156}
          change="+12 this month"
          changeType="positive"
          icon={Users}
          iconColor="blue"
        />
        <StatCard
          title="Active Monitoring"
          value={24}
          change="Real-time tracking"
          changeType="neutral"
          icon={Activity}
          iconColor="green"
        />
        <StatCard
          title="High-Risk Alerts"
          value={3}
          change="+2 since yesterday"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="red"
        />
        <StatCard
          title="Reports Generated"
          value={48}
          change="This week"
          changeType="neutral"
          icon={FileText}
          iconColor="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PatientTable />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
