import { useState, createContext, useContext, } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Todo from "./components/todo.jsx";
import Register from "./components/register.jsx";
import "./App.css";


export const IdContext = createContext();

function App() {

    const [id, setId] = useState('');
  

  return (
    <>
      <BrowserRouter>
      <IdContext.Provider value={[id, setId]}>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/todo" element={<Todo />}/>
          <Route path="/register" element={<Register />}/>
            {/* <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          {/* </Route> */}
        </Routes>
        </IdContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
