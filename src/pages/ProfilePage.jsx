import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css'

const API_URL = 'http://localhost:5005';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    // Verify if the userId exists
    if (userId) {
      axios
        .get(`${API_URL}/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
        })
        .catch((error) => console.log(error));
    }
  }, [userId]); //every time that the userID changes

  return (
    <div className="ProfilePage">
      {user && (
        <>
          <h1>Welcome, {user.name}</h1>
          <img src={user.picture} alt={user.name} />
          <p>City: {user.city}</p>
          <p>Description: {user.profileDescription}</p>
          <p>Role: {user.role}</p>
          <Link to='/create-project'>
              <button>Create a new project</button>
              </Link>
          <div className="dropdown">
            <button className="dropbtn">Options</button>
            <div className="dropdown-content">
              <Link to={`/edit-profile/${userId}`}>
                <button>Edit Profile</button>
              </Link>
              <button>Delete Profile</button>
             </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
