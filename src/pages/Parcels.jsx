import { useState } from "react";
import parcelsData from "../mockParcelsData";
import Layout from "../components/Layout";
import mockParcels, { agentList } from "../mockParcelsData";

export default function Parcels() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [parcels, setParcels] = useState(parcelsData);

  const handleStatusChange = (id, newStatus) => {
    setParcels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
    );
  };

  const filteredParcels = parcels.filter((p) => {
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchAgent = agentFilter === "all" || p.agent === agentFilter;

    const parcelDate = new Date(p.timestamp).toISOString().split("T")[0];
    const matchStart = !startDate || parcelDate >= startDate;
    const matchEnd = !endDate || parcelDate <= endDate;

    return matchStatus && matchAgent && matchStart && matchEnd;
  });

  return (
    <Layout>
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4 text-[#7FFF00]">
          Parcels Management
        </h1>

        <div className="mb-4">
          <label className="mr-2 font-medium">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="all">All</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Agent */}
          <div>
            <label className="block text-sm font-medium mb-1">Agent</label>
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="all">All</option>
              {agentList.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
        <table className="w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-[#7FFF00] text-white">
            <tr>
              <th className="p-2 text-left">Parcel ID</th>
              <th className="p-2 text-left">Sender</th>
              <th className="p-2 text-left">Receiver</th>
              <th className="p-2 text-left">Agent</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel) => (
              <tr key={parcel.id} className="border-t">
                <td className="p-2">{parcel.id}</td>
                <td className="p-2">{parcel.sender}</td>
                <td className="p-2">{parcel.receiver}</td>
                <td className="p-2">{parcel.agent}</td>
                <td className="p-2 capitalize">{parcel.status}</td>
                <td className="p-2">
                  {new Date(parcel.timestamp).toLocaleString()}
                </td>
                <td className="p-2">
                  <select
                    value={parcel.status}
                    onChange={(e) =>
                      handleStatusChange(parcel.id, e.target.value)
                    }
                    className="border px-2 py-1 rounded text-sm"
                  >
                    <option value="in transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
