import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL;

function EditProjectPage() {
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [status, setStatus] = useState(null);
  const [title, setTitle] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        const projectData = response.data;
        setDescription(projectData.description);
        setStatus(projectData.status);
        setPicture(projectData.picture);
      })
      .catch((error) => console.log(error));
  }, [projectId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('description', description);
    formData.append('title', title);
    formData.append('status', status);
    if (picture) {
      formData.append('picture', picture);
    }

    const storedToken = localStorage.getItem('authToken');
    axios.put(`${API_URL}/api/projects/${projectId}`, formData, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
    .then((response) => {
      navigate (`/user/${response.data.userId}`);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const deleteProject = () => {
  axios
    .delete(`${API_URL}/api/projects/${projectId}`)
    .then((response) => {
      console.log(response.data); 
      navigate(`/user/${response.data.userId}`); 
    })
    .catch((error) => {
      console.log(error);
    });
};


  const handleImageChange = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Project Picture:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
   
        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;

