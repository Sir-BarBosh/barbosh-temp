async function getSwitchbotTemperature() {
  // When fetching inside a Server Component, we need the absolute URL.
  // Since this runs in Docker, we'll use an environment variable for the base URL.
  // Make sure APP_URL=http://localhost:3000 is in your .env file.
  const res = await fetch(`${process.env.APP_URL}/api/switchbot`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.temperature;
}

async function getOutsideTemperature() {
  const res = await fetch(`${process.env.APP_URL}/api/weather`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.temperature;
}

export default async function Home() {
  // Fetch data in parallel on the server before rendering the page.
  const [temperature, outsideTemperature] = await Promise.all([
    getSwitchbotTemperature(),
    getOutsideTemperature(),
  ]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-custom-green to-custom-blue">
      <div className="p-8 bg-transparent rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-4">Current Temperature</h1>
        <>
          <p className="text-6xl font-bold text-center text-white">
            {temperature ? `${temperature}°C` : 'Error'}
          </p>
          {outsideTemperature !== null ? (
            <p className="text-lg text-center text-white mt-2">
              Outside: {outsideTemperature}°C
            </p>
          ) : (
            <p className="text-lg text-center text-red-400 mt-2">Outside Temp: Error</p>
          )}
        </>
      </div>
    </main>
  );
}
