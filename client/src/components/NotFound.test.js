import NotFound from './NotFound';
import renderer from 'react-test-renderer';

describe ('NotFound Tests:', ()=>{

  it('renders correctly', () => {
    const tree = renderer.create(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});