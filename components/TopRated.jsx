'use client';

import React, { useState } from 'react';
import ContentWrapper from './ContentWrapper';
import SwitchTabs from './SwitchTabs';

import useFetch from '@/hooks/useFetch';
import Carousel from './Carousel';

import '../styles/trending.scss';

const TopRated = () => {
  const [endpoint, setEndpoint] = useState('movie');

  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const handleTabChange = (tab) => {
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs
          data={['Movies', 'TV Shows']}
          handleTabChange={handleTabChange}
        />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
