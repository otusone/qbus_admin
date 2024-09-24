import React, { Fragment, useState, useEffect } from 'react'
import Overview from './components/main/Overview/Overview'
import Login from './pages/Login/Login';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigation = useNavigate()
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleResponsiveMenu = () => setMenu(false);
  const handleClickUSer = () => { setOpen(!open) };
  const handleSidebarMemu = () => { setMenu(!menu) };
  const [IsLogin, setIsLogin] = useState<any>();
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [userData, setUserData] = useState<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  };

  const getData = async () => {
    try {
      // const response = await axios.get(`https://qbus.onrender.com/api/v1/user/get`)
      // const data = response.data.userData;
      // setUserData(data);
    }
    catch (err) {
      console.log(err)
    }

  }
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://qbus-71fd8e240bea.herokuapp.com/api/v1/admin/login', inputData);
      const loginedUser = response?.data?.data;
      if (response.status === 200) {
        toast.success("Logined successfully")
        const userToken = loginedUser?.tokens?.[0].token;
        setIsLogin(userToken)
        localStorage.setItem('loginedUser', JSON.stringify(loginedUser));
      }
    }
    catch (err) {
      console.log(err)
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigation('/')
    setIsLogin('');
  };
  useEffect(() => {
    const loginedUserStr: any = localStorage.getItem("loginedUser");
    if (loginedUserStr) {
      const loginedUser = JSON.parse(loginedUserStr);
      const lastToken = loginedUser.token;
      setIsLogin(lastToken)
    }
    getData();
  }, []);


  return (
    <Fragment>
      {IsLogin ?
        <>
          <Overview
            open={open}
            handleLogout={handleLogout}
            handleClick={handleClickUSer}
            menu={menu}
            handleSidebarMemu={handleSidebarMemu}
            handleResponsiveMenu={handleResponsiveMenu}
          />
        </>
        :
        <>
          <Login
            inputData={inputData}
            handleChange={handleChange}
            handleLogin={handleLogin}
          />
        </>
      }
      <ToastContainer />

    </Fragment>
  )
}

export default App