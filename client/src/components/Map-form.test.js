import MapForm from './Map-form';
import { render, screen } from '@testing-library/react';

describe ('Map-Form tests:', ()=>{

  test('displays error if api key is not provided', async ()=>{
    delete process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    render(<MapForm/>);
    screen.getByText('No Mapbox access token provided');
  });

});