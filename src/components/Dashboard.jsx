import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import welcomeimg from '../assets/welcome.gif'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const navigate = useNavigate()
  const data = JSON.parse(sessionStorage.getItem("user"))

  const handleLogout = () => {
    toast.warning('Logout successfull')
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }
  return (
    <div className="conatiner">
      <div className='card shadow'>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Button onClick={handleLogout} variant="primary">Logout</Button>
      </Container>
    </Navbar>
    
   <div className='log d-flex flex-column justify-content-center align-items-center' style={{height:"100vh"}}>
   <div className='d-flex align-items-center'>
          <h1 className='me-2 mb-0'>Hii.... {data.name.toUpperCase()}</h1>
        </div>
      <img className='img-fluid me-5 ms-5 ps-5 mt-5 mb-4 ' style={{width:'90%',height:'500px',
      textAlign:'center',alignItems:'center',marginLeft:'100px'}} src={welcomeimg} alt="" />
   </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />

    </div>
  )
}

export default Dashboard