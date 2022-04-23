import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  HistoryProvider,
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
                <HistoryProvider>
                  <App />
                </HistoryProvider>
              </WatchLaterProvider>
            </LikedVideoProvider>
          </PlayListProvider>
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
