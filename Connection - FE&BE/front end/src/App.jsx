// import { useState } from "react";
// // import "./App.css";

// function App() {
//   const [Data1, SetData1] = useState("");

//   fetch("http://localhost:8000/")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       SetData1(data.msg);
//     });
//   return (<>
//   <h1>{Data1}</h1>
  
//   </>);
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home({ api }) {
  const [data1, setData1] = useState("");

  useEffect(() => {
    fetch(api)
    .then((response) => response.json())
    .then((data) => setData1(data.msg));
  }, [api]);

  return <h3 className="text-center mt-5 pt-5"><span className="text-danger">{data1}</span></h3>;
}

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#">Bootstrap</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-link text-white nav-link" onClick={() => navigate("/")}>Home</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-white nav-link" onClick={() => navigate("/about")}>About</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-white nav-link" onClick={() => navigate("/contact")}>Contact</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home api="http://localhost:8000/" />} />
        <Route path="/about" element={<Home api="http://localhost:8000/about" />} />
        <Route path="/contact" element={<Home api="http://localhost:8000/contact" />} />
      </Routes>
    </Router>
  );
}

export default App;