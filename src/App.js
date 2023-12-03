import React from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";

function App() {

  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          return <Route key={index} path={route.path} Component={route.component} />
        })}
        {privateRoutes.map((route, index) => {
          return <Route key={index} path={route.path} Component={route.component} />
        })}
      </Routes>
    </div>
  );
}

export default App;
