import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { Jock } from '../Jock';
import { Loader } from '../Loader';

import './Search.scss';

import { RootState } from '../../app/store';

import { fetchSearchingJocks } from './SearchSlice';

export const Search = () => {
  const dispatch = useDispatch();
  const { jocks, loading, error } = useSelector((state: RootState) => state.search);
  const [inputValue, setInputValue] = useState<string>('');

  const debounceInputValue = useCallback(
    debounce((query: string) => dispatch(fetchSearchingJocks(query)), 400),
    [],
  );

  const handleSearchJocks = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
    debounceInputValue(target.value);
  };

  return (
    <div className='search'>
      <div className='search_field'>
        <label className='search__label' htmlFor='findJock'>
          Find jocks:
          <input
            className='search__input'
            type='text'
            name='findJock'
            value={inputValue}
            onChange={handleSearchJocks}
          />
        </label>

        {loading === 'pending' && <Loader color='green' />}

        {error.status !== 200 && (
          <p className='search__error-message'>{error.violations['search.query']}</p>
        )}
      </div>

      <div className='search__suggestions'>
        {jocks.slice(0, 5).map(({ id, value }: any) => (
          <Jock key={id} text={value} />
        ))}
      </div>
    </div>
  );
};
