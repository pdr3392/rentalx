import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    mailProvider = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "862114",
      email: "dihipala@to.be",
      name: "Lettie Lyons",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("dihipala@to.be");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if users does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("kufwo@wizoli.es")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an user's token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "576440",
      email: "evu@lomi.ca",
      name: "Sarah Arnold",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("evu@lomi.ca");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
