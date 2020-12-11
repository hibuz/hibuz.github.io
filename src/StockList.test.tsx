import React from 'react';
import { render, screen } from '@testing-library/react';
// @ts-ignore
import PublicGoogleSheetsParser from 'public-google-sheets-parser';

import StockList from './components/StockList';

test('renders stock list data grid', async () => {

  const parser = new PublicGoogleSheetsParser();

  const stockList = await parser.parse(atob('MWFYem5zOW1ndWNXZjJodjBuT1JuRnFtTjZLdXhObDlGVEZYaklITlllZzQ'))
    .then((res: any) => {
      const data = res.sort((a: any, b: any) => a.marketcap_usd < b.marketcap_usd ? 1 : -1)
        .map((item, index) => { item.id = index + 1; return item })
        .slice(0, 20);

      data.forEach(item => expect(item.rank).toBe(item.id));
      return data;
  });

  render(<StockList rows={stockList} />);
  const linkElement = screen.getByText(/애플/i);
  expect(linkElement).toBeInTheDocument();

});
