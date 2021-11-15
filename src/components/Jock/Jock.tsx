import './Jock.scss';

type JockProps = {
  text?: string;
};

export const Jock = ({ text }: JockProps): JSX.Element => (
  <>{text && <div className='jock'>{text}</div>}</>
);
