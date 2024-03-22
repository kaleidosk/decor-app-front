
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const API_URL = import.meta.env.VITE_SERVER_URL;

function ProjectDetailPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isProfessional, setIsProfessional] = useState(false); // Agregar estado para isProfessional

  useEffect(() => {
    axios.get(`${API_URL}/api/projects/${projectId}`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.error('Error fetching project details:', error);
      });
  }, [projectId]);

  useEffect(() => {
    // Verificar si el usuario está logueado y es un profesional
    if (isLoggedIn && user && user.isaprofessional) {
      setIsProfessional(true);
    } else {
      setIsProfessional(false);
    }
  }, [isLoggedIn, user]);

  return (
    <div>
      {project && (
        <div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <img src={project.picture} alt={project.title} />
        </div>
      )}

      {/* Renderizar el botón solo si isLoggedIn es true */}
      {isLoggedIn && (
        <div>
          <button onClick={() => console.log('Sending quotation')}>Send a quotation</button>
        </div>
      )}
    </div>
  );
}

export default ProjectDetailPage;
