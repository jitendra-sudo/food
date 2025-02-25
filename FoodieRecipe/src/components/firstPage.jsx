import React, { useState } from 'react';
import axios from 'axios'
import './firstPage.css'
import About from './about'
import Service from './service'
import { useNavigate } from 'react-router-dom';
import Foodie from './Foddie.png'

function FirstPage() {
  const navigate = useNavigate()
  const [authStatus, setAuthStatus] = useState(true); 


  // Login state
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  // Signup state
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async(e) => {
    console.log(e)
    e.preventDefault();
    console.log("hey")
    setLoading(true);
    const login = {email:emailLogin , password:passwordLogin}
     try{
      const response = await axios.post("http://localhost:4000/api/login", login)
      console.log(response.data)
      navigate("/dashboard")
     }catch{
      console.log("not found")
      setLoading(false);
     }
  };

  const handleSignup = () => {
    setAuthStatus(false);
  };

  const handleLoginswitch = () => {
    setAuthStatus(!authStatus);
    setError('');
  };

  const handleSubmitSignup = async(e) => {
    e.preventDefault();
    const data = {name:name , username:username ,  email:email , phone:phone , password:password}
    console.log(data);
    setLoading(true);
     try{
      const res = await axios.post("http://localhost:4000/api/register" , data)
       console.log(res.data)
       navigate("/dashboard")
     }catch{
      console.log("error in api")
     }
    setLoading(false);
  };

  return (
    <div className="App">
    <div className='first-page'>
      <header className='Head-first'>
        <div className='H-header'>
          <img src={Foodie} alt='FoodieRecipe' />
        </div>
        <nav>
          <a href='#recipes'>About</a>
          <a href='#recipe-services'>Services</a>
        </nav>
      </header>
      <main className='first-page-body'>
        <div className='H-heading'>
          <h1>Foodie<strong>Recipe</strong>: Savor the Flavor</h1>
          <h3>A Delicious Journey Through Culinary Delights</h3>
        </div>
        <div className='Home-Auth'>
          {authStatus ? (
            <div className='login'>
              <h1 id="Login-Heading">Login</h1>
              <form onSubmit={handleLogin}>
                <label className="label2" htmlFor="login-email"> Email : </label>
                <input  className="enter20"  type="email"  id="login-email"  placeholder="Enter Your email" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)}  required  />

                <label className="label2"  htmlFor="login-password">  Password : </label>
                <input className="enter20"  type="password" id="login-password"  placeholder="Enter Your password" value={passwordLogin}  onChange={(e) => setPasswordLogin(e.target.value)} required />
                <button type="button" id="forgetbtn" onClick={() => navigate('/resetpassword')} >  Forget Password?  </button>
                  <div className='subbtn'>
                <button className="enter20" id="submit" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
                   </div>
                {error && <p className="error">{error}</p>}

                <div className="create">
                  <label className="label3" htmlFor="sign">  Don't have an account? </label>
                  <button id="sign" type="button" onClick={handleLoginswitch}> Signup </button>
                </div>
              </form>
            </div>
          ) : (
            <div className='H-Signup'>
              <h1 className='Signup-Heading'>Sign Up</h1>
              <form id='form' onSubmit={handleSubmitSignup}>
                <label className='label1' htmlFor="name"> Name </label>
                <input type="text" className='enter' id="name" name="name" placeholder="Enter your name"  value={name} onChange={(e) => setName(e.target.value)}  required  />

                <label className='label1' htmlFor="signup-username">  Username </label>
                <input type="text"  className='enter' id="signup-username" name="username" placeholder="Enter your username" value={username}  onChange={(e) => setUsername(e.target.value)}  required />

                <label className='label1' htmlFor="signup-email">  Email  </label>
                <input   type="email"   className='enter'  id="signup-email"  name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required  />

                <label className='label1' htmlFor="phone">  Phone number </label>
                <input  type="text"  className='enter' id="phone"  name="phone" placeholder="Enter your phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10}  required  />

                <label className='label1' htmlFor="signup-password">  Password  </label>
                <input   type="password"  className='enter' id="signup-password"  name="password" placeholder="Enter your password" value={password}  onChange={(e) => setPassword(e.target.value)}  required />
             <div className='createbtn'>
                <button type="submit" id="aount" disabled={loading}>  {loading ? 'Creating Account...' : 'Create Account'}  </button>
                 </div>

                <div className="loginpage">
                  <label htmlFor="loginswitch">Already have an account?</label>
                  <button onClick={handleLoginswitch} id="loginswitch">  Login </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
</div>

      <About/>
      <Service/>
    </div>
  );
}

export default FirstPage;
