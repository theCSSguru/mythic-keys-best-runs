import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BLIZZ_API_NAMESPACE, BLIZZ_API_WOW } from '../utils/constants';

export const useRoster = () => {
  const { token, guild } = useContext(DataContext);
  const { data, isFetched } = useQuery({
    queryKey: ['rosterData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BLIZZ_API_WOW}/guild/${guild?.realm?.slug}/${guild?.slug}/roster${BLIZZ_API_NAMESPACE}${token}`
      );
      return data;
    }
  });
  const rosterData = data;
  const rosterFetched = isFetched;
  return { rosterData, rosterFetched };
};
