// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import './ProfilePage.css'

// const API_URL = import.meta.env.VITE_SERVER_URL;

// function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const { userId } = useParams();

//   useEffect(() => {
//     const storedToken = localStorage.getItem('authToken');
    
//     // Verificar si el userId existe
//     if (userId) {
//       axios
//         .get(`${API_URL}/api/user/${userId}`, {
//           headers: { Authorization: `Bearer ${storedToken}` }
//         })
//         .then((response) => {
//           const { user, projects } = response.data;
//           setUser(user);
//           setProjects(projects);
//         })
//         .catch((error) => console.error(error));
//     }
//   }, [userId]); // Se ejecuta cada vez que userId cambia

//   const handleDeleteProject = (projectId) => {
//     const storedToken = localStorage.getItem('authToken');
    
//     axios
//       .delete(`${API_URL}/api/projects/${projectId}`, {
//         headers: { Authorization: `Bearer ${storedToken}` }
//       })
//       .then(() => {
//         // Eliminar el proyecto localmente del estado
//         setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
//       })
//       .catch((error) => {
//         console.error("Error deleting project:", error);
//       });
//   };

//   const handleDeleteProfile = () => {
//     // Lógica para eliminar el perfil del usuario
//     console.log("Deleting user profile");
//   };

//   return (
//     <div className="ProfilePage">
//       {user && (
//         <>
//           <h1>Welcome, {user.name}</h1>
//           <img src={user.picture} alt={user.name} />
//           <p>City: {user.city}</p>
//           <p>Description: {user.profileDescription}</p>
//           <p>Role: {user.role}</p>
//           <Link to='/create-project'>
//             <button>Create a new project</button>
//           </Link>
//           <div className="projects-container">
//             <h2>Projects</h2>
//             {projects.map(project => (
//               <div key={project._id} className="project-item">
//                 <img src={project.picture} alt={project.description} />
//                 <p>Title: {project.title}</p>
//                 <p>Status: {project.projectStatus}</p>
//                 <Link to={`/edit-project/${project._id}`}>
//                   <button>Edit Project</button>
//                 </Link>
//                 <button onClick={() => handleDeleteProject(project._id)}>Delete Project</button>
//               </div>
//             ))}
//           </div>
//           <div className="dropdown">
//             <button className="dropbtn">Options</button>
//             <div className="dropdown-content">
//               <Link to={`/edit-profile/${userId}`}>
//                 <button>Edit Profile</button>
//               </Link>
//               <button onClick={handleDeleteProfile}>Delete Profile</button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default ProfilePage;

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css'

const API_URL = import.meta.env.VITE_SERVER_URL;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    // Verificar si el userId existe
    if (userId) {
      axios
        .get(`${API_URL}/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response) => {
          const { user, projects } = response.data;
          setUser(user);
          setProjects(projects);
        })
        .catch((error) => console.error(error));
    }
  }, [userId]); // Se ejecuta cada vez que userId cambia

  const handleDeleteProject = (projectId) => {
    const storedToken = localStorage.getItem('authToken');
    
    axios
      .delete(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then(() => {
        // Eliminar el proyecto localmente del estado
        setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  const handleDeleteProfile = () => {
    // Lógica para eliminar el perfil del usuario
    console.log("Deleting user profile");
  };

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
          <div className="projects-container">
            <h2>Projects</h2>
            {projects.map(project => (
              <div key={project._id} className="project-item">
                <img src={project.picture} alt={project.description} />
                <p>Title: {project.title}</p>
                <p>Status: {project.projectStatus}</p>
                <Link to={`/edit-project/${project._id}`}>
                  <button>Edit Project</button>
                </Link>
                <button onClick={() => handleDeleteProject(project._id)}>Delete Project</button>
              </div>
            ))}
          </div>
          <div className="dropdown">
            <button className="dropbtn">Options</button>
            <div className="dropdown-content">
              <Link to={`/edit-profile/${userId}`}>
                <button>Edit Profile</button>
              </Link>
              <button onClick={handleDeleteProfile}>Delete Profile</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;

