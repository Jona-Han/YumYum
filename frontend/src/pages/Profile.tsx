import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import PageLoader from '../components/PageLoader';
import getUser from '../services/userService';

export default function Profile() {
  const { user, getAccessTokenSilently } = useAuth0();
  const { data, isError, isLoading } = useQuery('userProfile', fetchUser(getAccessTokenSilently));

  function fetchUser(getAccessTokenSilently: any) {
    return async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await getUser(accessToken);

      if (!response.data) {
        throw new Error(response.error?.message);
      }

      return response.data;
    };
  }

  if (!user) {
    return <div>User null error</div>;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div>Error fetching profile</div>;
  }

  return (
    <div>
      <h1 id="page-title" className="content__title">
        Profile Page
      </h1>
      <p>{JSON.stringify(data, null, 2)}</p>

      <div>
        <img src={user.picture} alt="Profile" className="profile__avatar" />
        <div>
          <h2>{user.name}</h2>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}
