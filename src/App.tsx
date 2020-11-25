import React from 'react';
import StockList from './components/StockList';

const App = () => {
  return (
    <div>
      <h2>Top 20 Companies in the world by Market Cap Today</h2>
      <StockList/>
    </div>
  )
}

export default App;
