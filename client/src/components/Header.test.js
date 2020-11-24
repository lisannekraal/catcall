import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header tests:', ()=>{

  test('displays header correctly (medium size screen)', ()=>{
    const theme = createMuiTheme({ props: {MuiWithWidth: {initialWidth: 'md'}}});
    render( );

    const header = TestRenderer
      .create(<BrowserRouter><MuiThemeProvider theme={theme}><Header/></MuiThemeProvider></BrowserRouter>)
      .toJSON();
    expect(header).toMatchSnapshot();
  });

  test('displays header correctly (small size screen)', ()=>{
    const theme = createMuiTheme({ props: {MuiWithWidth: {initialWidth: 'sm'}}});
    render( );

    const header = TestRenderer
      .create(<BrowserRouter><MuiThemeProvider theme={theme}><Header/></MuiThemeProvider></BrowserRouter>)
      .toJSON();
    expect(header).toMatchSnapshot();
  });

});