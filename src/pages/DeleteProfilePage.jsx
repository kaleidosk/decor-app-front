import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL;

function DeleteProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/user/${userId}`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    // Navegar a la pagina de perfil si el usuario cancela la eliminación
    navigate(`/user/${userId}`);
  };

  return (
    <div className="DeleteProfilePage">
      <div className="confirmation-modal">
        <p>Eliminando el perfil...</p>
        <div className="confirmation-buttons">
          <button onClick={handleDelete}>yes, delete</button>
          <button onClick={handleCancel}>Cancell</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProfilePage;

