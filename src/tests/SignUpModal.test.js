import { render, fireEvent } from "@testing-library/react";
import SignUpModal from "../components/SignUpModal";

it("checkInputRender", ()=> {
  const { queryByTitle } = render(<SignUpModal />);
  const input = queryByTitle("email-input");

  expect(input).toBeTruthy();
});

describe("changeInput", ()=> {
  it("onChange", ()=> {
    const { queryByTitle } = render(<SignUpModal />);
    const input = queryByTitle("email-input");
    fireEvent.change(input, { target: { value: "test@test.nb" } });
    expect(input.value).toBe("test@test.nb");
  });
});
