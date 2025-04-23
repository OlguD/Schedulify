import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, CheckCircle, BarChart2 } from "lucide-react";
import { Popup } from "../components/Popup";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your content performance
          </p>
        </div>

        <Button size="lg">
          <Plus className="mr-2 h-5 w-5" /> Create New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Posts
              </p>
              <h3 className="text-2xl font-bold mt-1">123</h3>
              <p className="text-xs text-green-500 mt-1">
                +12% from last month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Scheduled
              </p>
              <h3 className="text-2xl font-bold mt-1">45</h3>
              <p className="text-xs text-blue-500 mt-1">Next post in 2h</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Published
              </p>
              <h3 className="text-2xl font-bold mt-1">67</h3>
              <p className="text-xs text-green-500 mt-1">Last post 2h ago</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-full">
              <BarChart2 className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Engagement
              </p>
              <h3 className="text-2xl font-bold mt-1">89%</h3>
              <p className="text-xs text-purple-500 mt-1">+5% from last week</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Posts and Upcoming Schedule */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Posts</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {/* Örnek post kartları */}
            {[1, 2, 3].map((post) => (
              <Card key={post} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded" />
                  <div>
                    <h4 className="font-medium">Post Title #{post}</h4>
                    <p className="text-sm text-muted-foreground">
                      Posted 2h ago
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Upcoming Schedule</h3>
            <Button variant="ghost" size="sm">
              View Calendar
            </Button>
          </div>
          <div className="space-y-4">
            {/* Örnek schedule kartları */}
            {[1, 2, 3].map((schedule) => (
              <Card key={schedule} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded" />
                    <div>
                      <h4 className="font-medium">
                        Scheduled Post #{schedule}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Tomorrow at 10:00 AM
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
