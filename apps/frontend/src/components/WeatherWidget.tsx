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

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
