import { Card } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Engagement Rate</h3>
            <LineChart className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">8.5%</p>
          <p className="text-sm text-muted-foreground mt-2">
            +2.3% from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Total Reach</h3>
            <BarChart className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">245K</p>
          <p className="text-sm text-muted-foreground mt-2">
            +12% from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Audience Growth</h3>
            <PieChart className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">+1.2K</p>
          <p className="text-sm text-muted-foreground mt-2">
            New followers this month
          </p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Performance by Platform</h3>
          {/* Platform metrics would go here */}
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Top Performing Posts</h3>
          {/* Top posts list would go here */}
        </Card>
      </div>
    </div>
  );
}
