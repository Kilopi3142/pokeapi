import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { getPokemonDetails } from '../store/slices/pokemonSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';

const PokemonDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch: AppDispatch = useDispatch();
  const { pokemonDetail, status } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    if (id) {
      dispatch(getPokemonDetails(id as string));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data
        <p><Link href={`/`}>
              Back to list
            </Link></p>
    </div>
    ;
  }

  return (
    <div>
      
      <h1>Pokemon Detail</h1>
      <div className="container">
      <div className='card'>
      <h2>{pokemonDetail?.name}</h2>
      <img src={pokemonDetail?.sprites?.front_default} alt={pokemonDetail?.name} style={{ width: '100px', height: '100px' }} />
      <p>Height: {pokemonDetail?.height}</p>
      <p>Weight: {pokemonDetail?.weight}</p>
      <p>Experience: {pokemonDetail?.base_experience}</p>

      </div>
            </div>

      <Link href={`/`}>
              Back to list
            </Link>

            
    </div>
  );
};

export default PokemonDetail;
