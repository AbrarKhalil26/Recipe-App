import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";


const PaginatedMeals = ({ items, itemsPerPage, setCurrentItems }) => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);


  useEffect(() => {
    if (items?.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    } else {
      setCurrentItems([]); 
    }
  }, [itemOffset, itemsPerPage, items, setCurrentItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        nextLabel={<MdOutlineKeyboardArrowRight className='text-gray-500'/>}
        previousLabel={<MdOutlineKeyboardArrowLeft className='text-gray-500'/>}

        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        pageClassName="page-item-meals"
        pageLinkClassName="page-link"
        previousClassName='page-item-meals'
        previousLinkClassName="page-link"
        
        nextClassName="page-item-meals"
        nextLinkClassName="page-link"

        breakLabel="..."
        breakClassName="page-item-meals"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active-pagination"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedMeals;
