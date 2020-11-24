import Landing from './Landing';
import { render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

const snap = 

describe ('Landing tests:', ()=>{

  test('displays landing page correctly', async ()=>{
    const landing = TestRenderer
      .create(<BrowserRouter><Landing/></BrowserRouter>)
      .toJSON();
    expect(landing).toMatchSnapshot();
  });

});