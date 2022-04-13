import React, { useContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { makeStyles } from '@material-ui/core/styles';
import { ApplyContext } from "../Apply/context";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    textField: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      margin: theme.spacing(1, 0.5, 1.5),
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
      },
      '& .MuiInput-underline:before': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  }),
);




function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="medium" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="medium" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}


export default function ApplicationsTable() {
  const { applies, refreshData, refresh } = useContext(ApplyContext);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');

  var columns = [
    { field: "title", flex:1, headerName: "Job Title"},
    { field: "email",flex:1,  padding:"left", headerName: "Applicant Email"},
    { field: "fullname", flex:1,headerName: "Name"},
    { field: "status", flex:1, headerName: "Status"},
    { field: "remarks", flex:1, headerName: "Remarks"},
  ]
  //{ field: "Add", headerName: "Add", width: 200 },
  const theme = createTheme();

  columns.forEach((c) => {
    c.renderCell = (params) => {
      return (
        <ThemeProvider theme={theme}>
          <Typography variant="body1" >{params.value}</Typography>
        </ThemeProvider>
      )
    }
    c.renderHeader = () => {
      return <Typography variant="h6" >{c.headerName}</Typography>
    }
    c.headerAlign='center'
  })

  const [open, setOpen] = useState(false);
  useEffect(() => {
    refreshData();
  }, [refresh,open])

  useEffect(()=>{
    const d = []
    applies.map(item => {
      item.id = item._id;
      item.title = item.job[0].title;
      item.fullname = item.employee[0].fullname
      item.email = item.employee[0].email
      d.push(item)
    })
    setData(d);
  },[applies])

  const [item, setItem] = useState({});

  const handleClose = () => {
    setOpen(!open);
  }

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = applies.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setData(filteredRows);
  };

  const [searchText, setSearchText] = React.useState('');


  return (
    <div style={{ height: 600, width: '100%' }}>
        <Typography variant="h2">Applicants</Typography>
      <DataGrid autoHeight 

      style={{'backgroundColor':'#819180'}}
        components={{ Toolbar: QuickSearchToolbar }}
        onRowDoubleClick={(s) => {
          const i = applies.filter(e => e._id == s.id);
          setItem(i[0]);
          handleClose();
        }} rows={data} columns={columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
      />
    </div>

  );
}