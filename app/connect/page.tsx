"use client";

import { useState } from "react";
import { useWalletBalance } from "../../hooks/useWalletBalance";
import { Skeleton } from "../components/Skeleton";

export default function ConnectPage() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const { balance, isLoading, error } = useWalletBalance(publicKey);

  const handleConnect = () => {
    // Mock successful wallet connection with a hardcoded Stellar address
    // (This is an arbitrary public key from mainnet for demonstration)
    setPublicKey("GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB");
  };

  const handleDisconnect = () => {
    setPublicKey(null);
  };

  const formatBalance = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "0.00 XLM";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num) + " XLM";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "1.5rem",
      }}
    >
      <div style={{ maxWidth: "48rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Connect Wallet</h1>
        
        {!publicKey ? (
          <button
            onClick={handleConnect}
            style={{
              background: "var(--accent)",
              borderRadius: "999px",
              color: "#03150a",
              fontWeight: 700,
              padding: "0.875rem 1.25rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Connect Stellar Wallet
          </button>
        ) : (
          <div
            style={{
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: "1rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ color: "var(--muted-light)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                Connected Address
              </p>
              <p style={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                {publicKey}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ color: "var(--muted-light)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                Balance
              </p>
              {isLoading ? (
                <div data-testid="balance-skeleton">
                  <Skeleton width={120} height="1.5rem" />
                </div>
              ) : error ? (
                <p style={{ color: "red" }}>Error fetching balance</p>
              ) : (
                <p style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {balance ? formatBalance(balance) : "0.00 XLM"}
                </p>
              )}
            </div>

            <button
              onClick={handleDisconnect}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "999px",
                background: "transparent",
                color: "var(--foreground)",
                fontWeight: 600,
                padding: "0.5rem 1rem",
                marginTop: "1rem",
                cursor: "pointer",
              }}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
