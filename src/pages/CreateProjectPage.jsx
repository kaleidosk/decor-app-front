
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreateProjectPage = () => {
  const [title, setTitle]=useState ('')
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    const formData = new FormData();
    formData.append('description', description);
    formData.append('title', title);
    formData.append('picture', picture);

    // Get the token
    const authToken = localStorage.getItem('authToken');

    // Send the request with the token
    axios.post(`${API_URL}/api/projects`, formData, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      
      console.log(response.data);
      
      navigate(`/user/${response.data.userId}`); // Redirige a la ruta '/profile'
    })
    .catch(error => {
 
      console.error(error);
      setErrorMessage('Error while creating a new project');
    });
  };

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label>Picture:</label>
          <input
            type="file"
            onChange={handlePictureChange}
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CreateProjectPage;
