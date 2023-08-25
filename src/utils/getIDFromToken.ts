export const getIDFromToken = (req: Express.Request) => {
  const userID = req?.auth?.payload?.sub;
  if (!userID) {
    throw new Error('userID is undefined from access token');
  }
  return userID;
};
