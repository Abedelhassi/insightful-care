import { AlertTriangle, Clock, MessageCircle } from "lucide-react";

interface Alert {
  id: string;
  patientName: string;
  type: string;
  severity: "high" | "medium";
  timestamp: string;
  description: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    patientName: "John Anderson",
    type: "High-Risk Behavior",
    severity: "high",
    timestamp: "10 min ago",
    description: "Detected agitation and potential self-harm behavior patterns",
  },
  {
    id: "2",
    patientName: "Jennifer Taylor",
    type: "High-Risk Behavior",
    severity: "high",
    timestamp: "25 min ago",
    description: "Unusual movement patterns detected - possible fall risk",
  },
  {
    id: "3",
    patientName: "Emily Chen",
    type: "Monitoring Alert",
    severity: "medium",
    timestamp: "1 hour ago",
    description: "Increased restlessness observed during night monitoring",
  },
];

export function AlertsPanel() {
  return (
    <div className="medical-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Recent Alerts</h3>
          <p className="text-sm text-muted-foreground">Real-time monitoring alerts</p>
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          via Telegram
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div 
            key={alert.id}
            className={`p-4 rounded-lg border animate-slide-in ${
              alert.severity === "high" 
                ? "bg-risk-high-bg border-medical-red/20" 
                : "bg-risk-medium-bg border-medical-yellow/20"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                alert.severity === "high" ? "bg-medical-red/20" : "bg-medical-yellow/20"
              }`}>
                <AlertTriangle className={`w-4 h-4 ${
                  alert.severity === "high" ? "text-medical-red" : "text-medical-yellow"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground text-sm">{alert.patientName}</p>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.timestamp}
                  </span>
                </div>
                <p className={`text-xs font-medium mt-0.5 ${
                  alert.severity === "high" ? "text-medical-red" : "text-medical-yellow"
                }`}>
                  {alert.type}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Emergency alerts are sent automatically via Telegram.
      </p>
    </div>
  );
}
