import { render, screen } from "@testing-library/react";
import App from "../../App";
import {
  MemoryRouter,
} from "react-router-dom";

describe("Testing home page component", () => {
  test("it should render all the elements on the home page", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const navbarEls = screen.getAllByRole("link");
    expect(navbarEls).toHaveLength(5);
    navbarEls.forEach((el) => expect(el).toHaveAttribute("href"));

    const headingEl = screen.getByRole("heading", {
      level: 1,
      name: "Restaurante Chien",
    });
    expect(headingEl).toBeInTheDocument();

    const imageEl = screen.getByRole("img");
    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveAttribute("src");

    const textEl = screen.getByText(/asian & european kitchen/i);
    expect(textEl).toBeInTheDocument();
  });
});
