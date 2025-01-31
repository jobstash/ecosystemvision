import { useParams, useSearchParams } from 'next/navigation';

export const usePillarSearchParams = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  if (typeof params.pillar !== 'string' || typeof params.item !== 'string') {
    return {};
  }

  const pillarKey = params.pillar as string;
  const itemValue = params.item as string;
  const existingPillarValue = searchParams.get(pillarKey);

  const newPillarValue = existingPillarValue
    ? `${itemValue},${existingPillarValue}`
    : itemValue;

  return {
    ...Object.fromEntries(searchParams.entries()),
    [pillarKey]: newPillarValue,
  };
};
