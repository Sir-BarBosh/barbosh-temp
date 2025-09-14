import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

let cachedTemperature = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const now = Date.now();

  if (cachedTemperature && now - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json({ temperature: cachedTemperature });
  }

  const token = process.env.SWITCHBOT_TOKEN; 
  const secret = process.env.SWITCHBOT_SECRET; 
  const deviceId = process.env.SWITCHBOT_DEVICE_ID; 

  const t = Date.now();
  const nonce = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  const data = token + t + nonce;
  const sign = crypto.createHmac('sha256', secret).update(Buffer.from(data, 'utf-8')).digest('base64');

  const headers = {
    'Authorization': token,
    'Content-Type': 'application/json',
    't': t,
    'sign': sign,
    'nonce': nonce,
  };

  try {
    const response = await fetch(`https://api.switch-bot.com/v1.1/devices/${deviceId}/status`, { headers });
    const result = await response.json();

    if (result.statusCode === 100) {
      cachedTemperature = result.body.temperature;
      lastFetchTime = now;
      revalidatePath('/api/switchbot');
      return NextResponse.json({ temperature: cachedTemperature });
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}