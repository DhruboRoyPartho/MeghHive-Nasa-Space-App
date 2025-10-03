import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AQIIndicator } from "./AQIIndicator";
import { Clock, MapPin, TrendingUp } from "lucide-react";

interface ForecastData {
  time: string;
  location: string;
  no2: number;
  pm25: number;
  confidence: number;
  sources: string[];
}

interface ForecastCardProps {
  forecast: ForecastData;
}

export const ForecastCard = ({ forecast }: ForecastCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-card border-border/50 backdrop-blur-sm hover:shadow-glow transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5 text-secondary" />
          {forecast.time}
        </CardTitle>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {forecast.location}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-around items-center">
          <AQIIndicator value={forecast.no2} pollutant="NO₂" size="md" />
          <AQIIndicator value={forecast.pm25} pollutant="PM2.5" size="md" />
        </div>
        
        <div className="pt-4 border-t border-border/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span>Confidence: {(forecast.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Data Sources:</p>
            <p>{forecast.sources.join(", ")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
