import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = url => {
  console.count('useFetchRender: ');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError(null);
        setLoaded(true);
      } catch (err) {
        setLoaded(false);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url]);

  return { data, loading, loaded, error };
};

export default useFetch;
