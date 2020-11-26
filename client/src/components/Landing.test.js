import Landing from './Landing';
import TestRenderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';


describe ('Landing tests:', ()=>{

  test('displays landing page correctly', async ()=>{
    const landing = TestRenderer
      .create(<BrowserRouter><Landing/></BrowserRouter>)
      .toJSON();
    expect(landing).toMatchSnapshot();
  });

});