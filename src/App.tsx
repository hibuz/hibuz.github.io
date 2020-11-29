import React from 'react';
import StockList from './components/StockList';

const App = () => {
  return (
    <div>
      <h2>전세계 기업 시가총액 Top 20 순위</h2>
      <StockList/>
    </div>
  )
}

export default App;
