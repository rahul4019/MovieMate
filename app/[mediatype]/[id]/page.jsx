'use client';

import { useParams } from 'next/navigation';

import useFetch from '@/hooks/useFetch';
import DetailsBanner from '@/components/DetailsBanner';
import Cast from '@/components/Cast';

const page = () => {
  const { mediatype, id } = useParams();
  const { data, loading } = useFetch(`/${mediatype}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediatype}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
    </div>
  );
};

export default page;
