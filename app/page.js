'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDataFromApi } from '@/utils/api';
import { getApiConfiguration } from './store/homeSlice';
import HeroBanner from '@/components/HeroBanner';

export default function Home() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    const fetchApiConfig = () => {
      fetchDataFromApi('/configuration').then((res) => {

        const url = {
          backdrop: `${res.images.secure_base_url}original`,
          poster: `${res.images.secure_base_url}original`,
          profile: `${res.images.secure_base_url}original`,
        }

        dispatch(getApiConfiguration(url));
      });
    };
    fetchApiConfig();
  }, []);

  return (
    <div className="homePage">
      <HeroBanner />
      <div style={{height: 1000}}></div>
     </div>
  );
}
