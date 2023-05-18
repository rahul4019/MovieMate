'use client';

import React, { useState } from 'react';
import ContentWrapper from './ContentWrapper';
import '../styles/trending.scss';
import SwitchTabs from './SwitchTabs';

import useFetch from '@/hooks/useFetch';
import Carousel from './Carousel';

const Popular = () => {
  const [endpoint, setEndpoint] = useState('movie');

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const handleTabChange = (tab) => {
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What&apos;s popular</span>
        <SwitchTabs
          data={['Movies', 'TV Shows']}
          handleTabChange={handleTabChange}
        />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
