import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'

const API_URL = import.meta.env.VITE_SERVER_URL;

function HomePage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/projects`)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  return (
    <div>
      {/* <h1>Home Page</h1> */}
      {projects.map(project => (
        <div key={project._id}>
        <Link to={`/projects/${project._id}`}>
          <h2>{project.title}</h2>
          </Link>
          {project.picture && <img src={project.picture} alt={project.title} />}
        </div>
      ))}
    </div>
  );
}

export default HomePage;
