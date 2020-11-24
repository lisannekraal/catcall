import NotFound from './Not-found';
import renderer from 'react-test-renderer';

describe ('Not-Found Tests:', ()=>{

  it('renders correctly', () => {
    const tree = renderer.create(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});