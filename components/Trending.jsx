'use client';

import React, { useState } from 'react';
import ContentWrapper from './ContentWrapper';
import SwitchTabs from './SwitchTabs';

import useFetch from '@/hooks/useFetch';
import Carousel from './Carousel';

import '../styles/trending.scss';

const Trending = () => {
  const [endpoint, setEndpoint] = useState('day');

  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const handleTabChange = (tab) => {
    setEndpoint(tab === 'Day' ? 'day' : 'week');
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={['Day', 'Week']} handleTabChange={handleTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
