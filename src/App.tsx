import React, { useState, useEffect } from 'react';
import StockList from './components/StockList';
// @ts-ignore
import PublicGoogleSheetsParser from 'public-google-sheets-parser';

const App = () => {
  const [stockList, setStockList] = useState(null);

  function fetchStockData() {

    const parser = new PublicGoogleSheetsParser();
    parser.parse(atob('MWFYem5zOW1ndWNXZjJodjBuT1JuRnFtTjZLdXhObDlGVEZYaklITlllZzQ'))
      .then((res: any) => {
        const data = res.sort((a: any, b: any) => a.id > b.id ? 1 : -1)
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
