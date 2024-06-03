import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemons, fetchPokemonDetails, fetchPokemonsCount } from '../../utils/api';

interface PokemonState {
  pokemons: any[];
  pokemonDetail: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PokemonState = {
  pokemons: [],
  pokemonDetail: null,
  status: 'idle',
};

export const getAllPokemons = createAsyncThunk(
  'pokemon/getAllPokemons',
  async () => {
    const countResponse = await fetchPokemonsCount();
    const totalCount = countResponse;
    const response = await fetchPokemons(totalCount, 0); // Fetch all Pokémon at once

    // Assign unique IDs to each Pokémon
    const pokemonsWithIds = response.results.map((pokemon: any, index: number) => ({
      ...pokemon,
      id: index + 1 // Assuming IDs start from 1
    }));

    // Sort both Pokémon and IDs together
    const sortedPokemons = pokemonsWithIds.sort((a: any, b: any) => a.name.localeCompare(b.name));

    return sortedPokemons;
  }
);



export const getPokemonDetails = createAsyncThunk(
  'pokemon/getPokemonDetails',
  async (id: string) => {
    const response = await fetchPokemonDetails(id);
    return response;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemons = action.payload;
      })
      .addCase(getAllPokemons.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getPokemonDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPokemonDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemonDetail = action.payload;
      })
      .addCase(getPokemonDetails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default pokemonSlice.reducer;
