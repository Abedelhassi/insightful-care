import { Link } from "react-router-dom";
import { Eye, MoreHorizontal } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  addictionType: string;
  riskLevel: "low" | "medium" | "high";
  lastAnalysis: string;
  status: "active" | "monitoring" | "stable";
}

const patients: Patient[] = [
  { id: "P001", name: "John Anderson", addictionType: "Alcohol", riskLevel: "high", lastAnalysis: "2 hours ago", status: "monitoring" },
  { id: "P002", name: "Emily Chen", addictionType: "Opioids", riskLevel: "medium", lastAnalysis: "5 hours ago", status: "active" },
  { id: "P003", name: "Michael Brown", addictionType: "Benzodiazepines", riskLevel: "low", lastAnalysis: "1 day ago", status: "stable" },
  { id: "P004", name: "Sarah Martinez", addictionType: "Cocaine", riskLevel: "medium", lastAnalysis: "3 hours ago", status: "active" },
  { id: "P005", name: "David Wilson", addictionType: "Alcohol", riskLevel: "low", lastAnalysis: "6 hours ago", status: "stable" },
  { id: "P006", name: "Jennifer Taylor", addictionType: "Methamphetamine", riskLevel: "high", lastAnalysis: "30 min ago", status: "monitoring" },
];

const riskBadgeClasses = {
  low: "risk-badge-low",
  medium: "risk-badge-medium",
  high: "risk-badge-high",
};

const statusClasses = {
  active: "bg-medical-blue-light text-medical-blue",
  monitoring: "bg-medical-yellow-light text-medical-yellow",
  stable: "bg-medical-green-light text-medical-green",
};

export function PatientTable() {
  return (
    <div className="medical-card overflow-hidden p-0">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Patient List</h3>
          <p className="text-sm text-muted-foreground">Monitor and manage your patients</p>
        </div>
        <Link to="/patients/new" className="btn-medical">
          Add Patient
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Patient ID</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Patient Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Addiction Type</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk Level</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Analysis</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patients.map((patient, index) => (
              <tr 
                key={patient.id} 
                className="hover:bg-muted/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{patient.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {patient.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{patient.addictionType}</td>
                <td className="px-6 py-4">
                  <span className={riskBadgeClasses[patient.riskLevel]}>
                    {patient.riskLevel.charAt(0).toUpperCase() + patient.riskLevel.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{patient.lastAnalysis}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusClasses[patient.status]}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/patients/${patient.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                    <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
