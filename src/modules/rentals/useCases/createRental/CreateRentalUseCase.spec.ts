import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "Test1",
      fine_amount: 40,
      category_id: "1234",
      brand: "Brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open rental to the same user", async () => {
    const secondCar = await carsRepositoryInMemory.create({
      name: "Second Test",
      description: "Second Car Test",
      daily_rate: 100,
      license_plate: "Test2",
      fine_amount: 40,
      category_id: "1234",
      brand: "Brand",
    });

    const thirdCar = await carsRepositoryInMemory.create({
      name: "Third Test",
      description: "Third Car Test",
      daily_rate: 100,
      license_plate: "Test3",
      fine_amount: 40,
      category_id: "1234",
      brand: "Brand",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: secondCar.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: thirdCar.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError("There's a rental in progress for this user!")
    );
  });

  it("should not be able to create a new rental if there is another open rental to the same car", async () => {
    const fourthCar = await carsRepositoryInMemory.create({
      name: "Fourth Test",
      description: "Fourth Car Test",
      daily_rate: 100,
      license_plate: "Test4",
      fine_amount: 40,
      category_id: "1234",
      brand: "Brand",
    });

    await createRentalUseCase.execute({
      user_id: "123",
      car_id: fourthCar.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: fourthCar.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable."));
  });

  it("should not be able to create a new rental with an invalid return time", async () => {
    const fifthCar = await carsRepositoryInMemory.create({
      name: "Fifth Test",
      description: "Fifth Car Test",
      daily_rate: 100,
      license_plate: "Test5",
      fine_amount: 40,
      category_id: "1234",
      brand: "Brand",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: fifthCar.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
