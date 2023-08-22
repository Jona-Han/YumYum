import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user } = useAuth0();

  if (!user) {
    return <div>User null error</div>;
  }

  return (
    <div>
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
