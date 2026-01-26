# Weather App - React

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. Search for weather by city name or use your current location to get real-time weather data and 5-day forecasts.

## Features

- 🌍 **City Search**: Search for weather information by city name
- 📍 **Geolocation Support**: Automatically fetch weather for your current location
- 📊 **5-Day Forecast**: View detailed weather forecasts for the next 5 days
- 💾 **Local Caching**: Weather data is cached in localStorage for faster access
- 🌡️ **Temperature Units**: Toggle between Celsius and Fahrenheit
- 📱 **Responsive Design**: Beautiful, mobile-friendly UI built with Tailwind CSS
- ⚡ **Fast & Modern**: Built with Vite for optimal performance

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **OpenWeatherMap API** - Weather data

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Task-4---Weather-App-React-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your OpenWeatherMap API key:

```
VITE_API_KEY=your_api_key_here
```

**Note**: You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api). The free tier allows 60 calls per minute.

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### 5. Build for production

```bash
npm run build
```

The production build will be in the `dist` directory.

### 6. Preview production build

```bash
npm run preview
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | Your OpenWeatherMap API key | Yes |

## Project Structure

```
src/
├── components/          # React components
│   ├── Weather.tsx     # Main weather component
│   ├── SearchBar.tsx   # City search input
│   └── DailyCard.tsx   # Forecast card component
├── services/           # API and storage services
│   ├── weatherService.ts    # Weather API calls
│   └── storageService.ts    # LocalStorage operations
├── hooks/              # Custom React hooks
│   └── useWeather.ts   # Weather state management
├── utils/              # Utility functions
│   └── weatherUtils.ts # Weather-related helpers
└── App.tsx             # Root component
```

## Usage

1. **Search by City**: Type a city name in the search bar and press Enter or click the search button
2. **Use Current Location**: Click the location button to get weather for your current position
3. **Toggle Temperature**: Use the temperature toggle to switch between Celsius and Fahrenheit
4. **View Forecast**: The 5-day forecast is displayed automatically when weather data is loaded

## API Information

This app uses the OpenWeatherMap API:
- **Current Weather**: `/data/2.5/weather`
- **5-Day Forecast**: `/data/2.5/forecast`

For more information, visit the [OpenWeatherMap API documentation](https://openweathermap.org/api).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: Geolocation features require HTTPS in production (or localhost for development).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/) (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Changes to build process or auxiliary tools

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and images from the project assets
