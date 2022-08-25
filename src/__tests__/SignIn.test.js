import { logRoles, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import SignIn from "../components/SignIn"
import { BrowserRouter } from "react-router-dom"


test("signin render without crash", () => {
    render(<BrowserRouter>
        <SignIn />
    </BrowserRouter>);
    logRoles(screen.getByTestId("mainDiv"))

    const singinText = screen.queryByText("Sign In")
    expect(singinText).toBeInTheDocument()

    const emailInput = screen.getByPlaceholderText('Email')
    expect(emailInput).toBeInTheDocument()

    const passwordInput = screen.getByPlaceholderText('Password')
    expect(passwordInput).toBeInTheDocument()

    const buttonElm = screen.getByRole("button", { name: "Sign in", exact: false });
    expect(buttonElm).toBeInTheDocument()
})

