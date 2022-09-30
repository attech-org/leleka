import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import ProfilePage from "../pages/Profile";
import { store } from "../redux/store";
import { RenderWithRoutes } from "./helpers/RenderWithRouter";

describe("NavigationBar", () => {
  test("HomePageLink", () => {
    render(RenderWithRoutes(<NavigationBar />));
    const HomePageLink = screen.getByTestId("HomePageLink");
    userEvent.click(HomePageLink);
    expect(screen.getByTestId("HomePage")).toBeInTheDocument();
  });

  test("ExplorePageLink", () => {
    render(RenderWithRoutes(<NavigationBar />));
    const ExplorePageLink = screen.getByTestId("ExplorePageLink");
    userEvent.click(ExplorePageLink);
    expect(screen.getByTestId("ExplorePage")).toBeInTheDocument();
  });

  test("MessagesPageLink", () => {
    render(RenderWithRoutes(<NavigationBar />));
    const MessagesPageLink = screen.getByTestId("MessagesPageLink");
    userEvent.click(MessagesPageLink);
    expect(screen.getByTestId("MessagesPage")).toBeInTheDocument();
  });

  test("BookmarksPageLink", () => {
    render(RenderWithRoutes(<NavigationBar />));
    const BookmarksPageLink = screen.getByTestId("BookmarksPageLink");
    userEvent.click(BookmarksPageLink);
    expect(screen.getByTestId("BookmarksPage")).toBeInTheDocument();
  });

  test("ListsPageLink", () => {
    render(RenderWithRoutes(<NavigationBar />));
    const ListsPageLink = screen.getByTestId("ListsPageLink");
    userEvent.click(ListsPageLink);
    expect(screen.getByTestId("ListsPage")).toBeInTheDocument();
  });

  test("MorePageLink", () => {
    render(RenderWithRoutes(<NavigationBar />));
    const MorePageLink = screen.getByTestId("MorePageLink");
    userEvent.click(MorePageLink);
    expect(screen.getByTestId("MorePage")).toBeInTheDocument();
  });

  test("profile page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/:id"]}>
          <Routes>
            <Route
              path="/63349b12ed0b72e2a7417956"
              element={<ProfilePage tabKey="tweets" />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const ProfilePageLink = screen.getByTestId("ProfilePageLink");
    userEvent.click(ProfilePageLink);
    expect(screen.getByTestId("ProfilePage")).toBeInTheDocument();
  });

  test("not found page", () => {
    render(RenderWithRoutes(<NavigationBar />, "/asd"));
    expect(screen.getByTestId("NotFoundPage")).toBeInTheDocument();
  });
});
