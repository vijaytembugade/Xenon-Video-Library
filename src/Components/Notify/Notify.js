import React from "react";
import { Toaster } from "react-hot-toast";
const Notify = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid var(--classic-color)",
            padding: "10px",
            color: "var(--text-color)",
            backgroundColor: "var(--text-color)",
            fontFamily: "Montserrat, sans-serif",
            color: "var(--secondary-color)",
          },
        }}
        position="bottom-right"
        reverseOrder={false}
      />
    </>
  );
};

export default Notify;
