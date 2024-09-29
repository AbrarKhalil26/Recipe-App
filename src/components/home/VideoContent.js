import React, { useState } from 'react'
import { VideoCard } from '../../components';
import { useQuery } from 'react-query';
import { FetchFromAPI } from '../../redux/FetchAPI';
import Select from "react-select";
import { customStyles } from "../../db/data";

const tagsOptions = [
  { value: "cake", label: "Cake" },
  { value: "cookie", label: "Cookie" },
  { value: "bread", label: "Bread" },
  { value: "pie", label: "Pie" },
  { value: "muffin", label: "Muffin" },
  { value: "brownie", label: "Brownie" },
  { value: "cupcake", label: "Cupcake" },
  { value: "pancake", label: "Pancake" },
  { value: "waffle", label: "Waffle" },
  { value: "donut", label: "Donut" },
];

const VideoContent = () => {
  const [selectedTags, setSelectedTags] = useState(null);
  
  // const data = {}

  const { isLoading, data } = useQuery(["searchData", selectedTags], () =>
    FetchFromAPI(`recipes/list?from=0&size=4&q=${selectedTags && selectedTags.value || ''}`)
  );
  console.log(data)

  if(isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className='p-16 py-20'>
        <div className='flex justify-between items-center mb-10'>
          <div className='text-3xl font-bold'>Watch our videos</div>
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
        
        <div className='myGrid'>
          {data?.results?.slice(0,4).map((item, index) => (
            <VideoCard key={index} data={item}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export default VideoContent
