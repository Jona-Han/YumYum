import { callExternalApi } from './external-api.service';

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export default async function getFeed(accessToken: string) {
  const config = {
    url: `${apiServerUrl}/post/random/3`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await callExternalApi({ config });

  return {
    data: response.data || null,
    error: response.error,
  };
}
