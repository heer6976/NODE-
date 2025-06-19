import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <h3 className="text-center mt-5 pt-5"><span className="text-danger">Welcome to Home page</span></h3>
      <div className="text-center"> 
      <button className="text-center bg-primary text-white mt-3 ps-4 pe-4 pt-2 pb-2 link-opacity-25-hover border-primary rounded-5" onClick={() => navigate("/create-user")}>Create User</button>
      </div>
    </>
  )
}

function Users({ api }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(api)
    .then((response) => response.json())
    .then((data) => setUsers(data.users));
  }, [api]);

  return (
    <div className="container mt-2">
      <h4 className="text-center mb-4">User's List</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr className="text-center">
            <th>Sr. No.</th>
            <th>ID</th>
            <th>User Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="text-center p-3">{index+1}</td>
              <td className="text-center p-3">{user._id}</td>
              <td className="text-center p-3">{user.username}</td>
              <td className="text-center p-3">{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CreateUser({ api }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, age }),
    });
    if (response.ok) {
      setUsername("");
      setPassword("");
      setAge("");
      navigate("/users");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Create User</button>
        <button className="btn btn-primary ms-3" onClick={() => navigate("/")}>Home</button>
      </form>
    </div>
  );
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
              <button className="btn btn-link text-white nav-link" onClick={() => navigate("/users")}>All-Users</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-white nav-link" onClick={() => navigate("/create-user")}>Create User</button>
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
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users api="http://localhost:8000/user" />} />
        <Route path="/create-user" element={<CreateUser api="http://localhost:8000/user" />} />
      </Routes>
    </Router>
  );
}

export default App;