import { store } from '@/store';
import { getApiConfiguration, getGenres } from '@/store/homeSlice';

import { fetchDataFromApi } from '@/utils/api';
import HeroBanner from '@/components/HeroBanner';
import Trending from '@/components/Trending';
import Popular from '@/components/Popular';
import TopRated from '@/components/TopRated';

// function for making api calls based on genre
const fetchApiConfig = async () => {
  try {
    const res = await fetchDataFromApi('/configuration');
    const url = {
      backdrop: `${res.images.secure_base_url}original`,
      poster: `${res.images.secure_base_url}original`,
      profile: `${res.images.secure_base_url}original`,
    };
    store.dispatch(getApiConfiguration(url));
  } catch (error) {
    console.log(error);
  }
};

// making calls for all the promises
const genresCall = async () => {
  let allGenres = {};
  let promises = [];
  let endPoints = ['tv', 'movie'];
  endPoints.forEach((url) => {
    promises.push(fetchDataFromApi(`/genre/${url}/list`));
  });

  // returns both the responses at once
  const data = await Promise.all(promises);
  data.map(({ genres }) => {
    return genres.map((item) => (allGenres[item.id] = item));
  });
  store.dispatch(getGenres(allGenres));
};

export default async function Home() {
  await fetchApiConfig();
  await genresCall();

  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      {/* <Popular /> */}
      {/* <TopRated /> */}
    </div>
  );
}
