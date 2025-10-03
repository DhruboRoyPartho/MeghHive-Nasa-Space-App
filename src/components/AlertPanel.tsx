import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertData {
  id: string;
  severity: "info" | "warning" | "critical";
  title: string;
  message: string;
  location: string;
  timestamp: string;
}

interface AlertPanelProps {
  alerts: AlertData[];
}

const severityConfig = {
  info: {
    icon: Info,
    className: "border-accent/50 bg-accent/5",
    iconClassName: "text-accent"
  },
  warning: {
    icon: AlertTriangle,
    className: "border-aqi-unhealthySensitive/50 bg-aqi-unhealthySensitive/5",
    iconClassName: "text-aqi-unhealthySensitive"
  },
  critical: {
    icon: Bell,
    className: "border-aqi-veryUnhealthy/50 bg-aqi-veryUnhealthy/5",
    iconClassName: "text-aqi-veryUnhealthy"
  }
};

export const AlertPanel = ({ alerts }: AlertPanelProps) => {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>No active alerts</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const config = severityConfig[alert.severity];
        const Icon = config.icon;
        
        return (
          <Alert key={alert.id} className={cn(config.className, "shadow-sm")}>
            <Icon className={cn("h-5 w-5", config.iconClassName)} />
            <AlertTitle className="font-semibold">{alert.title}</AlertTitle>
            <AlertDescription>
              <p className="mt-1">{alert.message}</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <span>{alert.location}</span> • <span>{alert.timestamp}</span>
              </div>
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
};
