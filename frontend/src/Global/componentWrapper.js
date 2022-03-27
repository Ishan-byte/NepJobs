import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {}
  }));
  
  ComponentWrapper.propTypes = {
    title: PropTypes.string
  };
export default function ComponentWrapper({children}) {
      const classes = useStyles();

    return ({children})
}
