import React from 'react';
import {render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    // the component renders the contact form component without errors.
        render (<ContactForm/>);
  
});

test('renders the contact form header', ()=> {
    // the header h1 element exists. Include three asserts, if the header is in the document, if the heads is truthy, if the header has the correct test content.

    // Arrange:
       render(<ContactForm/>);
    // Act:
       const header = screen.queryByText(/contact form/i)
    // Assert:   
       expect (header).toBeInTheDocument();
       expect(header).toBeTruthy();
       expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    // the component renders ONE error message if the user enters less than 4 characters into the firstname field. Make sure to use async / await and the correct screen method to account for state change.

    // Arrange:
    render(<ContactForm/>);
    const inputFirstName = await screen.findByLabelText(/first name*/i)
    fireEvent.change(inputFirstName, { target: { value: "Taz", name: "firstName" } })

    const firstNameError = screen.queryByText(/Error: firstName must have at least 5 characters./i)
    expect(firstNameError).toBeInTheDocument()
    


});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    // the component renders THREE error messages if the user submits without filling in any values.
    render (<ContactForm/>);

    const button = await screen.getByRole("button")
    const firstNameInput = await screen.getByLabelText(/First Name*/i)
    const LastNameInput = await screen.getByLabelText(/Last Name*/i)
    const emailInput = await screen.getByLabelText(/Email*/i)

    userEvent.click(button)

    expect(firstNameInput).toBeInTheDocument()
    expect(LastNameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
  

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    // the component renders ONE error message if the user submits without filling in the email field.
    render (<ContactForm/>);
    const button = await screen.getByRole("button")
    const firstNameInput = await screen.getByLabelText(/First Name*/i)
    const LastNameInput = await screen.getByLabelText(/Last Name*/i)
    const emailInput = await screen.getByLabelText(/Email*/i)

    userEvent.click(button)

    expect(firstNameInput).toBeInTheDocument()
    expect(LastNameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()

  
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    // the component renders the text "email must be a valid email address" if an invalid email address is typed into the email field.
    render (<ContactForm/>);
    // const emailInput = await screen.getByLabelText(/Email*/i)
    // userEvent.type(email, "")

    // const button = await screen.getByRole("button")
    // userEvent.click(button)

    // const error = screen.queryByText(/Error: email must be a valid email address. /i)
    // expect(error).toBeInTheDocument()
  
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    // the component renders the text "lastName is a required field" the form is submitted without a last name.
    render (<ContactForm/>);
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    // the component renders the firstname, lastname and email text when submitted with valued fields and does not render a message value when one is not entered into the message field.
    render (<ContactForm/>);
});

test('renders all fields text when all fields are submitted.', async () => {
    // renders all fields when the user submits with valid text filled in for all fields.
    render (<ContactForm/>);
});