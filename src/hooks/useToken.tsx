import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BATTLENET_OAUTH } from '../utils/constants';

export const useToken = () => {
  const { data, isFetched } = useQuery({
    queryKey: ['tokenData'],
    queryFn: async () => {
      const { data } = await axios.post(
        BATTLENET_OAUTH,
        new URLSearchParams({
          grant_type: 'client_credentials'
        }),
        {
          auth: {
            username: import.meta.env.VITE_APP_CLIENT_ID,
            password: import.meta.env.VITE_APP_CLIENT_SECRET
          }
        }
      );
      return data;
    }
  });
  const tokenData = data;
  const tokenFetched = isFetched;
  return { tokenData, tokenFetched };
};
