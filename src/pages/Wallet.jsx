import { useState } from "react";
import Layout from "../components/Layout";
import mockWalletData from "../mockWalletData";

export default function Wallet() {
  const [wallets, setWallets] = useState(mockWalletData);

  const handlePayout = (id) => {
    setWallets((prev) =>
      prev.map((wallet) =>
        wallet.id === id
          ? {
              ...wallet,
              balance: 0,
              lastPayout: new Date().toISOString().split("T")[0],
            }
          : wallet,
      ),
    );
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-[#7FFF00]">
          Wallet & Payouts
        </h1>

        <table className="w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-[#7FFF00] text-white">
            <tr>
              <th className="p-2 text-left">Agent</th>
              <th className="p-2 text-left">Balance (KES)</th>
              <th className="p-2 text-left">Last Payout</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet) => (
              <tr key={wallet.id} className="border-t">
                <td className="p-2">{wallet.agentName}</td>
                <td className="p-2 font-semibold text-gray-700">
                  {wallet.balance.toLocaleString()}
                </td>
                <td className="p-2">
                  {new Date(wallet.lastPayout).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {wallet.balance > 0 ? (
                    <button
                      onClick={() => handlePayout(wallet.id)}
                      className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
                    >
                      Payout
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400 italic">
                      No payout due
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
