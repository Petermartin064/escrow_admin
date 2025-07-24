import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { weeklyParcels } from "../mockReportsData";
import dashboardStats from "../mockDashboardData";
import Layout from "../components/Layout";

export default function Dashboard() {
  const { parcelsToday, pendingDeliveries, activeAgents, failedDeliveries } =
    dashboardStats;

  return (
    <Layout>
      <div className="bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-[#7FFF00]">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <StatCard
            label="Parcels Today"
            value={parcelsToday}
            color="[#7FFF00]"
          />
          <StatCard
            label="Pending Deliveries"
            value={pendingDeliveries}
            color="yellow-500"
          />
          <StatCard
            label="Active Agents"
            value={activeAgents}
            color="green-500"
          />
          <StatCard
            label="Failed Deliveries"
            value={failedDeliveries}
            color="blue-500"
          />
        </div>
      </div>
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Weekly Parcel Summary</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyParcels}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="delivered" stackId="a" fill="#7FFF00" />
              <Bar dataKey="failed" stackId="a" fill="#FF4C4C" />
              <Bar dataKey="inTransit" stackId="a" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-md border-l-4 border-${color}`}
    >
      <h2 className="text-sm text-gray-500">{label}</h2>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
