import { render, screen } from "@testing-library/react";
import store from "./store";
import App from "./App";
import { Provider } from "react-redux";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Users/i);
  expect(linkElement).toBeInTheDocument();
});
