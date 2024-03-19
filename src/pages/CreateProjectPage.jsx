import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreateProjectPage = () => {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('picture', imageFile);

      const response = await axios.post(`${API_URL}/api/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Project created:', response.data);
    } catch (error) {
      console.error('Error creating project:', error);
      setErrorMessage('Error creating project. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create New Project</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div>
          <label htmlFor="picture">Picture:</label>
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imageUrl && <img src={imageUrl} alt="Project" />}
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;

