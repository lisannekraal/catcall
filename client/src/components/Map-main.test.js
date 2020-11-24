import MapMain from './Map-main';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';


describe ('MapMain:', ()=>{

  it('MapMain Renders Loading...', () => {
    const tree = renderer.create(<MockedProvider>
      <MapMain/>
    </MockedProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});