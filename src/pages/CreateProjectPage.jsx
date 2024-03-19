
import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL

const CreateProjectPage = () => {
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //Formdata to send the info from the 
    const formData = new FormData();
    formData.append('description', description);
    formData.append('picture', picture);

    // Getting the token
    const authToken = localStorage.getItem('authToken');

    // Sending the request with the token
    axios.post(`${API_URL}/api/projects`, formData, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
   
      console.log(response.data);
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
            value={description}
            onChange={handleDescriptionChange}
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
