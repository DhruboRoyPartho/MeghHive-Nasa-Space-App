import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, TrendingDown } from "lucide-react";

interface Metric {
  name: string;
  value: number;
  unit: string;
  target: number;
  description: string;
}

export const ValidationMetrics = () => {
  const metrics: Metric[] = [
    {
      name: "RMSE (Root Mean Square Error)",
      value: 8.3,
      unit: "ppb",
      target: 10,
      description: "Model accuracy vs ground stations"
    },
    {
      name: "MAE (Mean Absolute Error)",
      value: 6.1,
      unit: "ppb",
      target: 8,
      description: "Average prediction error"
    },
    {
      name: "Bias Correction",
      value: 2.4,
      unit: "ppb",
      target: 3,
      description: "TEMPO vs ground station offset"
    },
    {
      name: "R² Score",
      value: 0.87,
      unit: "",
      target: 0.80,
      description: "Variance explained by model"
    },
  ];

  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-aqi-good" />
          Validation Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => {
          const isGood = metric.value <= metric.target;
          const percentage = metric.unit === "" 
            ? (metric.value / 1) * 100 
            : ((metric.target - metric.value) / metric.target) * 100;
          
          return (
            <div key={metric.name} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{metric.name}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-secondary">
                    {metric.value}
                    {metric.unit && <span className="text-sm font-normal ml-1">{metric.unit}</span>}
                  </p>
                  {isGood && <TrendingDown className="w-4 h-4 text-aqi-good inline ml-1" />}
                </div>
              </div>
              <Progress 
                value={isGood ? 100 : percentage} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                Target: {metric.target}{metric.unit} 
                {isGood && <span className="text-aqi-good ml-2">✓ Within target</span>}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
