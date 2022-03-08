import { createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database") => {
  const options = await getConnectionOptions();

  Object.assign(options, {
    host,
    database: "rentalx",
  });

  return createConnection(options);
};
