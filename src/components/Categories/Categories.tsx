import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Jock } from '../Jock';
import { Loader } from '../Loader';

import './Categories.scss';

import { fetchCategories, fetchJocksByCategory } from './CategoriesSlice';

import { RootState } from '../../app/store';

export const Categories = () => {
  const dispatch = useDispatch();
  const { categories, categoriesLoading, jock, jockLoading } = useSelector(
    (state: RootState) => state.categories,
  );
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleSelectCategory = (index: number) => {
    const activeCategory = categories[index];

    setSelectedCategory(index);
    dispatch(fetchJocksByCategory(activeCategory));
  };

  // fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // fetch a jock when open a paage
  useEffect(() => {
    if (categories.length > 0) {
      const activeCategory = categories[selectedCategory];
      dispatch(fetchJocksByCategory(activeCategory));
    }
  }, [categories]);

  return (
    <div className='categories'>
      <div className='categories__categories'>
        {categoriesLoading === 'pending' && <Loader />}

        {categories.map((category: string, index: number) => (
          <button
            key={category}
            className={cn('categories__category', {
              'categories__category--selected': index === selectedCategory,
            })}
            onClick={() => handleSelectCategory(index)}>
            {category}

            {index === selectedCategory && jockLoading === 'pending' && <Loader />}
          </button>
        ))}
      </div>

      <div className='categories__jock-list'>{jock.value && <Jock text={jock.value} />}</div>
    </div>
  );
};
