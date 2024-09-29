import React, { useEffect, useState } from "react";
import { PaginatedMeals, SearchResult, SearchHeader } from "../../components";
import { useQuery } from "react-query";
import { FetchFromAPI } from "../../redux/FetchAPI";

const SearchContent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedTags, setSelectedTags] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const { isLoading, data } = useQuery(["searchData", searchValue, selectedTags], () =>
    FetchFromAPI(`recipes/list?from=0&size=100${selectedTags && '&tags=' + selectedTags.value}&q=${searchValue}`)
  );

  useEffect(() => {
    const filtered = data?.results.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchValue, data]);
  // const isLoading = false;

  return (
    <>
      <SearchHeader setSearchValue={setSearchValue} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
      <div className="flex flex-col gap-14 my-6 mt-10">
        <SearchResult isLoading={isLoading} currentItems={currentItems} />
        <PaginatedMeals
          items={filteredItems}
          itemsPerPage={12}
          setCurrentItems={setCurrentItems}
        />
      </div>
    </>
  )
}

export default SearchContent
