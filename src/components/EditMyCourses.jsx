import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';

export default function EditMyCourses(){

    const {id} = useParams();

    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [course_name, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const getCourseData = async () => {
        try {
            axios.get(`http://localhost:80/student-courses-app/api/${id}`)
            .then((response) => {
                console.log('Edit Data'+response.id);
                setCourse(response.data.id);
                setCourseName('Hi');
                setDescription('Something');
                setStartDate('12/04/2024');
                setEndDate('12/08/2024');
                setStatus(1);
                return response.data;
            })
            } catch (error) {
                setError(error);
            } 
      };
  
      useEffect(() => {
        getCourseData();
      }, [])
  
    const handleInputChange = (e, type) => {
        switch(type){
            case "course_name":
                setError("");
                setCourseName(e.target.value);
                if(e.target.value === ""){
                    setError("Email has left blank");
                }
                break;
            case "description":
                setError("");
                setDescription(e.target.value);
                if(e.target.value === ""){
                    setError("Password has left blank");
                }
                break;
            case "start_date":
                setError("");
                setStartDate(e.target.value);
                if(e.target.value === ""){
                    setError("Email has left blank");
                }
                break;
            case "end_date":
                setError("");
                setEndDate(e.target.value);
                if(e.target.value === ""){
                    setError("Password has left blank");
                }
                break;
            case "status":
                setError("");
                setStatus(e.target.value);
                if(e.target.value === ""){
                    setError("Password has left blank");
                }
                break;
            default:
        }
    }
    
    function handleEdit(event){
        event.preventDefault();
        if(course_name !== "" && description !== "" && start_date !== "" && end_date !== ""){
            var params = {
                'request': 'login',
                course_name: course_name,
                description: description,
                start_date: start_date,
                end_date: end_date,
                status: status
            };
            axios.put('http://localhost:80/student-courses-api/',params)
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
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleEdit}>
        <div className="Auth-form-content">
        <div className="text-center mb-2">
            <div className="card-body p-2 text-black">
                <p>
                    {
                        error !== "" ?
                        <div style={{color: '#842029'}}><b>{error}</b></div> :
                        <div style={{color: '#badbcc'}}><b>{msg}</b></div>
                    }
                </p>
            </div>
            </div>
            <h3 className="Auth-form-title">Edit Course Details </h3>
            <div className="form-group mt-3">
            <label>Course Name</label>
            <input
                type="text"
                className="form-control mt-1"
                name="course_name"
                id="course_name"
                onChange={(e) => handleInputChange(e, "course_name")}
            />
            </div>
            <div className="form-group mt-3">
            <label>Description</label>
            <textarea
                className="form-control mt-1"
                name="description"
                id="description"
                onChange={(e) => handleInputChange(e, "description")}
            />
            </div>
            <div className="form-group mt-3">
            <label>Start Date</label>
            <input
                type="date"
                className="form-control mt-1"
                name="start_date"
                id="start_date"
                onChange={(e) => handleInputChange(e, "start_date")}
            />
            </div>
            <div className="form-group mt-3">
            <label>End Date</label>
            <input
                type="date"
                className="form-control mt-1"
                name="end_date"
                id="end_date"
                onChange={(e) => handleInputChange(e, "start_date")}
            />
            </div>
            <div className="form-group mt-3">
            <label>Status</label>
                <select className="" id="dropdown" value={status} onChange={(e) => handleInputChange(e, "status")}>
                    <option value="">Select an option</option>
                    <option>Active</option>
                    <option>Inactive </option>
                </select>
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