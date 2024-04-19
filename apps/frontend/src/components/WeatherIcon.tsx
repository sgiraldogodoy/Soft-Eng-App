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
        return <Sun size={iconSize} />;
      }
      case "01n": {
        return <Moon size={iconSize} />;
      }
      case "02d": {
        return <CloudSun size={iconSize} />;
      }
      case "02n": {
        return <CloudMoon size={iconSize} />;
      }
      case "03d": {
        return <Cloud size={iconSize} />;
      }
      case "03n": {
        return <Cloud size={iconSize} />;
      }
      case "04d": {
        return <Cloudy size={iconSize} />;
      }
      case "04n": {
        return <Cloudy size={iconSize} color="#FFFFFF" />;
      }
      case "09d": {
        return <CloudRain size={iconSize} />;
      }
      case "09n": {
        return <CloudRain size={iconSize} />;
      }
      case "10d": {
        return <CloudSunRain size={iconSize} />;
      }
      case "10n": {
        return <CloudMoonRain size={iconSize} />;
      }
      case "11d": {
        return <CloudLightning size={iconSize} />;
      }
      case "11n": {
        return <CloudLightning size={iconSize} />;
      }
      case "13d": {
        return <Snowflake size={iconSize} />;
      }
      case "13n": {
        return <Snowflake size={iconSize} />;
      }
      case "50d": {
        return <CloudFog size={iconSize} />;
      }
      case "50n": {
        return <CloudFog size={iconSize} />;
      }
    }
  };

  return <div>{getIconByCode()}</div>;
}
