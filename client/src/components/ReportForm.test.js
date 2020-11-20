import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import ReportForm from './ReportForm';
import { MockedProvider } from '@apollo/client/testing';
import { get } from 'react-hook-form';

// const client = new ApolloClient({
//   uri: process.env.REACT_APP_APOLLO_SERVER,
//   cache: new InMemoryCache({
//     addTypename: false
//   })
// });

describe('form tests', () => {

  // beforeAll(()=>{

  //   render(<ReportForm/>)
  // })

  // afterAll(()=> {
  //   unmount(<ReportForm/>)
  // })

  it('renders without error', async () => {
    const {debug,getByText,getByTestId} = render(
      <MockedProvider >
        <ReportForm />
      </MockedProvider>
    );

    expect(getByTestId('report-form')).toBeInTheDocument();
    expect(getByText('Report a catcall')).toBeInTheDocument();
    expect(getByText('Date of Catcall:')).toBeInTheDocument();
    expect(getByText('Location*:')).toBeInTheDocument();


    debug();
  });

  // test('renders', () => {
  //   const { container } = render(<App/>);
  //   expect(container.textContent)
  //     .toMatch('Hello World');
  // });


  // it('renders without error', async () => {
  //     const {container} = await render(<ReportForm />);
  //   const div = document.createElement('div')
  //   ReactDOM.render(<ReportForm />,div)
  // });

  // it('renders report a cat call', () => {
  //   <ApolloProvider client={client}>
  //     render(<ReportForm />);
  //     expect(screen.getByText(/Alex/i)).toBeInTheDocument();
  // </ApolloProvider>
  // });

})
