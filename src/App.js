import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Componets/Header/Header";
import Login from "./Pages/Login/Login";
import { VideoListing } from "./Pages/VideoListing/VideoListing";

import Notify from "./Componets/Notify/Notify";
import UserDetails from "./Pages/UserDetails/UserDetails";
import PrivateRoutes from "./Componets/PrivateRoutes/PrivateRoutes";
import Signup from "./Pages/Signup/Signup";

function App() {
  return (
    <>
      <Header />
      <Notify />
      <div className="main-container">
        <Routes>
          <Route path="/videos" element={<VideoListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user-details"
            element={
              <PrivateRoutes>
                <UserDetails />
              </PrivateRoutes>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
