import { Routes, Route, Navigate } from 'react-router-dom';

import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { RandomJock } from './components/RandomJock';
import { Search } from './components/Search';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<RandomJock />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/serch' element={<Search />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
