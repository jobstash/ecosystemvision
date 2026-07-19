import { useParams, useSearchParams } from 'next/navigation';

export const usePillarSearchParams = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const existingSearchParams = Object.fromEntries(searchParams.entries());

  if (typeof params.pillar !== 'string' || typeof params.item !== 'string') {
    return existingSearchParams;
  }

  const pillarKey = params.pillar as string;
  const itemValue = params.item as string;
  const existingPillarValue = searchParams.get(pillarKey);

  const newPillarValue = existingPillarValue
    ? `${itemValue},${existingPillarValue}`
    : itemValue;

  return {
    ...existingSearchParams,
    [pillarKey]: newPillarValue,
  };
};
