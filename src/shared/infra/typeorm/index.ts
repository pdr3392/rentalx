import { createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database") => {
  const options = await getConnectionOptions();

  Object.assign(options, {
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    database: process.env.NODE_ENV === "test" ? "rentalx_test" : "rentalx",
  });

  return createConnection(options);
};
