import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreateQuotationPage = () => {
  const { projectId } = useParams(); 
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Decodificar el token para obtener el ID del usuario
      const decodedToken = parseJwt(storedToken);
      if (decodedToken && decodedToken.userId) {
        setProfessionalId(decodedToken.userId);
      }
    }
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const authToken = localStorage.getItem('authToken');

    axios.post(`${API_URL}/projects/${projectId}/quotations`, {
      content,
      price,
      professionalId
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      console.log(response.data);
      navigate(`/projects/${projectId}`);
    })
    .catch(error => {
      console.error(error);
      setErrorMessage('Error while creating a new quotation');
    });
  };

  return (
    <div>
      <h2>Create Quotation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <button type="submit">Create Quotation</button>

      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CreateQuotationPage;
