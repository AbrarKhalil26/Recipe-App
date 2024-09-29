import React, { useState } from 'react';
import { dataAccordion } from '../../db/data';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";


const RecipesMenu = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className='sticky top-8 left-0'>
      <h1 className="text-3xl font-semibold mb-6">Recipes</h1>
      {dataAccordion.map((question, index) => (
        <div key={index}>
          <div className="flex justify-between items-center py-2 cursor-pointer" onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
            <h2 className="text-lg font-semibold">{question.title}</h2>
            {activeIndex === index ?
              <FiMinus className="text-xl" />
              :
              <FiPlus className="text-xl" /> 
            }
          </div>
          
          <ul
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? 'max-h-40' : 'max-h-0'
            }`}
          >
            {question.links.map((link, linkIndex) => (
              <li key={linkIndex} className="py-1 text-gray-600 ml-4">
                {link}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RecipesMenu;
