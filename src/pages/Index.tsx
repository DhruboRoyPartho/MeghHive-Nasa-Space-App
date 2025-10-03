import { useState } from "react";
import { MapView } from "@/components/MapView";
import { ForecastCard } from "@/components/ForecastCard";
import { AlertPanel } from "@/components/AlertPanel";
import { DataSourcePanel } from "@/components/DataSourcePanel";
import { ValidationMetrics } from "@/components/ValidationMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CloudRain, Activity, Bell, Database } from "lucide-react";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number } | null>(null);

  // Example forecast data
  const exampleForecasts = [
    {
      time: "Next 1 hour",
      location: "Los Angeles, CA",
      no2: 45,
      pm25: 68,
      confidence: 0.92,
      sources: ["TEMPO L3", "OpenAQ", "OpenWeatherMap"],
    },
    {
      time: "Next 3 hours",
      location: "Los Angeles, CA",
      no2: 58,
      pm25: 82,
      confidence: 0.87,
      sources: ["TEMPO L3", "Weather Model"],
    },
    {
      time: "Next 6 hours",
      location: "Los Angeles, CA",
      no2: 72,
      pm25: 105,
      confidence: 0.81,
      sources: ["TEMPO L3", "ML Model"],
    },
  ];

  const exampleAlerts = [
    {
      id: "1",
      severity: "warning" as const,
      title: "Elevated PM2.5 Expected",
      message: "PM2.5 forecast to reach 105 (Unhealthy for Sensitive Groups) in 6 hours. Limit strenuous outdoor activity.",
      location: "Los Angeles, CA",
      timestamp: "2025-10-03 14:30 UTC",
    },
    {
      id: "2",
      severity: "info" as const,
      title: "TEMPO Data Updated",
      message: "New TEMPO Level-3 NO₂ granule available. Forecast accuracy improved.",
      location: "North America",
      timestamp: "2025-10-03 14:25 UTC",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <header className="bg-primary/95 backdrop-blur-sm text-primary-foreground shadow-lg sticky top-0 z-50 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CloudRain className="w-8 h-8 text-secondary" />
              <div>
                <h1 className="text-2xl font-bold">MeghHive</h1>
                <p className="text-sm text-primary-foreground/80">
                  NASA Space Apps Challenge 2025
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Real-time Air Quality Forecasting</p>
              <p className="text-xs text-primary-foreground/70">
                Powered by TEMPO Satellite Data
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/95 backdrop-blur-sm shadow-glow border-border/50 h-[500px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary" />
                  Interactive Air Quality Map
                </CardTitle>
                {selectedLocation && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lon.toFixed(4)}
                  </p>
                )}
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                <MapView onLocationSelect={(lat, lon) => setSelectedLocation({ lat, lon })} />
              </CardContent>
            </Card>

            {/* Forecasts */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary-foreground">
                6-Hour Forecast
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exampleForecasts.map((forecast, idx) => (
                  <ForecastCard key={idx} forecast={forecast} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column on large screens */}
          <div className="space-y-6">
            <Tabs defaultValue="alerts" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card/95 backdrop-blur-sm">
                <TabsTrigger value="alerts" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Alerts
                </TabsTrigger>
                <TabsTrigger value="sources" className="gap-2">
                  <Database className="w-4 h-4" />
                  Sources
                </TabsTrigger>
              </TabsList>
              <TabsContent value="alerts" className="mt-4">
                <Card className="bg-gradient-card shadow-card border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Active Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AlertPanel alerts={exampleAlerts} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="sources" className="mt-4">
                <DataSourcePanel />
              </TabsContent>
            </Tabs>

            <ValidationMetrics />
          </div>
        </div>

        {/* Footer Info */}
        <Card className="mt-8 bg-gradient-card shadow-card border-border/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-secondary">3</p>
                <p className="text-sm text-muted-foreground mt-1">Data Sources</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">15 min</p>
                <p className="text-sm text-muted-foreground mt-1">Update Frequency</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">87%</p>
                <p className="text-sm text-muted-foreground mt-1">Forecast Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-primary/95 backdrop-blur-sm text-primary-foreground/70 py-6 mt-12 border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            Data from NASA TEMPO, OpenAQ, and OpenWeatherMap • Real-time forecasts powered by machine learning
          </p>
          <p className="mt-2 text-xs">
            Last updated: {new Date().toLocaleString()} UTC
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
