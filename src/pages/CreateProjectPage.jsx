
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa la función navigate

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreateProjectPage = () => {
  const [title, setTitle]=useState ('')
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Obtén la función navigate

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

    // FormData para enviar los datos del formulario y la imagen
    const formData = new FormData();
    formData.append('description', description);
    formData.append('title', title);
    formData.append('picture', picture);

    // Obtener el token del almacenamiento local
    const authToken = localStorage.getItem('authToken');

    // Enviar la solicitud con el token
    axios.post(`${API_URL}/api/projects`, formData, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      // Manejar la respuesta del servidor
      console.log(response.data);
      // Redirigir al usuario a su ProfilePage
      navigate(`/user/${response.data.userId}`); // Redirige a la ruta '/profile'
    })
    .catch(error => {
      // Manejar errores de la solicitud
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
