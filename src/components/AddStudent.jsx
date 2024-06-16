import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';


export default function AddStudent ()  {

const navigate = useNavigate();
const[inputs, setInputs] = useState({});
const [error, setError] = useState("");
const [msg, setMsg] = useState("");
const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name] : value}))
}

const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:80/student-courses-app/api/', inputs)
    .then((response) => {
        console.log(response);
        if(response.data){
            setMsg("User Added Successfully");
            setTimeout(function(){
                navigate("/");
            }, 2000);
        }
    })
}

const handleAddUser = () => {
    
}
return (
<div className="Auth-form-container">
    <form className="Auth-form" onSubmit={handleSubmit}>
    <div className="Auth-form-content">
        <div className="card-body p-4 p-lg-5 text-black">
            <p>
                {
                    error !== "" ?
                    <div style={{color: '#842029'}}><b>{error}</b></div> :
                    <div style={{color: '#badbcc'}}><b>{msg}</b></div>
                }
            </p>
        </div>
        <h3 className="Auth-form-title">Student Registration Form</h3>
            <div className="text-center">
                Already Have a Account?{" "}
                <Link to="/">
                    <span className="link-primary" onClick={handleAddUser}>
                        Login Here
                    </span>
                </Link>
            </div>
        
        <div className="form-group mt-3">
        <label>Student Name</label>
        <input
            type="text"
            name="name"
            className="form-control mt-1"
            placeholder="Student Name"
            onChange={handleChange}
        />
        </div>
        <div className="form-group mt-3">
        <label>Student Email Address</label>
        <input
            type="email"
            name="email"
            className="form-control mt-1"
            placeholder="Student Email Address"
            onChange={handleChange}
        />
        </div>
        <div className="form-group mt-3">
        <label>Password</label>
        <input
            type="password"
            name="password"
            className="form-control mt-1"
            placeholder="Password"
            onChange={handleChange}
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
)

}