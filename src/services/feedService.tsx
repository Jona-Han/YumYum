import { callExternalApi } from './external-api.service';

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export default async function getFeed() {
  const config = {
    url: `${apiServerUrl}/posts`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };

  const response = await callExternalApi({ config });

  return {
    data: response.data || null,
    error: response.error,
  };
}