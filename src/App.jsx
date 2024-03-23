// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import IsAnon from "./components/IsAnon";
// import IsPrivate from "./components/IsPrivate"
// import ProfilePage from "./pages/ProfilePage";
// import EditProfilePage from "./pages/EditProfilePage"
// import CreateProjectPage from "./pages/CreateProjectPage"
// import {Cloudinary} from "@cloudinary/url-gen";
// import {fill} from "@cloudinary/url-gen/actions/resize";


// function App() {
//   const cld = new Cloudinary({
//     cloud: {
//       cloudName: 'ddxvju14s'
//     }})

//   const myImage = cld.image('docs/models'); 

//     const src = myImage.resize(fill().width(250).height(250)).toURL();

// <img alt="models" src={src} />

//   return (
//     <div className="App">

//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
//           <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
//           <Route path="/user/:userId" element={<IsPrivate> <ProfilePage /> </IsPrivate>} /> 
//           <Route path="/user/edit/:userId" element={<IsPrivate> <EditProfilePage/> </IsPrivate>} /> 
//           <Route path="/create-project" element={<CreateProjectPage/>} />
//         </Routes>

//     </div>
//   );
// }

// export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate"
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage"
import CreateProjectPage from "./pages/CreateProjectPage"
import EditProjectPage from "./pages/EditProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import CreateQuotationPage from "./pages/CreateQuotationPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/user/:userId" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route path="/user/edit/:userId" element={<IsPrivate><EditProfilePage /></IsPrivate>} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route path="/edit-project/:projectId" element={<EditProjectPage />} /> 
        <Route path= "/projects/:projectId" element={<ProjectDetailPage/>} />
        <Route path="/projects/:projectId/create-quotation" element={<CreateQuotationPage />} /> 
      </Routes>
    </div>
  );
}

export default App;

          