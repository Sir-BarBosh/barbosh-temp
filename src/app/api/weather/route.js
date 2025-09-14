import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json({ error: 'OpenWeatherMap API key not configured' }, { status: 500 });
  }

  try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${process.env.LOCATION_NAME}&units=metric&appid=${OPENWEATHER_API_KEY}`);
    const data = await res.json();

    if (data.main && data.main.temp) {
      revalidatePath('/api/birmingham-weather');
      return NextResponse.json({ temperature: data.main.temp });
    } else {
      console.error('Error: Birmingham temperature data not found in API response', data);
      return NextResponse.json({ error: 'Failed to fetch Birmingham temperature' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching Birmingham temperature:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
