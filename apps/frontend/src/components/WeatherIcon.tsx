import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  Cloudy,
  CloudRain,
  CloudSunRain,
  CloudMoonRain,
  CloudLightning,
  Snowflake,
  CloudFog,
} from "lucide-react";

type WeatherIconProps = {
  iconCode: string;
};

export default function WeatherIcon({ iconCode }: WeatherIconProps) {
  const iconSize = 54;

  const getIconByCode = () => {
    switch (iconCode) {
      case "01d": {
        return <Sun size={iconSize} color="#ffffff" />;
      }
      case "01n": {
        return <Moon size={iconSize} color="#ffffff" />;
      }
      case "02d": {
        return <CloudSun size={iconSize} color="#ffffff" />;
      }
      case "02n": {
        return <CloudMoon size={iconSize} color="#ffffff" />;
      }
      case "03d": {
        return <Cloud size={iconSize} color="#ffffff" />;
      }
      case "03n": {
        return <Cloud size={iconSize} color="#ffffff" />;
      }
      case "04d": {
        return <Cloudy size={iconSize} color="#ffffff" />;
      }
      case "04n": {
        return <Cloudy size={iconSize} color="#FFFFFF" />;
      }
      case "09d": {
        return <CloudRain size={iconSize} color="#ffffff" />;
      }
      case "09n": {
        return <CloudRain size={iconSize} color="#ffffff" />;
      }
      case "10d": {
        return <CloudSunRain size={iconSize} color="#ffffff" />;
      }
      case "10n": {
        return <CloudMoonRain size={iconSize} color="#ffffff" />;
      }
      case "11d": {
        return <CloudLightning size={iconSize} color="#ffffff" />;
      }
      case "11n": {
        return <CloudLightning size={iconSize} color="#ffffff" />;
      }
      case "13d": {
        return <Snowflake size={iconSize} color="#ffffff" />;
      }
      case "13n": {
        return <Snowflake size={iconSize} color="#ffffff" />;
      }
      case "50d": {
        return <CloudFog size={iconSize} color="#ffffff" />;
      }
      case "50n": {
        return <CloudFog size={iconSize} color="#ffffff" />;
      }
    }
  };

  return <div>{getIconByCode()}</div>;
}
