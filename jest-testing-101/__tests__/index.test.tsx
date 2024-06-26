import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home dt={[]} />);

    const heading = screen.getByRole("heading", {
      name: /welcome/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
