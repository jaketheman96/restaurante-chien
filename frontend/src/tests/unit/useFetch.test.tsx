import "@testing-library/react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Menu from "../../pages/Menu";
import store from "../../store/store";
import { allFoodsMock } from "../mocks/allUsers";

describe("Testing custom hook useGetFetch", () => {
  let mockUrl;

  test("it should test the fetch function", async () => {
    mockUrl = "http://localhost:3502/foods/";

    const promise = Promise.resolve({
      json: () => Promise.resolve(allFoodsMock),
    });
    global.fetch = jest.fn(() => promise) as jest.Mock;

    render(
      <Provider store={store}>
        <Menu />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
    await act(() => promise);
  });

  afterEach(() => jest.clearAllMocks());
});
