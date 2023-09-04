'use client';
import Image from 'next/image';

import ContentWrapper from './ContentWrapper';
import { store } from '@/store';
import { Base_URL, fetchDataFromApi, headers } from '@/utils/api';
import SearchBar from './SearchBar';

import '../styles/heroBanner.scss';
import { useEffect, useState } from 'react';

function HeroBanner() {
  const [backGroundImage, setBackGroundImage] = useState('');

  useEffect(() => {
    const getBackGroundImage = async () => {
      const { url } = store.getState().home;

      try {
        const data = await fetch(Base_URL + '/movie/upcoming', {
          headers,
        });
        const upcomingMovies = await data.json();

        const imageUrl =
          url.backdrop +
          upcomingMovies.results?.[Math.floor(Math.random() * 20)]
            .backdrop_path;
        setBackGroundImage(imageUrl);
      } catch (error) {
        console.log(error);
      }
    };

    getBackGroundImage();
  }, []);

  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        {backGroundImage && (
          <Image
            priority
            src={backGroundImage}
            style={{ objectFit: 'cover' }}
            fill={true}
            alt="background_picture"
          />
        )}
      </div>
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subtitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <SearchBar />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

// export const dynamic = 'force-dynamic';

export default HeroBanner;
