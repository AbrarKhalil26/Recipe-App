import React from "react";
import MealCard from "./MealCard";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_LOVING_MEAL,
  REMOVE_LOVING_MEAL,
  selectLovingMeals,
} from "../../redux/slice/profileSlice";


const SearchResult = ({ isLoading, currentItems }) => {
  const loveingMeals = useSelector(selectLovingMeals);
  const dispath = useDispatch();
  console.log(loveingMeals);

  const handleLike = (id) => {
    if (loveingMeals.includes(id)) {
      dispath(REMOVE_LOVING_MEAL(id));
    } else {
      dispath(ADD_LOVING_MEAL(id));
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="myGrid">
      {currentItems.map((item) => (
        <MealCard
          key={item.id}
          item={item}
          handleLike={handleLike}
          isLiked={loveingMeals.includes(item.id)}
        />
      ))}
    </div>
  );
};

export default SearchResult;
