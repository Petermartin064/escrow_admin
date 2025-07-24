import React, { useState } from "react";
import jsPDF from "jspdf";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import reportsData from "../mockReportsData";
import { trendData } from "../mockReportsData";
import Layout from "../components/Layout";

const COLORS = ["#00C49F", "#FFBB28", "#FF4C4C"]; // delivered, in transit, failed

function exportToCSV(data, filename) {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(","));
  const csv = [headers, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function exportToPDF(data, filename) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Daily Deliveries Trend", 10, 10);

  let y = 20;
  data.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.date}: ${item.delivered} deliveries`, 10, y);
    y += 10;
  });

  doc.save(`${filename}.pdf`);
}

export default function Reports() {
  const [exportFormat, setExportFormat] = useState("csv");
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-[#7FFF00]">
          Delivery Reports
        </h1>

        <div className="bg-white p-6 shadow rounded-lg">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <label className="mr-2 font-medium">Export as:</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
              </select>
            </div>

            <button
              onClick={() =>
                exportFormat === "csv"
                  ? exportToCSV(trendData, "daily-deliveries")
                  : exportToPDF(trendData, "daily-deliveries")
              }
              className="bg-[#7FFF00] text-white px-4 py-2 rounded hover:bg-lime-500"
            >
              Export
            </button>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportsData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {reportsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 mt-6 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Daily Deliveries Trend
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="delivered"
                    stroke="#7FFF00"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
