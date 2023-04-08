import { render, screen } from "@testing-library/react";
import Datatable from "@/components/Datatable";
import { fireEvent } from "@testing-library/react";

describe("Datatable", () => {
  it("renders a table", () => {
    render(<Datatable records={[]} />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});

describe("thead", () => {
  it("renders a table with thead", () => {
    render(<Datatable records={[]} />);

    let th = screen.getByText("Name");
    expect(th).toBeInTheDocument();
    th = screen.getByText("UserName");
    expect(th).toBeInTheDocument();
    th = screen.getByText("Email");
    expect(th).toBeInTheDocument();
    th = screen.getByText("Website");
    expect(th).toBeInTheDocument();
  });
});

describe("check data", () => {
  it("verify data", () => {
    render(
      <Datatable
        records={[
          {
            id: 1,
            name: "Goutham Rangarajan",
            username: "GouthamRangarajan",
            email: "rgouthamraja@yahoo.com",
            website: "https://portfolio-gouthamrangarajan.netlify.app/",
          },
        ]}
      ></Datatable>
    );

    let td = screen.queryByText("Goutham Rangarajan");
    expect(td).toBeInTheDocument();
    td = screen.queryByText("GouthamRangarajan");
    expect(td).toBeInTheDocument();
    td = screen.queryByText("rgouthamraja@yahoo.com");
    expect(td).toBeInTheDocument();
  });
});

describe("test search", () => {
  it("verify data", async () => {
    render(
      <Datatable
        records={[
          {
            id: 1,
            name: "Goutham Rangarajan",
            username: "GouthamRangarajan",
            email: "rgouthamraja@yahoo.com",
            website: "https://portfolio-gouthamrangarajan.netlify.app/",
          },
        ]}
      ></Datatable>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "goutham" },
    });
    let td = screen.queryByText("Goutham Rangarajan");
    expect(td).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "scott" },
    });
    td = screen.queryByText("Goutham Rangarajan");
    expect(td).toBeNull();
  });
});
