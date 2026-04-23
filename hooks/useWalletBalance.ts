import { useState, useEffect } from "react";
import { getNativeBalance } from "../lib/stellar/queries";

export function useWalletBalance(publicKey: string | null) {
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchBalance() {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const bal = await getNativeBalance(publicKey);
        if (isMounted) {
          setBalance(bal);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch balance"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchBalance();

    const intervalId = setInterval(fetchBalance, 60000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [publicKey]);

  return { balance, isLoading, error };
}
