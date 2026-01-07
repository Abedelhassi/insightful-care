import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor: "blue" | "green" | "yellow" | "red" | "purple";
}

const iconColorClasses = {
  blue: "bg-medical-blue-light text-medical-blue",
  green: "bg-medical-green-light text-medical-green",
  yellow: "bg-medical-yellow-light text-medical-yellow",
  red: "bg-medical-red-light text-medical-red",
  purple: "bg-medical-purple-light text-medical-purple",
};

const changeColorClasses = {
  positive: "text-medical-green",
  negative: "text-medical-red",
  neutral: "text-muted-foreground",
};

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, iconColor }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold text-foreground mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeColorClasses[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColorClasses[iconColor]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
