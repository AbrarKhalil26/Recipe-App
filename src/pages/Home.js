import React, { useEffect } from 'react';
import { Header, RecipesMenu, VideoContent, Subscribe, SearchContent } from '../components';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';


const Home = () => {


  return (
    <div>
      <div className='relative min-h-screen'>
        <div className='relative' style={{ zIndex: 2 }}>
          <Navbar isHome="true" />
        </div>
        <div className='absolute top-0 left-0 w-full h-full'>
          <Header/>
        </div>
      </div>

      <div className='m-8 p-8 px-3 @4xl:px-8 relative flex flex-col @5xl:flex-row gap-8'>
        <div className='w-full @2xl:w-96'>
          <RecipesMenu />
        </div>
        <div className='w-full'>
          {/* <SearchContent /> */}
        </div>
      </div>

      <div>
        {/* <VideoContent /> */}
        <Subscribe  />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
