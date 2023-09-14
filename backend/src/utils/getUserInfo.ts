import { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { callExternalApi } from './externalApiService';

dotenv.config();

export const getIDFromToken = (req: Express.Request) => {
  const userID = req.auth?.payload?.sub;
  if (!userID) {
    throw new Error('userID is undefined from access token');
  }
  return userID;
};

export const getUserInfoFromToken = async (req: Express.Request) => {
  const accessToken = req.auth?.token;
  const config: AxiosRequestConfig = {
    url: `${process.env.AUTH0_DOMAIN}/userinfo`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const result = await callExternalApi(config);
  return result;
};
