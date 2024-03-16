import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

function CreateProjectPage() {
  const { userId } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userId: userId,
    picture: null, 
    description: '',
    projectStatus: 'pending',
    quotations: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    const file = files ? files[0] : null;
    setFormData(prevState => ({
      ...prevState,
      [name]: file ? file : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithImage = new FormData(); 
      
      Object.keys(formData).forEach(key => {
        formDataWithImage.append(key, formData[key]);
      });

     
      const response = await axios.post('http://localhost:5005/api/projects', formDataWithImage);
      console.log('Project created successfully:', response.data);
     
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div>
      <h2>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Picture:
          <input type="file" name="picture" onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;



