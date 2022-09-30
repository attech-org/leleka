import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import { store } from "../redux/store";

export const RenderWithRoutes = (
  component: JSX.Element,
  initialRoute = "/"
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
        {component}
      </MemoryRouter>
    </Provider>
  );
};
