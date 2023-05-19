'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDataFromApi } from '@/utils/api';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import HeroBanner from '@/components/HeroBanner';
import Trending from '@/components/Trending'
import Popular from '@/components/Popular';
import TopRated from '@/components/TopRated';


export default function Home() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url)

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

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

  const genresCall = async () => {
    let promises = []
    let endPoints = ['tv', 'movie']
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises) // returns both the responses at once
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
  }

  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
}
