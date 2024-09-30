import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import {Home , Recipe, Search, Contact, Signin, Signup, MyFavorite, ForgetPassword, Settings, Profile} from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataFromFirestore, selectIsLoggedIn } from './redux/slice/authSlice';
import './App.css';
import Toast from './components/Toast';

function App() {
  const dispatch = useDispatch();
  const isToastOpen = useSelector((state) => state.global.isToastOpen);
  const toast = useSelector((state) => state.global.toast);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const userEmail = JSON.parse(sessionStorage.getItem('user')).email;
      dispatch(fetchUserDataFromFirestore(userEmail));
    }
  }, [isLoggedIn, dispatch]);

  console.log('ToastOpen', isToastOpen);

  return (
    <Router>
      <div className='@container min-h-screen'>
        {isToastOpen && <Toast type={toast.type} message={toast.message}/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favorite" element={<MyFavorite />} />
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgot-password' element={<ForgetPassword/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
