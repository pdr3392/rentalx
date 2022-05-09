import { createConnection, getConnectionOptions } from "typeorm";

export default async () => {
  const options = await getConnectionOptions();

  Object.assign(options, {
    database: process.env.NODE_ENV === "test" ? "rentalx_test" : "rentalx",
  });

  return createConnection(options);
};
