import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import {
  Ingredients,
  Loading,
  MealCard,
  RecipeComments,
  RecipeHeader,
  Steps,
} from "../components";
import { useQuery } from "react-query";
import { FetchFromAPI } from "../redux/FetchAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_LOVING_MEAL,
  REMOVE_LOVING_MEAL,
  selectLovingMeals,
} from "../redux/slice/profileSlice";

const Recipe = () => {
  const componentRef = useRef();
  const loveingMeals = useSelector(selectLovingMeals);
  const dispath = useDispatch();
  const { id } = useParams();

  // const recipeData = {}
  // const similarMealsData = {}
  const { isLoading: isLoadingRecipe, data: recipeData } = useQuery(
    ["recipeData", id],
    () => FetchFromAPI(`recipes/get-more-info?id=${id}`)
  );

  const { isLoading: isLoadingSimilar, data: similarMealsData } = useQuery(
    ["similarMeals", id],
    () => FetchFromAPI(`recipes/list-similarities?recipe_id=${id}`)
  );

  const handleLike = (id) => {
    if (loveingMeals.includes(id)) {
      dispath(REMOVE_LOVING_MEAL(id));
    } else {
      dispath(ADD_LOVING_MEAL(id));
    }
  };
  if (isLoadingRecipe || isLoadingSimilar) return <Loading />;

  return (
    <div ref={componentRef}>
      <Layout>
        <div className="myContainer">
          <RecipeHeader data={recipeData} printComponent={componentRef} />
          <div className="grid @4xl:grid-cols-2 @5xl:grid-cols-3 my-16 gap-28">
            <div className="flex flex-col gap-10 @5xl:col-span-2">
              <Steps data={recipeData || []} />
              <RecipeComments comments={recipeData?.facebook_posts || []} />
            </div>
            <div>
              <Ingredients data={recipeData} />
            </div>
          </div>
        </div>

        <div className="bg-neutral-100 @xl:px-20 px-8 py-16">
          <h1 className="text-2xl font-semibold mb-8">
            Other Recipes You May Like
          </h1>
          <div className="myGrid">
            {similarMealsData?.results?.slice(0, 8).map((item) => (
              <MealCard
                key={item.id}
                item={item}
                handleLike={handleLike}
                isLiked={loveingMeals.includes(item.id)}
              />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Recipe;
