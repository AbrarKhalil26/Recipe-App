import React from "react";
import { IoIosSearch } from "react-icons/io";
import Select from "react-select";
import { useQuery } from "react-query";
import { FetchFromAPI } from "../../redux/FetchAPI";
import { customStyles } from "../../db/data";

const SearchHeader = ({ setSearchValue, selectedTags, setSelectedTags }) => {
  const { data } = useQuery(["tagesData"], () =>
    FetchFromAPI(`tags/list`)
  );
  const tags = data
    ? [...new Set(data.results.map((item) => item.root_tag_type))]
    : [];
  const tagsOptions = tags.map((item) => ({ value: item, label: item }));

  return (
    <div className="flex justify-between items-center flex-wrap gap-5 relative z-50">
      <div className="relative">
        <IoIosSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-700 text-xl" />
        <input
          type="text"
          placeholder="Search for recipes..."
          className="min-w-56 w-36 @xl:w-96 @4xl:w-[500px] px-10 py-3 text-md bg-stone-100 rounded-md focus:outline-none"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div>
        <Select
          defaultValue={selectedTags}
          onChange={setSelectedTags}
          options={tagsOptions}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "#eee",
              primary: "#eb4a36",
            },
          })}
        />
      </div>
    </div>
  );
};

export default SearchHeader;
