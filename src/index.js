import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  LikedVideoProvider,
  PlayListProvider,
  VideoProvider,
  WatchLaterProvider,
} from "./Contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <PlayListProvider>
            <LikedVideoProvider>
              <WatchLaterProvider>
                <App />
              </WatchLaterProvider>
            </LikedVideoProvider>
          </PlayListProvider>
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
