import { useState } from "react";
import Layout from "../components/Layout";
import mockVendors from "../mockVendorsData";

export default function Vendors() {
  const [vendors, setVendors] = useState(mockVendors);

  const handleStatusChange = (id, newStatus) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v)),
    );
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-[#7FFF00]">
          Vendor Management
        </h1>

        <table className="w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-[#7FFF00] text-white">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Contact</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Registered On</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="border-t">
                <td className="p-2">{vendor.name}</td>
                <td className="p-2">{vendor.contact}</td>
                <td className="p-2">{vendor.phone}</td>
                <td className="p-2">
                  {new Date(vendor.registeredOn).toLocaleDateString()}
                </td>
                <td className="p-2 capitalize">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded ${
                      vendor.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : vendor.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  {vendor.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(vendor.id, "approved")
                        }
                        className="px-3 py-1 rounded bg-green-500 text-white text-sm hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(vendor.id, "rejected")
                        }
                        className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
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
