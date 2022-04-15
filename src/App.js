import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Componets/Header/Header";
import { VideoListing } from "./Pages/VideoListing/VideoListing";

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/videos" element={<VideoListing />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
