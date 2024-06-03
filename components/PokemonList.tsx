import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { getAllPokemons } from '../store/slices/pokemonSlice';
import Link from 'next/link';

const PokemonList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { pokemons, status } = useSelector((state: RootState) => state.pokemon);
  const limit = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || '10', 10);

  const [currentPage, setCurrentPage] = useState(1);
  const [desiredPage, setDesiredPage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const totalPages = Math.ceil(pokemons.length / limit);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesiredPage(e.target.value);
  };

  const handlePageChange = () => {
    const page = parseInt(desiredPage, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      alert(`Please enter a number between 1 and ${totalPages}`);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  const startIndex = (currentPage - 1) * limit;
  const filteredPokemons = pokemons.filter((pokemon: any) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentPagePokemons = filteredPokemons.slice(startIndex, startIndex + limit);

  return (
    <div>
      <h1>Pokemon List</h1>
      <div className="container">
      <div className='card'>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul>
        {currentPagePokemons.map((pokemon: any) => (
          <li key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button>
        Page {currentPage} / {totalPages}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Go to page"
          value={desiredPage}
          onChange={handlePageInputChange}
        />
        <button onClick={handlePageChange}>Go</button>
      </div>

      </div>
      </div>
    </div>
  );
};

export default PokemonList;
