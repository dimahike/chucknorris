import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Jock } from '../Jock';
import { Loader } from '../Loader';

import './RandomJock.scss';

import { fetchRandomJock } from './RandomJockSlice';

import { RootState } from '../../app/store';

import chuckNorrisImage from '../../assets/images/imgbin_chuck-norris-karate-kommandos-png.png';

export const RandomJock = () => {
  const dispatch = useDispatch();
  const { jock, loading, error } = useSelector((state: RootState) => state.randomJock);

  // fetch a random jock for loading a page
  useEffect(() => {
    dispatch(fetchRandomJock());
  }, []);

  return (
    <div className='random-jock'>
      <img src={chuckNorrisImage} alt='Chuck Norris' />
      <div className='random-jock__action'>
        <Jock text={jock.value} />
        <button className='random-jock__button' onClick={() => dispatch(fetchRandomJock())}>
          Chuck Go!
          {loading === 'pending' && <Loader />}
        </button>

        {error.status !== 200 && (
          <p className='random-jock__error-message'>{error.violations['search.query']}</p>
        )}
      </div>
    </div>
  );
};
