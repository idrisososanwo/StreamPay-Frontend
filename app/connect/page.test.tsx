import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConnectPage from "./page";
import { getNativeBalance } from "../../lib/stellar/queries";

jest.mock("../../lib/stellar/queries", () => ({
  getNativeBalance: jest.fn(),
}));

describe("ConnectPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders connect button initially", () => {
    render(<ConnectPage />);
    expect(screen.getByRole("button", { name: /connect stellar wallet/i })).toBeInTheDocument();
  });

  it("shows skeleton while loading balance and then displays formatted balance", async () => {
    // Mock the API to return a specific balance
    let resolvePromise: (value: string) => void;
    const promise = new Promise<string>((resolve) => {
      resolvePromise = resolve;
    });
    
    (getNativeBalance as jest.Mock).mockReturnValueOnce(promise);

    render(<ConnectPage />);

    // Click connect to simulate successful wallet connection
    fireEvent.click(screen.getByRole("button", { name: /connect stellar wallet/i }));

    // Verify address is shown
    expect(screen.getByText(/Connected Address/i)).toBeInTheDocument();

    // Verify skeleton is shown while loading
    expect(screen.getByTestId("balance-skeleton")).toBeInTheDocument();

    // Resolve the promise with "1234.5678"
    resolvePromise!("1234.5678");

    // Wait for the formatted balance to appear
    await waitFor(() => {
      // 1234.5678 should format to 1,234.57 XLM (Wait, parseFloat handles rounding? No, Intl.NumberFormat does)
      expect(screen.getByText("1,234.57 XLM")).toBeInTheDocument();
    });

    // Check that getNativeBalance was called
    expect(getNativeBalance).toHaveBeenCalledTimes(1);
    expect(getNativeBalance).toHaveBeenCalledWith("GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB");
  });

  it("displays error message if balance fetch fails", async () => {
    (getNativeBalance as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(<ConnectPage />);
    fireEvent.click(screen.getByRole("button", { name: /connect stellar wallet/i }));

    await waitFor(() => {
      expect(screen.getByText(/error fetching balance/i)).toBeInTheDocument();
    });
  });
});
