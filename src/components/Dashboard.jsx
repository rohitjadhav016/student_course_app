import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import Select from 'react-select';
import axios from "axios";
 
export default function Dashboard() {
    const navigate = useNavigate();
    function logoutSubmit(){
        localStorage.setItem("login", "");
        localStorage.setItem("loginStatus", "Logged out successfully!")
        navigate("/");
    }

    const [selectedStatus, setSelectedStatus] = useState(null);

    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState("");

    const handleView = (item) => {
        var params = {
          course_id: item.id
        };
        axios.put('http://localhost:80/student-courses-app/api/',params)
        .then((response) => {
        }).catch((err) => {
            setError(err);
            console.log(err);
        })
    }

    const handleEdit = (item) => {
      var params = {
        course_id: item.id
      };
      axios.put('http://localhost:80/student-courses-app/api/',params)
      .then((response) => {
      }).catch((err) => {
          setError(err);
          console.log(err);
      })
    }

    const handleDelete = (item) => {
      axios.delete(`http://localhost:80/student-courses-app/api/${item.id}`)
      .then((response) => {
        if(response.data.status == 1){
          getCoursesData();
        }else{
          setError('Error deleting record');
        }
      }).catch((err) => {
          setError(err);
          console.log(err);
      })
    }

    const getCoursesData = () => {
      try {
        axios.get('http://localhost:80/student-courses-app/api/')
        .then((response) => {
          setCourses(response.data);
          return response.data;
        })
      } catch (error) {
        setError(error);
      } 
    };

    useEffect(() => {
      getCoursesData();
    }, [])

    const status = Array.from(
      new Set(courses.map((resp) => resp.status))
    )

    const statusOptions = status.map((res) => ({
      value : res,
      label : res == 1 ? 'Active' : 'Inactive'
    }))
    const filteredCourses = selectedStatus ? courses.filter((course) => course.status === selectedStatus.value) : courses; 
    return(
        <div className="main-container">
          <nav className="navbar navbar-expand-md navbar-light w-100 d-flex mb-2">
              <div className="container">
                <a className="navbar-brand" href="/">Welcome to High Tech Online Courses Platform</a>
              </div>
              <div>
              <Select className="w-100"
                options={statusOptions}
                isClearable
                placeholder="Filter By Status"
                onChange={(selectStatus) => setSelectedStatus(selectStatus)}
              />
              </div>
              <button className="btn btn-outline-primary m-4" type="submit" onClick={logoutSubmit}>
                Logout
              </button>

          </nav>
          <div className="card-body p-4 p-lg-5 text-black">
                <p>
                    {
                        error !== null ? 
                        <div style={{color: '#842029'}}><b>{error}</b></div> :
                        <div style={{color: '#000'}}><b>{msg}</b></div>
                    }
                </p>
          </div>
          <section>
            <table className='table table-hover table-responsive table-bordered'>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Course Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {filteredCourses.map((item, key) => (
                    <tr key={key}>
                      <td>{item.course_name}</td>
                      <td>{item.description}</td>  
                      <td>{item.start_date}</td>
                      <td>{item.end_date}</td>
                      <td>{item.status == 1 ? 'Active' : 'Inactive'}</td>
                      <td>
                        <button className="btn btn-primary m-2" onClick={() => handleView(item)}><span className='glyphicon glyphicon-list'></span> Read</button>
                        <Link to={`/edit-course/${item.id}`}><button className="btn btn-info m-2" onClick={() => handleEdit(item)}><span className='glyphicon glyphicon-edit'></span> Edit</button></Link> 
                        {
                          item.status == 1 ? (<button className="btn btn-danger delete-object m-2" onClick={() => handleDelete(item)}><span className='glyphicon glyphicon-remove'></span> Delete</button>)
                          : (<button className="btn btn-danger delete-object m-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Course Inactive" disabled><span className='glyphicon glyphicon-remove' disabled></span> Delete</button>)
                        }
                        
                      </td>
                    </tr>
                ))}
              </tbody>
          </table>
          </section>  
        </div>
    )
}