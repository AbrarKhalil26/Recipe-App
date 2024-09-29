import React, { useEffect } from 'react'
import Layout from '../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { FetchFromAPI } from '../redux/FetchAPI'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../db/config';
import { SET_PROFILE_DATA } from '../redux/slice/profileSlice'
import { MealCard } from '../components'

const Profile = () => {
  const storedUser = JSON.parse(sessionStorage.getItem("user")) || {};
  const profile = useSelector(state => state.profile);
  const { lovingMeals } = profile;
  const dispatch = useDispatch();

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

  console.log(profile)

  const { isLoading, data: favoritesData, isError } = useQuery(
    ["favoritesData", lovingMeals], 
    async () => {
      const favoriteMeals = await Promise.all(
        lovingMeals.map(async (meal) => {
          try {
            const result = await FetchFromAPI(`recipes/get-more-info?id=${meal}`);
            console.log(`Data for meal ${meal}: `, result); // Check the response here
            return result; // Make sure this is the correct data you need
          } catch (error) {
            console.error(`Error fetching meal ${meal}: `, error);
            return null; // Handle failed API call
          }
        })
      );
      return favoriteMeals.filter(meal => meal !== null); // Filter out failed requests
    },
    {
      enabled: !!lovingMeals.length, // Only run the query if lovingMeals has data
    }
  );
  console.log(favoritesData)
  return (
    <Layout>
      <div className='myContainer grid gap-10'>
        <h1 className='text-4xl font-bold'>My Profile</h1>

        <div>
          <h2 className='text-2xl font-bold'>My Favorites</h2>
          <div className='myGrid'>
            {favoritesData && favoritesData.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
              ))}
          </div>
        </div>

        <div>
          <h2 className='text-2xl font-bold'>My Orders</h2>
          <div className='myGrid'>
            {/* Orders */}
          </div>
        </div>

        <div>
          <h2 className='text-2xl font-bold'>My Reviews</h2>
          <div className='myGrid'>
            {/* Reviews */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
