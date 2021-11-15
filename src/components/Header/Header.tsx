import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => {
  return (
    <div className='header'>
      <Link to='/' className='header_title'>
        Chuck Norris
      </Link>

      <div className='header__options'>
        <Link className='header__option' to='serch'>
          Search
        </Link>
        <Link className='header__option' to='categories'>
          categories
        </Link>
      </div>
    </div>
  );
};
