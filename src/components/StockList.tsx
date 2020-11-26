import React from 'react';
import axios from 'axios';
import { DataGrid, ColDef } from '@material-ui/data-grid';

const columns: ColDef[] = [
    { field: 'id', headerName: '순위', width: 70 },
    { field: 'name_ko', headerName: '기업', width: 160},
    { field: 'currency', headerName: '통화', width: 70 },
    {
      field: 'market_cap_ko',
      headerName: '시총(KRW)',
      width: 150,
      sortable: false,
      valueFormatter: ({value}) => value + ' 조원'
  },
  {
        field: 'market_cap_en',
        headerName: '시총(USD)',
        width: 150,
        sortable: false,
        valueFormatter: ({value}) => value + ' 억달러'
  }
];

export default class StockList extends React.Component {
    state = {
      rows: []
    }
  
    componentDidMount() {
      axios.get(`https://api.fureweb.com/spreadsheets/1aXzns9mgucWf2hv0nORnFqmN6KuxNl9FTFXjIHNYeg4`)
        .then(res => {
          const rows = res.data.data
          .sort((a: any, b: any) => a.id > b.id ? 1 : -1)
          .slice(0, 20);
          this.setState({ rows });
        })
    }
  
    render() {
      return (
        <DataGrid rows={this.state.rows} columns={columns} hideFooter={true} autoHeight={true} />
      )
    }
  }