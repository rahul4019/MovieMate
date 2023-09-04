import Image from 'next/image';

import ContentWrapper from './ContentWrapper';
import { store } from '@/store';
import { Base_URL, headers } from '@/utils/api';
import SearchBar from './SearchBar';

import '../styles/heroBanner.scss';

const getBackGroundImage = async () => {
  const { url } = store.getState().home;

  try {
    const data = await fetch(Base_URL + '/movie/upcoming', {
      headers,
    });
    const upcomingMovies = await data.json();

    const backGroundImage =
      url.backdrop +
      upcomingMovies.results?.[Math.floor(Math.random() * 20)].backdrop_path;
    return backGroundImage;
  } catch (error) {
    console.log(error);
  }
};

async function HeroBanner() {
  const backGroundImage = await getBackGroundImage();

  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        {backGroundImage && (
          <Image
            priority={true}
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

export const dynamic = 'force-dynamic';

export default HeroBanner;
