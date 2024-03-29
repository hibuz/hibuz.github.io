import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef, GridCellParams, GridRowParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id',
    headerName: '순위',
    description: 'USD 시가총액 기준 순위',
    width: 62
  },
  { field: 'name_ko',
    headerName: '기업',
    headerAlign: 'center',
    width: 140,
    renderCell: (params: GridCellParams) => (
      <Company name={params.value} logo={params.row.logo} />
    )
  },
  {
    field: 'marketcap_krw',
    headerName: '시가총액(₩)',
    description: '반올림된 USD기준 실시간 원화 환율을 적용 후 반올림',
    width: 140,
    cellClassName: 'align-right',
    sortable: false,
    valueFormatter: ({value}) => Number(value).toLocaleString() + '조원'
  },
  {
    field: 'marketcap_usd',
    headerName: '시가총액($)',
    description: 'USD 통화 종목이 아닌경우 실시간 달러 환율 적용 후 반올림',
    width: 134,
    cellClassName: 'align-right',
    sortable: false,
    valueFormatter: ({value}) =>
      (Number(value) < 10000 ? Number(value).toLocaleString()
        : Math.floor(Number(value)/10000) + '조' + Number(String(value).substr(1)).toLocaleString()) + '억달러'
  },
  { field: 'company', headerName: '영문이름', width: 250 },
  { field: 'price',
    headerName: '주가',
    width: 90,
    cellClassName: 'align-right',
    headerAlign: 'right',
    valueFormatter: ({value}) => Number(value).toLocaleString()
 },
 { field: 'currency', headerName: '통화', width: 65 },
 { field: 'exchange', headerName: '거래소', width: 100 },
];

function Company(props: any){

  let img = '' + props.logo;
  if (!img.startsWith('http')) {
    img = 'https://' + props.logo + '/favicon.ico';
  }
  return <div><img width="15" src={img} alt={props.name}/> <span>{props.name}</span></div>
}

const useStyles = makeStyles({
  root: {
    height: 1000,
    width: '100%',
    '& .align-right': {
      textAlign: 'right',
    },
  },
});

export default function StockList({rows}: any) {

  const classes = useStyles();

  const onRowClick = (param: GridRowParams) => {
    window.open('https://finance.google.com/finance?q=' + param.row.exchange + ':' + param.row.symbol + '&tbm=fin', 'google_fin');
  }

  return (
    <div className={classes.root}>
      <DataGrid rows={rows} columns={columns} onRowClick={onRowClick} hideFooter autoHeight />
    </div>
  )
}
