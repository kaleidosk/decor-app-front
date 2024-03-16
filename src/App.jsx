import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate"
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import CreateProjectPage from "./pages/CreateProjectPage"
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";


function App() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'ddxvju14s'
    }})

  const myImage = cld.image('docs/models'); 

    const src = myImage.resize(fill().width(250).height(250)).toURL();

<img alt="models" src={src} />

  return (
    <div className="App">

        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
          <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/user/:userId" element={<IsPrivate> <ProfilePage /> </IsPrivate>} /> 
          <Route path="/edit-profile/:userId" element={<EditProfilePage />} />
          <Route path="/create-project" element={<CreateProjectPage/>} />
        </Routes>

    </div>
  );
}

export default App;













        










          


          