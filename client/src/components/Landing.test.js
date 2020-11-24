import Landing from './Landing';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe ('Landing tests:', ()=>{

  test('displays page correctly', async ()=>{
    render(<BrowserRouter><Landing/></BrowserRouter>);
    expect(screen.getByText("Chalk back.")).toBeInTheDocument()
    expect(screen.getByText(/View Catcalls of Amsterdam/i)).toBeInTheDocument()
    expect(screen.getByText(/Report a new catcall/i)).toBeInTheDocument()
    expect(screen.getByText(/Disclaimer/i)).toBeInTheDocument()
    expect(screen.getByText(/rotterdam/i)).toBeInTheDocument()
    expect(screen.getByAltText(/logo-rot/i)).toBeInTheDocument()
    expect(screen.getByText(/utrecht/i)).toBeInTheDocument()
    expect(screen.getByAltText(/logo-utr/i)).toBeInTheDocument()
    expect(screen.getByText("NEW YORK")).toBeInTheDocument()
    expect(screen.getByAltText(/logo-nyc/i)).toBeInTheDocument()
    expect(screen.getByText(/antwerp/i)).toBeInTheDocument()
    expect(screen.getByAltText(/logo-ant/i)).toBeInTheDocument()
    expect(screen.getByText(/berlin/i)).toBeInTheDocument()
    expect(screen.getByAltText(/logo-ber/i)).toBeInTheDocument()
    expect(screen.getByText(/groningen/i)).toBeInTheDocument()
    expect(screen.getByAltText(/logo-grunn/i)).toBeInTheDocument()
    expect(screen.getByText("Why.")).toBeInTheDocument()
    expect(screen.getByText(/A catcall is basically/i)).toBeInTheDocument()
    expect(screen.getByText(/Worldwide, youth-led movements/i)).toBeInTheDocument()
    expect(screen.getByText(/Why do we do this?/i)).toBeInTheDocument()
    expect(screen.getByText(/Get involved/i)).toBeInTheDocument()
    expect(screen.getByText(/See the social media channel/i)).toBeInTheDocument()
    expect(screen.getByText(/Join the community on Instagram/i)).toBeInTheDocument()
    expect(screen.getByText(/About Catcalls of Amsterdam./i)).toBeInTheDocument()
    expect(screen.getByText(/Catcalls of Amsterdam is founded /i)).toBeInTheDocument()
    expect(screen.getByText(/In the meantime our team grew and is organised/i)).toBeInTheDocument()
    expect(screen.getByText(/With this application outside/i)).toBeInTheDocument()
    expect(screen.getByText(/ABOUT THIS MAP APPLICATION/i)).toBeInTheDocument()
    expect(screen.getByText(/This is a project for Catcalls of Amsterdam by Lisanne Kraal/i)).toBeInTheDocument()
    expect(screen.getByText("CONTACT")).toBeInTheDocument()
    expect(screen.getByText("Catcalls of Amsterdam")).toBeInTheDocument()
    expect(screen.getByText(/PM on Instagram/i)).toBeInTheDocument()
    expect(screen.getByText(/Send an email/i)).toBeInTheDocument()
  });

});