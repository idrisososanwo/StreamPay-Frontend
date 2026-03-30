export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-2">StreamPay</h1>
      <p className="text-muted mb-6 text-base">
        Payment streaming on Stellar
      </p>
      <p className="max-w-xs text-center text-base">
        Connect your wallet to create and manage payment streams.
      </p>
    </main>
  );
}
