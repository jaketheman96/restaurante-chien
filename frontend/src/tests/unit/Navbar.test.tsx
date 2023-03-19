import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import Login from "../../pages/Login";
import Menu from "../../pages/Menu";
import store from "../../store/store";

describe("Testing navbar component", () => {
  test("it should redirect to about page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <About />
      </MemoryRouter>
    );
    const navbarEls = screen.getAllByRole("link");
    fireEvent.click(navbarEls[1]);
    const aboutEl = screen.getByRole("heading", {
      name: /sobre nós/i,
      level: 2,
    });
    expect(aboutEl).toBeInTheDocument();
  });

  test("it should redirect to menu page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Menu />
      </MemoryRouter>
    );
    const navbarEls = screen.getAllByRole("link");
    fireEvent.click(navbarEls[1]);

    const foodsTypes = await screen.findAllByRole("link");
    fireEvent.click(foodsTypes[0]);

    const menuText = screen.getByText("Menu");
    expect(menuText).toBeInTheDocument();
  });

  test("it should redirect to login page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const navbarEls = screen.getAllByRole("link");
    fireEvent.click(navbarEls[3]);
    const emailInput = screen.getByRole("textbox");
    expect(emailInput).toBeInTheDocument();
  });

  test("it should redirect to contact page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Contact />
      </MemoryRouter>
    );
    const navbarEls = screen.getAllByRole("link");
    fireEvent.click(navbarEls[4]);
    const emailInput = screen.getByText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });
});
