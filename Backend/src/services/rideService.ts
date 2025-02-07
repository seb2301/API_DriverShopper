import { AppDataSource } from "../data-source";
import { Driver } from "../models/Driver";
import { Ride } from "../models/Ride";
import { getRouteDetails } from "../utils/googleMapsHelper";

export const calculateRideEstimate = async (
  customer_id: string,
  origin: string,
  destination: string
) => {
  const routeDetails = await getRouteDetails(origin, destination);
  const driverRepo = AppDataSource.getRepository(Driver);
  const drivers = await driverRepo.find();

  const options = drivers
    .filter((driver) => routeDetails.distance >= driver.minKm)
    .map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.reviewRating,
        comment: driver.reviewComment,
      },
      value: routeDetails.distance * driver.rate,
      photoUrl: driver.photoUrl,
      vehiclePhotoUrl: driver.vehiclePhotoUrl,
    }))
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
  const driverRepo = AppDataSource.getRepository(Driver);
  const driver = await driverRepo.findOne({ where: { id: rideData.driver.id } });
  if (!driver) {
    throw new Error('Motorista não encontrado');
  }
  if (rideData.distance < driver.minKm) {
    throw new Error('Quilometragem inválida para o motorista');
  }

  const rideRepo = AppDataSource.getRepository(Ride);
  const newRide = rideRepo.create({
    customer_id: rideData.customer_id,
    origin: rideData.origin,
    destination: rideData.destination,
    distance: rideData.distance,
    duration: rideData.duration,
    driverId: rideData.driver.id,
    driverName: rideData.driver.name,
    value: rideData.value,
  });
  await rideRepo.save(newRide);
  return { success: true };
};

export const getRideHistory = async (customer_id: string, driver_id?: string) => {
  const rideRepo = AppDataSource.getRepository(Ride);
  const query = rideRepo.createQueryBuilder("ride").where("ride.customer_id = :customer_id", { customer_id });
  if (driver_id) {
    query.andWhere("ride.driverId = :driver_id", { driver_id });
  }
  const rides = await query.orderBy("ride.date", "DESC").getMany();
  return rides;
};
