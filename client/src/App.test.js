import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe ('Routing tests:', () => {

  beforeEach(() => {
    render(<App />, { wrapper: MemoryRouter })
    fireEvent.click(screen.getByAltText('logo'));
    const landing = screen.getByTestId("landing");
    expect(landing).toBeInTheDocument();
  });

  test('view catcalls button redirects to map-main', async () => {
    const viewCatcalls = screen.getByText('View Catcalls of Amsterdam');
    expect(viewCatcalls).toBeInTheDocument();
    fireEvent.click(viewCatcalls);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(()=>{
      expect(screen.getByTestId("map-main")).toBeInTheDocument();
    });
  });

  test('report new catcall button (landing) redirects to report-form', async () => {

    const { getByText } = within(screen.getByTestId('landing'))
    const reportCatcall = getByText('Report a new catcall');
    expect(reportCatcall).toBeInTheDocument();
    fireEvent.click(reportCatcall);

    await waitFor(()=>{
      expect(screen.getByTestId("report-form")).toBeInTheDocument();
    });
  });

  test('navbar about stays on landing page', async () => {

    const { getByText } = within(screen.getByTestId('navbar'))
    const about = getByText(/ABOUT/i);
    expect(about).toBeInTheDocument();
    fireEvent.click(about);

    await waitFor(()=>{
      expect(screen.getByTestId("landing")).toBeInTheDocument();
    });
  });

  test('navbar map redirects to map-main', async () => {

    const { getByText } = within(screen.getByTestId('navbar'))

    const map = getByText(/MAP/i);
    expect(map).toBeInTheDocument();
    fireEvent.click(map);

    await waitFor(()=>{
      expect(screen.getByTestId("map-main")).toBeInTheDocument();
    });
  });

  test('navbar moderator redirects to dashboard', async () => {

    const { getByText } = within(screen.getByTestId('navbar'))

    const dashboard = getByText(/MODERATOR/i);
    expect(dashboard).toBeInTheDocument();
    fireEvent.click(dashboard);

    expect(screen.getByDisplayValue(/Log In/i)).toBeInTheDocument();
  });

  // test('navbar report new catcall redirects to report-form', async () => {

  //   const { getByText } = within(screen.getByTestId('navbar'))
  //   const reportCatcall = getByText('Report a new catcall');
  //   expect(reportCatcall).toBeInTheDocument();
  //   fireEvent.click(reportCatcall);

  //   await waitFor(()=>{
  //     expect(screen.getByTestId("report-form")).toBeInTheDocument();
  //   });
  // });
  
});