import { useState } from "react";
import Layout from "../components/Layout";
import mockAgents from "../mockAgentsData";
import Modal from "../components/Modal";

export default function Agents() {
  const [agents, setAgents] = useState(mockAgents);
  const [search, setSearch] = useState("");

  const toggleStatus = (id) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, isActive: !agent.isActive } : agent,
      ),
    );
  };

  const filteredAgents = agents.filter((agent) =>
    `${agent.name} ${agent.location}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openHistory = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const closeHistory = () => {
    setSelectedAgent(null);
    setShowModal(false);
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-[#7FFF00]">
          Agents Management
        </h1>

        <input
          type="text"
          placeholder="Search by name or location..."
          className="mb-4 px-4 py-2 border rounded w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-[#7FFF00] text-white">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
              <th className="p-2 text-left">History</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr key={agent.id} className="border-t">
                <td className="p-2">{agent.name}</td>
                <td className="p-2">{agent.location}</td>
                <td className="p-2">{agent.phone}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      agent.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {agent.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-2 align-middle">
                  <button
                    onClick={() => toggleStatus(agent.id)}
                    className={`px-3 py-1 rounded font-medium text-sm ${
                      agent.isActive
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {agent.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>

                <td className="p-2 align-middle">
                  <button
                    onClick={() => openHistory(agent)}
                    className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
                  >
                    View History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={showModal} onClose={closeHistory}>
          <h2 className="text-xl font-bold mb-2 text-[#7FFF00]">
            {selectedAgent?.name}'s Activity
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Delivered 5 parcels last week</li>
            <li>Pending delivery: 2 parcels</li>
            <li>Last active: July 20, 2025</li>
          </ul>
        </Modal>
      </div>
    </Layout>
  );
}
