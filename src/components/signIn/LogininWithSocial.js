import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { auth, providerFacebook, providerGoogle, providerGithub, db } from '../../db/config';
import { signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import { useDispatch } from 'react-redux';

const socialIcons = [
  {
    name: 'Facebook',
    icon: <FaFacebookF/>,
    provider: providerFacebook,
    color: '#0953b3',
  },
  {
    name: 'Google',
    icon: <FaGoogle/>,
    provider: providerGoogle,
    color: '#db4437',
  },
  {
    name: 'GitHub',
    icon: <FaGithub/>,
    provider: providerGithub,
    color: '#333',
  },
];

const Div = styled.div`
  color: ${props => props.color};
  border: 1px solid ${props => props.color};
  transition: all 0.3s;

  &:hover {
    color: #fff;
    background: ${props => props.color};
    border: none;
  }
`

const LogininWithSocial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async(provider, providerName) => {
    signInWithPopup(auth, provider).then(async (userCredential) => {
      const user = userCredential.user;
      
      const usersCollection = collection(db, 'users');
      const userQuery = query(usersCollection, where('email', '==', user.email));
      const querySnapshot = await getDocs(userQuery);
  
      if (querySnapshot.empty) {
        // User does not exist in Firestore, create a new document
        const userRef = doc(usersCollection);
        const userData = {
          userID: userRef.id,
          email: user.email,
          userName: user.displayName || '',
          profilePic: user.photoURL || '',
          phone: user.phoneNumber || '',
          country: '',
          address: '',
        };
        await setDoc(userRef, userData);
        dispatch(SET_ACTIVE_USER(userData));
      } else {
        // User exists, use existing data
        const existingUserDoc = querySnapshot.docs[0];
        const existingUserData = existingUserDoc.data();
        dispatch(SET_ACTIVE_USER(existingUserData));
      }
  
      navigate('/');
    }).catch(error => {
      console.log(error.message);
    })
  };

  return (
    <div className='flex justify-center gap-6'>
      {socialIcons.map((icon, index) => (
        <Div
          key={index}
          color={icon.color}
          className='general-icon'
          onClick={() => handleSignIn(icon.provider, icon.name)}
        >
          {icon.icon}
        </Div>
      ))}
    </div>
  );
};

export default LogininWithSocial;
