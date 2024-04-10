import React,{useState,useEffect} from 'react'
import loginnimg from '../assets/loginn.webp'
import { Link,useNavigate } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home({insideRegister}) {
  const[googleDetails,setGoogleDetails]=useState(null)
  const [userDetails,setUserDetails] = useState({
    username:"",password:"",email:""
  })
  const navigate=useNavigate()

  const handleLogin =(e)=>{
    e.preventDefault()
    const {username,password}=userDetails
    if(username&&password){
        navigate('/dashboard')
    }
    else{
        toast.warning("Please fill the form completely!!!")
    }
}

const handleRegister =(e)=>{
  e.preventDefault()
  const {username,password,email}=userDetails
  if(username&&password&&email){
      navigate('/')
      setUserDetails("")
  }
  else{
      toast.warning("Please fill the form completely!!!")
  }
}

  useEffect(()=>{
      if(googleDetails){
          sessionStorage.setItem("user",JSON.stringify(googleDetails))
          toast.success("Login Successfull")
          setTimeout(() => {
              navigate('/Dashboard')
          }, 2000);
      }

  },[googleDetails])
 

  return (
    <>
    <div className='container'>
       <div className='card shadow mt-5'>
          <div className="row">
              <div className="col-lg-5">
                  <img className='img-fluid' height='500px' width='500px'  src={loginnimg} alt="" />
              </div> 
              <div className="col-lg-5">
              
          <h1 style={{fontSize:'40px'}} className='fw-bolder text-dark mt-5'>Welcome <span style={{color:'purple'}}>Back</span></h1>
              <h3 className='me-5 mt-2'style={{width:"70%",color:"purple"}}  >
                Sign  {insideRegister? 'sign up' : 'sign in'}
              </h3>
             { insideRegister && (
             <FloatingLabel
             controlId="floatingInput"
             label="username"
             className="mb-3 mt-3"
           >
             <Form.Control type="username" placeholder="Enter your name" onChange={e=> setUserData
              ({...userData, username: e.target.value})} value={userDetails.username} />
           </FloatingLabel>
             )}


             <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3 mt-3"
      >
        <Form.Control type="email" placeholder="name@example.com" onChange={e=> setUserData
              ({...userData, email: e.target.value})} value={userDetails.email} />
      </FloatingLabel>
      
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" onChange={e=> setUserData
              ({...userData, password: e.target.value})} value={userDetails.password} />
      </FloatingLabel>
           {insideRegister?
           <div>
            <button onClick={handleRegister}  className='btn btn-primary mt-3 ps-5 pe-5'>Sign Up</button>
            <p style={{marginLeft:"150px"}}>Or</p>

            <div className='mt-3 mb-3'>
              <GoogleLogin
               onSuccess={credentialResponse => {
               const result=jwtDecode(credentialResponse.credential)
               setGoogleDetails(result)
               console.log(result);
             }}
               onError={() => {
               console.log('Login Failed');
          }}/>
            </div>

            <p className='mt-3'>Already have an account? Click here to <Link to={'/'} className='text-primary'>Login</Link></p>
            </div>
            :
            <div>
            <button onClick={handleLogin}  className='btn btn-primary mt-3 ps-5 pe-5'>Login</button>
            <p style={{marginLeft:"150px"}}>Or</p>

            <div className='mt-3 mb-3'>
              <GoogleLogin
               onSuccess={credentialResponse => {
               const result=jwtDecode(credentialResponse.credential)
               setGoogleDetails(result)
               console.log(result);
             }}
               onError={() => {
               console.log('Login Failed');
          }}/>
            </div>
            <div className='text-center mt-2'>
                       

                            <p>Don't have an account? <Link to={'/register'} >Sign Up</Link></p>
                        
                    </div>


            
            
            </div>


           }
            

              
              
               {/* <p className='text-center align-items-center'>
                Or
              </p>  */}
              </div>
             

          </div>
       </div>
       <ToastContainer position="top-center" theme="colored" autoClose={3000} />

    </div>
    </>
  )
}

export default Home