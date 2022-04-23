import { matchPath, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Pages/Login/Login";
import { VideoListing } from "./Pages/VideoListing/VideoListing";

import Notify from "./Components/Notify/Notify";
import UserDetails from "./Pages/UserDetails/UserDetails";
import PrivateRoutes from "./Components/PrivateRoutes/PrivateRoutes";
import Signup from "./Pages/Signup/Signup";
import VideoDetails from "./Pages/VideoDetails/VideoDetails";
import PlayList from "./Pages/PlayList/PlayList";
import PlayListDetails from "./Pages/PlayListDetails/PlayListDetails";
import { ScrollToTop } from "./Components/ScrollToTop/ScrollToTop";
import Likes from "./Pages/Likes/Likes";
import WatchLater from "./Pages/WatchLater/WatchLater";
import History from "./Pages/History/History";
import Homepage from "./Pages/Homepage/Homepage";
import Footer from "./Components/Footer/Footer";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <Notify />
      <div className="main-container">
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/videos" element={<VideoListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/videos/:id" element={<VideoDetails />} />
            <Route
              path="/user-details"
              element={
                <PrivateRoutes>
                  <UserDetails />
                </PrivateRoutes>
              }
            />
            <Route
              path="/my-playlist"
              element={
                <PrivateRoutes>
                  <PlayList />
                </PrivateRoutes>
              }
            />
            <Route
              path="/my-playlist/:playListId"
              element={
                <PrivateRoutes>
                  <PlayListDetails />
                </PrivateRoutes>
              }
            />
            <Route
              path="/likes"
              element={
                <PrivateRoutes>
                  <Likes />
                </PrivateRoutes>
              }
            />
            <Route
              path="/watchlater"
              element={
                <PrivateRoutes>
                  <WatchLater />
                </PrivateRoutes>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoutes>
                  <History />
                </PrivateRoutes>
              }
            />
          </Routes>
        </ScrollToTop>
      </div>
      {(matchPath("/", pathname) || matchPath("/videos", pathname)) && (
        <Footer />
      )}
    </>
  );
}

export default App;
