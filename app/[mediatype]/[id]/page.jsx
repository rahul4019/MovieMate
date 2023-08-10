'use client';

import { useParams } from 'next/navigation';

import DetailsBanner from '@/components/DetailsBanner';
import Cast from '@/components/Cast';
import VideosSection from '@/components/VideosSection';
import Similar from '@/components/Similar';
import Recomendation from '@/components/Recomendation';
import { useEffect, useState } from 'react';
import { Base_URL, headers } from '@/utils/api';

const Page = () => {
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({});
  const [credits, setCredits] = useState({});
  const { mediatype, id } = useParams();

  const getData = async () => {
    try {
      const res = await fetch(Base_URL + `/${mediatype}/${id}/videos`, {
        headers,
      });
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCredits = async () => {
    try {
      const res = await fetch(Base_URL + `/${mediatype}/${id}/credits`, {
        headers,
      });
      const data = await res.json();
      setCredits(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setloading(true);
    getData();
    getCredits();
    setloading(false);
  }, [mediatype, id]);

  return (
    <div>
      {!loading && data.results && (
        <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      )}
      <Cast data={credits?.cast} loading={false} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediatype} id={id} />
      <Recomendation mediaType={mediatype} id={id} />
    </div>
  );
};

export default Page;
