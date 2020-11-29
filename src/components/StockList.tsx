import React from 'react';
import { DataGrid, ColDef, CellParams, RowParams } from '@material-ui/data-grid';

const columns: ColDef[] = [
  { field: 'id', headerName: '순위', width: 60 },
  { field: 'name_ko',
    headerName: '기업',
    width: 140,
    renderCell: (params: CellParams) => (
      <Company name={params.value} logo={params.getValue('logo')} />
    )
  },
  { field: 'currency', headerName: '통화', width: 70 },
  {
    field: 'market_cap_ko',
    headerName: '시총(KRW)',
    description: '실시간 원화 환율 적용',
    width: 150,
    sortable: false,
    valueFormatter: ({value}) => value + ' 조원'
  },
  {
    field: 'market_cap_en',
    headerName: '시총(USD)',
    description: '실시간 달러 환율 적용',
    width: 150,
    sortable: false,
    valueFormatter: ({value}) => value + ' 억달러'
  }
];

function Company(props: any){

  let img = '' + props.logo;
  if (!img.startsWith('http')) {
    img = 'https://' + props.logo + '/favicon.ico';
  }
  return <div><img width="15" src={img} alt={props.name}/> <span> {props.name}</span></div>
};

export default function StockList({rows}: any) {
    const onRowClick = (param: RowParams) => {
      window.open('https://www.google.com/search?q=' + param.getValue('exchange') + ':' + param.getValue('symbol') + '&tbm=fin', 'google_fin');
    }

    return (
      <div style={{ height: 1000, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} onRowClick={onRowClick} hideFooter autoHeight />
      </div>
    )
}
