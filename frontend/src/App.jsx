import { useState } from "react";
import Login from "../src/components/Login";
import Profile from "./components/Profile";
import Register from '../src/components/Register'


function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <>
        {/* {!usuario ? (
          <Register onRegister={setUsuario} />
        ) : (
          <Profile/>
        )} */}
      {!usuario ? (
        <Login onLogin={setUsuario} />
      ) : (
       <Profile/>
      )}
    </>
  );
}

export default App;
