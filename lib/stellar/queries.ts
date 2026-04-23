const HORIZON_URL = "https://horizon.stellar.org";

export async function getNativeBalance(publicKey: string): Promise<string> {
  const response = await fetch(`${HORIZON_URL}/accounts/${publicKey}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      // Account not found on ledger usually means 0 balance or unfunded
      return "0";
    }
    throw new Error(`Horizon API error: ${response.statusText}`);
  }

  const data = await response.json();
  const nativeBalanceObj = data.balances?.find(
    (b: { asset_type: string; balance: string }) => b.asset_type === "native"
  );

  return nativeBalanceObj ? nativeBalanceObj.balance : "0";
}
