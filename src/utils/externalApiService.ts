import axios, { AxiosRequestConfig } from 'axios';

export const callExternalApi = async (config: AxiosRequestConfig) => {
  const response = await axios(config);
  const { data } = response;
  return data;
};
