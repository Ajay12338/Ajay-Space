let usersUUID = [];
let initialStrings = ["abc", "cdf", "gfg", "xyz"];
export const generateUserUUID = () => {
  let randomNumber = Math.floor(Math.random() * 100000000000000);
  let randomString =
    initialStrings[Math.floor(Math.random() * initialStrings.length)];
  let uuId = randomString + randomNumber;

  while (usersUUID.includes(uuId)) {
    randomNumber = Math.floor(Math.random() * 100000000000000);
    randomString =
      initialStrings[Math.floor(Math.random() * initialStrings.length)];
    uuId = randomString + randomNumber;
  }
  usersUUID.push(uuId);
  return uuId;
};
