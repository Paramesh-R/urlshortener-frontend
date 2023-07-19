import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CreateUrl from '../createUrl/CreateUrl';
// import EmptyStateUrl from './EmptyStateUrl';

import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import AppBar from '../../components/Appbar/AppBar';
import ShortUrlDataTable from './ShortUrlDataTable';


const Dashboard = () => {

  const navigate = useNavigate();
  const [showUrlAddView, setShowUrlAddView] = useState(false);
  const [cookies] = useCookies([]);
  const [userEmail, setUserEmail] = useState("");
  function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < (Date.now() / 1000);

  }


  // ------------Validate TOKEN Expiration (USE EFFECT)---------
  useEffect(() => {

    if (cookies.token) {                      // token exists and expired -> SignIn
      if (isTokenExpired(cookies.token)) {
        navigate("/signIn");
      }
      else {
        setUserEmail(jwtDecode(cookies.token).email)
      }
    } else {                                  // token does not exist -> SignIn
      console.log("No Token in Cookies");
      navigate("/signIn");
    }
  }, [cookies.token, navigate])
  // -----------------------------------------------------------





  return (
    <>
      <div className="dashboard">
        <AppBar userEmail={userEmail} />
        {/* <div className="container d-flex align-items-center justify-content-center" style={{ 'minHeight': '50vh' }}>
          <h1 className="display-4">Welcome</h1>
        </div> */}
        {
          !showUrlAddView
          && (<ShortUrlDataTable setShowUrlAddView={setShowUrlAddView} />)
        }
        {
          showUrlAddView &&
          (<CreateUrl setShowUrlAddView={setShowUrlAddView} />)
        }
      </div >
    </>
  )

}

export default Dashboard