import { cn } from "@/lib/utils";

interface AQIIndicatorProps {
  value: number;
  pollutant: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const getAQILevel = (value: number) => {
  if (value <= 50) return { level: "Good", color: "aqi-good", textColor: "text-white" };
  if (value <= 100) return { level: "Moderate", color: "aqi-moderate", textColor: "text-primary" };
  if (value <= 150) return { level: "Unhealthy for Sensitive Groups", color: "aqi-unhealthySensitive", textColor: "text-white" };
  if (value <= 200) return { level: "Unhealthy", color: "aqi-unhealthy", textColor: "text-white" };
  if (value <= 300) return { level: "Very Unhealthy", color: "aqi-veryUnhealthy", textColor: "text-white" };
  return { level: "Hazardous", color: "aqi-hazardous", textColor: "text-white" };
};

export const AQIIndicator = ({ value, pollutant, size = "md", showLabel = true }: AQIIndicatorProps) => {
  const aqi = getAQILevel(value);
  
  const sizeClasses = {
    sm: "w-16 h-16 text-sm",
    md: "w-24 h-24 text-xl",
    lg: "w-32 h-32 text-3xl"
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "rounded-full flex flex-col items-center justify-center font-bold shadow-lg transition-transform hover:scale-105",
          `bg-${aqi.color}`,
          aqi.textColor,
          sizeClasses[size]
        )}
      >
        <span className="text-xs opacity-80">{pollutant}</span>
        <span>{Math.round(value)}</span>
      </div>
      {showLabel && (
        <p className={cn("text-center font-medium", size === "sm" ? "text-xs" : "text-sm")}>
          {aqi.level}
        </p>
      )}
    </div>
  );
};
