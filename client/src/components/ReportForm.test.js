import { act, cleanup, fireEvent, render, screen, waitFor, userEvent } from '@testing-library/react';
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

jest.mock('../components/Map-form.js', ()=>()=><div id='mockMap'>HelloMap</div>)

describe('form tests', () => {

  beforeEach(() => {
    render(
      <MockedProvider >
        <ReportForm />
      </MockedProvider>
    );
  })

  // afterAll(()=> {
  //   unmount(<ReportForm/>)
  // })

  it('renders all elements without error', async () => {


    expect(screen.getByTestId('report-form')).toBeInTheDocument();
    expect(screen.getByText('Catcall quote*:')).toBeInTheDocument();
    expect(screen.getByText('Report a catcall')).toBeInTheDocument();
    expect(screen.getByText('Your story:')).toBeInTheDocument();
    expect(screen.getByText('Date of Catcall:')).toBeInTheDocument();
    expect(screen.getByText('Location*:')).toBeInTheDocument();
    expect(screen.getByText('Date of Catcall:')).toBeInTheDocument();
    expect(screen.getByText('Location*:')).toBeInTheDocument();
    expect(screen.getByText('Date of Catcall:')).toBeInTheDocument();
    expect(screen.getByTestId('check-box')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit new catcall')).toBeInTheDocument();
  });

   it('Outputs Required if any essential fields are missing', async () => {

    screen.debug()
     const input = screen.getByTestId('catcall-quote');
     const checkbox = screen.getByTestId('catcall-checkbox');
     const submitButton = screen.getByDisplayValue('Submit new catcall');
     let required;

     fireEvent.click(submitButton)

     await waitFor(()=> {
       required = screen.getAllByText('Required')
       expect(required.length).toBeGreaterThanOrEqual(2);
     })
     console.log('Required:',required.length)

     fireEvent.change(checkbox,{target:{value:true}})
     fireEvent.click(submitButton)


     await waitFor(()=> {
       required = screen.getAllByText('Required')
       expect(required.length).toBeLessThan(2);
     })
     console.log('Required:',required.length)

     fireEvent.change(input,{target:{value:'0000'}})
     fireEvent.click(submitButton)

      // await waitFor(()=> {
      //    required = screen.getAllByText('Required')
      //    expect(required.length).toBeLessThan(1);
      //  })
      // console.log('Required:',required.length)


     screen.debug()

   });

  //fireEvent.change(input, { target: { value: '2020-05-12' } })


  // it('Throws error if catcall-quote is missing', async () => {
  //   const {debug,getByText,getByTestId,getByDisplayValue} = render(
  //     <MockedProvider >
  //       <ReportForm />
  //     </MockedProvider>
  //   );
  //   const input = getByTestId('catcall-quote');
  //   const checkbox = getByTestId('catcall-checkbox');
  //   const submitButton = getByDisplayValue('Submit new catcall');
  //   //fireEvent.click(submitButton)
  //   await waitFor()

  //   debug();
  // });

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
