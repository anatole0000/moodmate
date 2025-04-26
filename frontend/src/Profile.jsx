const Profile = ({ user }) => {
    return (
      <div className="container mt-4">
        <h1 className="text-success">Welcome, {user.username}</h1>
      </div>
    );
  };
  
  export default Profile;
  