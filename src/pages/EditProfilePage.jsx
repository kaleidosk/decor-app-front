import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function EditProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${userId}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        setName(userData.name);
        setCity(userData.city);
        setProfileDescription(userData.profileDescription);
        setImageUrl(userData.picture);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('city', city);
    formData.append('profileDescription', profileDescription);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    axios
      .put(`${API_URL}/api/user/${userId}`, formData)
      .then(() => {
        navigate(`/user/${userId}`);
      })
      .catch((error) => console.log(error));
  };

  const deleteProfile = () => {
    axios
      .delete(`${API_URL}/api/user/${userId}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="EditProfilePage">
      <h3>Edit Profile</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label>Profile Description:</label>
        <textarea
          value={profileDescription}
          onChange={(e) => setProfileDescription(e.target.value)}
        />

        <label>Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageUrl && <img src={imageUrl} alt="Profile" />}
   
        <button type="submit">Update Profile</button>
      </form>

      <button onClick={deleteProfile}>Delete Profile</button>
    </div>
  );
}

export default EditProfilePage;
