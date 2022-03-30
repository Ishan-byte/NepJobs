import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Navconfig from './config';
import { Button } from '@material-ui/core';
import {UserContext} from '../Modules/Users/context'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));




function navitems({ navs }) {
  return (navs.map((item, i) => {
    return (<Button
      key={i}
      onClick={(e) => {
        e.preventDefault();
        window.location = item.href;
      }}
    >
      {item.title}
    </Button>
    )
  }))
}

export default function NavBar() {
  const classes = useStyles();
  const { logOut } = useContext(UserContext)
  const list = () => {
    return (<div key={1}>
      {Navconfig.map((navlist, i) => {
        const Guard = navlist.guard;
        const authUsers = navlist.roles || []
        return (
          <Guard key={i} authUsers={authUsers}>
            {navitems({ navs: navlist.navs })}
            {'    '}
          </Guard>
        )
      })}
    </div>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar key={1} position="static">
        <Toolbar key={1} variant="dense">
          {list()}
          <Button
            onClick={(e) => {
              logOut()
            }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
