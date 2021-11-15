import cn from 'classnames';

import './Loader.scss';

type LoaderProps = {
  color?: 'green';
};

export const Loader = ({ color }: LoaderProps) => {
  return (
    <div
      className={cn('loader', {
        'loader--green': color === 'green',
      })}></div>
  );
};
