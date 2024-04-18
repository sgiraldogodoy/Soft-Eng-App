import { useQuery } from "@tanstack/react-query";

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

  const iconCode = data.weather[0].icon;
  const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data.main ? <h1>{Math.round(data.main.temp)} ºF</h1> : null}
      {data.weather[0] ? <h1>{data.weather[0].description}</h1> : null}
      {data.main ? <h1>H: {Math.round(data.main.temp_min)} ºF</h1> : null}
      {data.main ? <h1>L: {Math.round(data.main.temp_max)} ºF</h1> : null}
      <img alt="icon" src={iconUrl} />
    </div>
  );
}
