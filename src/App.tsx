import React, { useState, useEffect } from 'react';
import StockList from './components/StockList';

const App = () => {
  const [stockList, setStockList] = useState(null);

  function fetchStockData() {
    fetch('https://api.fureweb.com/spreadsheets/1aXzns9mgucWf2hv0nORnFqmN6KuxNl9FTFXjIHNYeg4')
      .then((res) => res.json())
      .then(res => {
        const data = res.data
          .sort((a: any, b: any) => a.id > b.id ? 1 : -1)
          .slice(0, 20);
          setStockList(data)
    });
  }

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <div>
      <h2>전세계 기업 시가총액 Top 20 순위</h2>
      {stockList != null && <StockList rows={stockList}/>}
    </div>
  )
}

export default App;
