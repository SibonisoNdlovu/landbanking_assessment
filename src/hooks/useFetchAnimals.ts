import useSWR from 'swr';
import axios from 'axios';
import { Animal } from 'types/Animal';

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      'X-Api-Key': process.env.REACT_APP_API_NINJAS_API_KEY || '',
    },
  });
  return response.data;
};

const useFetchAnimals = (searchTerm: string | null | undefined) => {
  const shouldFetch = searchTerm && searchTerm.trim() !== '';
  const { data, error } = useSWR<Animal[]>(shouldFetch ? `https://api.api-ninjas.com/v1/animals?name=${searchTerm}` : null, fetcher);

  return {
    animals: data || [],
    loading: !error && !data && shouldFetch,
    error: error ? 'Failed to fetch animals.' : null,
  };
};

export default useFetchAnimals;
