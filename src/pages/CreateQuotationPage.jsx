import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreateQuotationPage = () => {
  const { id } = useParams(); 
  const [professionalId, setProfessionalId] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleProfessionalIdChange = (event) => {
    setProfessionalId(event.target.value);
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
    
    axios.post(`${API_URL}/projects/${id}/quotations`, {
      professionalId,
      content,
      price,
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      console.log(response.data);
      
      navigate(`/projects/${id}`); 
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
          <label>Professional ID:</label>
          <input
            type="text"
            value={professionalId}
            onChange={handleProfessionalIdChange}
          />
        </div>
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
