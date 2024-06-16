import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';

export default function ViewMyCourses(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
 
    useEffect(() => {
    }, [msg]);
  
    const handleInputChange = (e, type) => {
        switch(type){
            case "email":
                setError("");
                setEmail(e.target.value);
                if(e.target.value === ""){
                    setError("Email has left blank");
                }
                break;
            case "password":
                setError("");
                setPassword(e.target.value);
                if(e.target.value === ""){
                    setError("Password has left blank");
                }
                break;
            default:
        }
    }
    
    function afterSubmit(event){
        event.preventDefault();
        if(email !== "" && password !== ""){
            var params = {
                'request': 'login',
                email: email,
                password: password
            };
            axios.post('http://localhost:80/student-courses-app/api/',params)
            .then((response) => {
            }).catch((err) => {
                setError(err);
                console.log(err);
            })
        }
        else{
            alert("Inside");
            setError("All field are required!")
        }
    }

    return(
    <div className="vh-100">
        <nav className="navbar navbar-expand-md navbar-light">
            <div className="container">
              <a className="navbar-brand" href="/">Welcome to High Tech Online Courses Platform</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
            </div>
        </nav>
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={afterSubmit}>
        <div className="Auth-form-content">
        <div className="text-center mb-2">
            <div className="card-body p-4 p-lg-5 text-black">
                <p>
                    {
                        error !== "" ?
                        <div style={{color: '#842029'}}><b>{error}</b></div> :
                        <div style={{color: '#badbcc'}}><b>{msg}</b></div>
                    }
                </p>
            </div>
            <Link to="add/student">
                <button className="btn btn-outline-primary">
                Add User
                </button>
            </Link>
            </div>
            <h3 className="Auth-form-title">Log In </h3>
            <div className="form-group mt-3">
            <label>Student Email Address</label>
            <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                name="email"
                id="email"
                onChange={(e) => handleInputChange(e, "email")}
            />
            </div>
            <div className="form-group mt-3">
            <label>Password</label>
            <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password"
                id="password"
                onChange={(e) => handleInputChange(e, "password")}
            />
            </div>
            <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
            </div>
            </form>
        </div>
    </div>

    );
}