import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { HomePage } from "../../src/pages/Home/HomePage";

describe("Home Page", () => {
  test("welcomes you to the site", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading");
    expect(heading.textContent).toEqual("QuizBook");
  });

  test("Displays a signup link", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const signupLink = screen.getByText("Sign up");
    expect(signupLink.getAttribute("href")).toEqual("/signup");
  });

  test("Displays a login link", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const loginLink = screen.getByText("Sign in");
    expect(loginLink.getAttribute("href")).toEqual("/login");
  });
});
