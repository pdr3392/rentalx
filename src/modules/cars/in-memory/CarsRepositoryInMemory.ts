import { v4 as uuidv4 } from "uuid";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { ICarsRepository } from "../repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id: uuidv4(),
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const foundCar = this.cars.find(
      (car) => car.license_plate === license_plate
    );

    return foundCar;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true
        || (brand && car.brand === brand)
        || (category_id && car.category_id === category_id)
        || (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
