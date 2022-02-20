import { useState, useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// @ts-ignore
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
// @ts-ignore
import Spinner from 'react-spinkit';

import StockList from './components/StockList';

const App = () => {

  const [stockList, setStockList] = useState(null);

  function fetchStockData() {

    const parser = new PublicGoogleSheetsParser();

    parser.parse(atob('MWFYem5zOW1ndWNXZjJodjBuT1JuRnFtTjZLdXhObDlGVEZYaklITlllZzQ'))
      .then((res: any) => {
        const data = res.filter((item: any) => item.marketcap_usd)
          .sort((a: any, b: any) => a.marketcap_usd < b.marketcap_usd ? 1 : -1)
          .map((item: any, index: number) => { item.id = index + 1; return item })
          .slice(0, 20);
        setStockList(data)
    });
  }

  useEffect(() => {
    fetchStockData();
  }, []);

  function today() {

    const date = new Date();

    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    return  yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
  }

  return (
    <div>
      <Toolbar disableGutters>
        <Typography variant="h6">
          전세계 기업 시총 TOP20
        </Typography>
        <Typography variant="caption" style={{ marginLeft: 40 }} noWrap>
          {today()} <a href="https://github.com/hibuz/hibuz.github.io/issues/new" style={{textDecoration: 'none'}}>❔</a>
        </Typography>
      </Toolbar>
      {stockList != null ? <StockList rows={stockList}/> : <span style={{ margin: 30 }}>데이터 조회 중... <Spinner name='pacman' color="coral"/></span>} 
    </div>
  )
}

export default App;
