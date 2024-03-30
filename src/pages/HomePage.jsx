
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

const API_URL = import.meta.env.VITE_SERVER_URL;

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/api/projects`)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % 3); 
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="carousel-container">
        <div className="carousel">
          {["/img/casa1.jpeg", "/img/casa2.jpeg", "/img/casa3.jpeg"].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Project ${index + 1}`}
              style={{ display: index === currentImageIndex ? 'block' : 'none',
              width: '150%',
          height: 'auto', }}
            />
          ))}
        </div>
        <p className="carousel-description">
  <span>Discover ideas,</span>
  <span>find professionals,</span>
  <span>request quotes</span>
</p>

      </div>

      <h2 className="pending-projects">Pending Projects</h2>
      <div className="first-projects-container">
      {projects.map(project => (
        <div key={project._id} className="project-container">
        <Link to={`/projects/${project._id}`}>
          <h3>{project.title}</h3>
          </Link>
          {project.picture && <img src={project.picture} alt={project.title} className="project-image"/>}
          
        </div>
        ))}
      </div>
      </div>
  );

}


export default HomePage;

