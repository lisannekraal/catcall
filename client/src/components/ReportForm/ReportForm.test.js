import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import ReportForm from './ReportForm';
import { MockedProvider } from '@apollo/client/testing';
//import recaptcha from 'react-google-recaptcha/lib/recaptcha';



jest.mock('../components/MapForm.js', () => () => <div id='mockMap'>HelloMap</div>);

jest.mock("react-google-recaptcha/lib/recaptcha", () => {
  const ReCAPTCHA = () => {
    return (
      <input
      type="checkbox"
      data-testid="recaptcha-sign-in"
      value={true}
      />
    );
  };
  return ReCAPTCHA;
})

const mockSubmit = jest.fn()

describe('form tests', () => {

  beforeEach(() => {

    render(
      <MockedProvider>
        <ReportForm onSubmit={mockSubmit} />
      </MockedProvider>
    );
  })

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

    const input = screen.getByTestId('catcall-quote');
    const checkbox = screen.getByTestId('catcall-checkbox');
    const submitButton = screen.getByDisplayValue('Submit new catcall');
    let required;

    await act(async () => {
      userEvent.click(submitButton)
    })

    required = screen.getAllByText('Required')
    expect(required.length).toBeGreaterThanOrEqual(2);

    await act(async () => {
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    })

    required = screen.getAllByText('Required')
    expect(required.length).toBeLessThan(3);

    await act(async () => {
      userEvent.click(checkbox);
      userEvent.type(input, '0000');
      expect(screen.getByDisplayValue('0000')).toBeInTheDocument();
      userEvent.click(submitButton)
    })

    await waitFor(() => {
      required = screen.getAllByText('Required')
      expect(required.length).toBeLessThan(3)
    })

  });

  it("On render, required doesn't appear", async () => {

    await waitFor(() => {
      let errorRequired = screen.queryByText('Required')
      expect(errorRequired).toBeNull();
    })
  });
})


