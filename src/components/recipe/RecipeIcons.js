import React, { useEffect } from 'react'
import { GoPlusCircle } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { BsPrinter } from "react-icons/bs";
import ReactToPrint from 'react-to-print';
import { ADD_LIST_CART, REMOVE_LIST_CART, selectListCart, ADD_LOVING_MEAL, REMOVE_LOVING_MEAL, SET_PROFILE_DATA, selectLovingMeals } from '../../redux/slice/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfileToFirestore } from '../../redux/slice/profileFunctions';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../db/config';

const RecipeIcons = ({ printComponent, id }) => {
  const storedUser = JSON.parse(sessionStorage.getItem("user")) || {};
  const lovingMeals  = useSelector(selectLovingMeals);
  const listCart = useSelector(selectListCart);
  const profile = useSelector((state) => state.profile);
  const { userID, ...profileWithoutUserID } = profile;
  const dispatch = useDispatch();


  const handleAddToCollection = () => {
    if (!lovingMeals.includes(id)) {
      const updatedMeals = [...lovingMeals, id];
      dispatch(ADD_LOVING_MEAL(id));
      dispatch(saveProfileToFirestore({ ...profileWithoutUserID, lovingMeals: updatedMeals })); 
    } else {
      const updatedMeals = lovingMeals.filter((meal) => meal !== id);
      dispatch(REMOVE_LOVING_MEAL(id));
      dispatch(saveProfileToFirestore({ ...profileWithoutUserID, lovingMeals: updatedMeals })); 
    }
  }

  const handleAddToCart = () => {
    if (!listCart.includes(id)) {
      const updatedMeals = [...listCart, id];
      dispatch(ADD_LIST_CART(id));
      dispatch(saveProfileToFirestore({ ...profileWithoutUserID, listCart: updatedMeals })); 
    } else {
      const updatedMeals = listCart.filter((meal) => meal !== id);
      dispatch(REMOVE_LIST_CART(id));
      dispatch(saveProfileToFirestore({ ...profileWithoutUserID, listCart: updatedMeals })); 
    }
  }
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const docRef = doc(db, "profiles", storedUser.userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(SET_PROFILE_DATA(docSnap.data())); 
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchProfileData();
  }, [dispatch, storedUser.userID]);

  useEffect(() => {
    dispatch(saveProfileToFirestore(lovingMeals)); 
  }, [lovingMeals, dispatch]);

  const icons = [
    {
      id: 1,
      icon: <GoPlusCircle/>,
      event: handleAddToCollection,
      active: lovingMeals.includes(id)
    },
    {
      id: 2,
      icon: <FiShoppingCart/>,
      event: handleAddToCart,
      active: listCart.includes(id)
    },
    {
      id: 3,
      icon: (
        <ReactToPrint
          trigger={() => <BsPrinter />}
          content={() => printComponent?.current}
        />
      ),
    },
  ];

  return (
    <div className='flex gap-4'>
      {icons.map((item) => (
        <div key={item.id} className='flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer' onClick={item.event}>
          <span className={`text-lg text-gray-400 ${item.active && 'text-orange'}`}>{item.icon}</span>
        </div>
      ))}
    </div>
  )
}

export default RecipeIcons