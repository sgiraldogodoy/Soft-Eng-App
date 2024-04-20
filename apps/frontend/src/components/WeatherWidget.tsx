import { useQuery } from "@tanstack/react-query";
import WeatherIcon from "@/components/WeatherIcon.tsx";

export default function WeatherWidget() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=42.358429&lon=-71.059769&units=imperial&appid=598fea3387a00ad83ff033ab1b1e733d`;

  const fetchWeather = async () => {
    const response = await fetch(url);
    return response.json();
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const capitalizeEachWord = (input: string) => {
    return input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formattedDescription = capitalizeEachWord(data.weather[0].description);
  const iconCode = data.weather[0].icon;

  return (
    <div className="flex items-center gap-5">
      <WeatherIcon iconCode={iconCode} />
      <div className="flex flex-col text-left text-xl text-white">
        {data.main ? <h1>{Math.round(data.main.temp)} ºF</h1> : null}
        <div>{formattedDescription}</div>
        <div className="flex gap-2">
          {data.main ? <h1>H: {Math.round(data.main.temp_min)} ºF</h1> : null}
          {data.main ? <h1>L: {Math.round(data.main.temp_max)} ºF</h1> : null}
        </div>
      </div>
    </div>
  );
}
