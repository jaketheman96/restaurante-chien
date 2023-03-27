import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import About from "../../pages/userIsNotLogged/About";
import Contact from "../../pages/userIsNotLogged/Contact";
import Login from "../../pages/userIsNotLogged/Login";
import Menu from "../../pages/userIsNotLogged/Menu";
import Register from "../../pages/userIsNotLogged/Register";
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

    const returnButton = screen.getByRole("button", { name: /voltar/i });
    fireEvent.click(returnButton);

    foodsTypes.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
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

  test("it should access register page", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Provider store={store}>
          <Register />
        </Provider>
      </MemoryRouter>
    );
    const registerButton = screen.getByRole("button", { name: /registrar/i });
    expect(registerButton).toBeInTheDocument();

    fireEvent.click(registerButton);

    const registerText = screen.getByText(/registrar:/i);
    expect(registerText).toBeInTheDocument()
  });
});
