import axios from 'axios';

export const getRouteDetails = async (origin: string, destination: string) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`
  );

  if (!response.data.routes.length) {
    throw new Error('Rota não encontrada');
  }

  const route = response.data.routes[0];
  const leg = route.legs[0];

  return {
    origin: {
      latitude: leg.start_location.lat,
      longitude: leg.start_location.lng,
    },
    destination: {
      latitude: leg.end_location.lat,
      longitude: leg.end_location.lng,
    },
    distance: leg.distance.value / 1000, // em km
    duration: leg.duration.text,
    routeResponse: response.data,
  };
};