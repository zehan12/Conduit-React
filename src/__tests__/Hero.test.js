import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import Hero from "../components/Hero";


test("Hero banner render without crash", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent('conduit');
    expect(heading).toBeInTheDocument();

    const p = screen.getByText("A place to share your knowleadge.");
    expect(p).toBeVisible()
    expect(p).toBeInTheDocument();
})