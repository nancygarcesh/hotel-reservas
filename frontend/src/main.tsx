import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div className="text-primary p-4">
      <h1 className="text-3xl font-heading font-bold">Hotel Reservas Frontend</h1>
      <p>Proyecto inicializado con React + TypeScript + TailwindCSS</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);