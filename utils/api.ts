import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchPokemons = async (limit: number, offset: number) => {
  const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const fetchPokemonDetails = async (id: string) => {
  const response = await api.get(`/pokemon/${id}`);
  return response.data;
};


export const fetchPokemonsCount = async () => {
    const response = await api.get(`/pokemon`);
    return response.data.count;
  };
