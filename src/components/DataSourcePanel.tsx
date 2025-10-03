import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Radio, CloudRain, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DataSource {
  name: string;
  type: "satellite" | "ground" | "weather" | "database";
  status: "active" | "delayed" | "offline";
  lastUpdate: string;
  coverage?: string;
}

const sourceIcons = {
  satellite: Satellite,
  ground: Radio,
  weather: CloudRain,
  database: Database,
};

const statusColors = {
  active: "bg-aqi-good text-white",
  delayed: "bg-aqi-moderate text-primary",
  offline: "bg-muted text-muted-foreground",
};

export const DataSourcePanel = () => {
  const sources: DataSource[] = [
    {
      name: "TEMPO L3 NO₂",
      type: "satellite",
      status: "active",
      lastUpdate: "3 min ago",
      coverage: "North America"
    },
    {
      name: "OpenAQ Ground Stations",
      type: "ground",
      status: "active",
      lastUpdate: "5 min ago",
      coverage: "Global"
    },
    {
      name: "OpenWeatherMap",
      type: "weather",
      status: "active",
      lastUpdate: "10 min ago",
      coverage: "Global"
    },
    {
      name: "Time-Series DB",
      type: "database",
      status: "active",
      lastUpdate: "Real-time",
      coverage: "All regions"
    },
  ];

  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Data Sources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sources.map((source) => {
          const Icon = sourceIcons[source.type];
          return (
            <div
              key={source.name}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Icon className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{source.name}</p>
                  <p className="text-xs text-muted-foreground">{source.coverage}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={statusColors[source.status]} variant="secondary">
                  {source.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{source.lastUpdate}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
