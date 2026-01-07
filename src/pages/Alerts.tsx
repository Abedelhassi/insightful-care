import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertTriangle, Clock, Bell, MessageCircle, CheckCircle2, Filter } from "lucide-react";

interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
  description: string;
  status: "active" | "acknowledged" | "resolved";
}

const alerts: Alert[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "John Anderson",
    type: "High-Risk Behavior",
    severity: "high",
    timestamp: "10 min ago",
    description: "Detected agitation and potential self-harm behavior patterns during video analysis.",
    status: "active",
  },
  {
    id: "A002",
    patientId: "P006",
    patientName: "Jennifer Taylor",
    type: "High-Risk Behavior",
    severity: "high",
    timestamp: "25 min ago",
    description: "Unusual movement patterns detected - possible fall risk identified.",
    status: "active",
  },
  {
    id: "A003",
    patientId: "P002",
    patientName: "Emily Chen",
    type: "Monitoring Alert",
    severity: "medium",
    timestamp: "1 hour ago",
    description: "Increased restlessness observed during night monitoring session.",
    status: "acknowledged",
  },
  {
    id: "A004",
    patientId: "P004",
    patientName: "Sarah Martinez",
    type: "Behavioral Change",
    severity: "medium",
    timestamp: "2 hours ago",
    description: "Significant change in activity patterns compared to baseline.",
    status: "acknowledged",
  },
  {
    id: "A005",
    patientId: "P003",
    patientName: "Michael Brown",
    type: "Routine Check",
    severity: "low",
    timestamp: "5 hours ago",
    description: "Scheduled monitoring check completed. No anomalies detected.",
    status: "resolved",
  },
  {
    id: "A006",
    patientId: "P005",
    patientName: "David Wilson",
    type: "Treatment Reminder",
    severity: "low",
    timestamp: "6 hours ago",
    description: "Medication schedule reminder for patient monitoring.",
    status: "resolved",
  },
];

const severityStyles = {
  high: {
    bg: "bg-risk-high-bg",
    border: "border-medical-red/20",
    icon: "text-risk-high",
    badge: "risk-badge-high",
  },
  medium: {
    bg: "bg-risk-medium-bg",
    border: "border-medical-yellow/20",
    icon: "text-risk-medium",
    badge: "risk-badge-medium",
  },
  low: {
    bg: "bg-risk-low-bg",
    border: "border-medical-green/20",
    icon: "text-risk-low",
    badge: "risk-badge-low",
  },
};

const statusStyles = {
  active: "bg-medical-red-light text-medical-red",
  acknowledged: "bg-medical-yellow-light text-medical-yellow",
  resolved: "bg-medical-green-light text-medical-green",
};

export default function Alerts() {
  return (
    <DashboardLayout 
      title="Alerts & Notifications" 
      subtitle="Monitor and manage patient alerts"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-medical-red-light flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-medical-red" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">2</p>
            <p className="text-sm text-muted-foreground">Active High-Risk</p>
          </div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-medical-yellow-light flex items-center justify-center">
            <Bell className="w-6 h-6 text-medical-yellow" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">2</p>
            <p className="text-sm text-muted-foreground">Acknowledged</p>
          </div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-medical-green-light flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-medical-green" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">2</p>
            <p className="text-sm text-muted-foreground">Resolved Today</p>
          </div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-medical-blue-light flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-medical-blue" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">Telegram</p>
            <p className="text-sm text-muted-foreground">Notifications Active</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="medical-card mb-6 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
              All Alerts
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-accent transition-colors">
              High Risk
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-accent transition-colors">
              Active
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-accent transition-colors">
              Resolved
            </button>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            className={`medical-card p-5 border ${severityStyles[alert.severity].border} animate-fade-in`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${severityStyles[alert.severity].bg}`}>
                <AlertTriangle className={`w-5 h-5 ${severityStyles[alert.severity].icon}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{alert.patientName}</h3>
                    <span className="text-sm text-muted-foreground">#{alert.patientId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[alert.status]}`}>
                      {alert.status}
                    </span>
                    <span className={severityStyles[alert.severity].badge}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                  </div>
                </div>
                
                <p className={`text-sm font-medium mb-1 ${severityStyles[alert.severity].icon}`}>
                  {alert.type}
                </p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.timestamp}
                  </span>
                  
                  {alert.status === "active" && (
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        Acknowledge
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium text-foreground bg-muted hover:bg-accent rounded-lg transition-colors">
                        View Patient
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-medical-blue-light rounded-xl text-center">
        <p className="text-sm text-medical-blue flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Emergency alerts are sent automatically via Telegram for immediate response.
        </p>
      </div>
    </DashboardLayout>
  );
}
