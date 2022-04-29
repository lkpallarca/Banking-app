import {render, fireEvent, screen, queryByTitle} from "@testing-library/react";
import WithdrawControl from "../components/WithdrawControl";

it("checkRender", ()=> {
  render(<WithdrawControl />);
  const submit = screen.getAllByText("Withdraw");
  expect(submit).toBeTruthy();
});

// describe('withdrawFromAmount', () => {
//   it("onClick", ()=> {
//     render(<WithdrawControl />);
//     const btn = queryByTitle("withdraw-button")
//     fireEvent.click(btn) 
//   }); 
// });
