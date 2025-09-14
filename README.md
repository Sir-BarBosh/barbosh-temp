# barbosh-temp

## Description

This is a Next.js application that provides a simple dashboard to display weather information and SwitchBot temperature sensor.

## Configuration

Create a `.env` file in the root of the project and add the following environment variables:

```
APP_URL=http://localhost:3000
SWITCHBOT_TOKEN=
SWITCHBOT_SECRET=
SWITCHBOT_DEVICE_ID=
OPENWEATHER_API_KEY=
LOCATION_NAME=
```

*   `APP_URL`: The URL of the application.
*   `SWITCHBOT_TOKEN`: Your SwitchBot API token.
*   `SWITCHBOT_SECRET`: Your SwitchBot API secret.
*   `SWITCHBOT_DEVICE_ID`: The ID of the SwitchBot device you want to control.
*   `OPENWEATHER_API_KEY`: Your OpenWeather API key.
*   `LOCATION_NAME`: The name of the OpenWeather API location name for which to fetch weather data. 


## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

*   `npm run dev`: Runs the application in development mode.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Runs the linter.

## API Routes

The following API routes are available:

*   `/api/weather`: Fetches weather data from the OpenWeather API for the location specified in the `LOCATION_NAME` environment variable.
*   `/api/blocked`: An endpoint for blocking users or IP addresses.
*   `/api/switchbot`: An endpoint for controlling a SwitchBot device.

## Dependencies

*   [next](https://nextjs.org/): The React framework for production.
*   [react](https://reactjs.org/): A JavaScript library for building user interfaces.
*   [react-dom](https://reactjs.org/docs/react-dom.html): Serves as the entry point to the DOM and server renderers for React.
*   [lru-cache](https.www.npmjs.com/package/lru-cache): A cache that deletes the least-recently-used items.

## Dev Dependencies

*   [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework.
*   [postcss](https://postcss.org/): A tool for transforming CSS with JavaScript.
*   [autoprefixer](https://github.com/postcss/autoprefixer): A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.

## Docker

This project includes a `Dockerfile` and `docker-compose.yml` for containerization.

To build and run the container:

```bash
docker-compose up -d --build
```