import { callExternalApi } from './external-api.service';

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export async function getThreeRandomPosts(accessToken: string) {
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

export async function getUserData(userID: string, accessToken: string) {
    const config = {
        url: `${apiServerUrl}/user/:userID`,
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
