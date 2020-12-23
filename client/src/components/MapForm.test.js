import MapForm from './MapForm';
import { render, screen } from '@testing-library/react';

describe ('MapForm tests:', ()=>{

  test('displays error if api key is not provided', async ()=>{
    delete process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    render(<MapForm/>);
    screen.getByText('No Mapbox access token provided');
  });

});