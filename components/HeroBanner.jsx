'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import '../styles/heroBanner.scss';
import useFetch from '@/hooks/useFetch';
import ContentWrapper from './ContentWrapper';

const HeroBanner = () => {
  const router = useRouter();
  const { url } = useSelector((state) => state.home);

  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const { data, loading } = useFetch(`/movie/upcoming`);

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Image
            priority={true}
            src={background}
            style={{ objectFit: 'cover' }}
            fill={true}
            alt="background_picture"
          />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subtitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for movies and series..."
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
