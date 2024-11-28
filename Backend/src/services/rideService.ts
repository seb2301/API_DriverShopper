import { getRouteDetails } from '../utils/googleMapsHelper';
import Driver from '../models/driverModel';
import { RideModel } from '../models/rideModel';

export const calculateRideEstimate = async (customer_id: string, origin: string, destination: string) => {
  const routeDetails = await getRouteDetails(origin, destination);
  const drivers = await Driver.find();

  const options = drivers
    .filter((driver) => routeDetails.distance >= driver.minKm)
    .map((driver) => {
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.review.rating,
          comment: driver.review.comment,
        },
        value: routeDetails.distance * driver.rate,
        photoUrl: driver.photoUrl,
        vehiclePhotoUrl: driver.vehiclePhotoUrl
      };
    })
    .sort((a, b) => a.value - b.value);

  return {
    origin: routeDetails.origin,
    destination: routeDetails.destination,
    distance: routeDetails.distance,
    duration: routeDetails.duration,
    options,
    routeResponse: routeDetails.routeResponse,
  };
};

export const confirmRide = async (rideData: any) => {
  const driver = await Driver.findById(rideData.driver.id);
  if (!driver) {
    throw new Error('Motorista não encontrado');
  }
  if (rideData.distance < driver.minKm) {
    throw new Error('Quilometragem inválida para o motorista');
  }

  const ride = new RideModel({
    ...rideData,
    date: new Date(),
  });
  await ride.save();
  return { success: true };
};

export const getRideHistory = async (customer_id: string, driver_id?: string) => {
  const query: any = { customer_id };
  if (driver_id) {
    query['driver.id'] = driver_id;
  }
  const rides = await RideModel.find(query).sort({ date: -1 });
  return rides;
};
