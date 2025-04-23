import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Accounts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">My Accounts</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Connect Account
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Twitter Account Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">T</span>
            </div>
            <div>
              <h3 className="font-semibold">Twitter</h3>
              <p className="text-sm text-muted-foreground">@username</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Manage
          </Button>
        </Card>

        {/* Instagram Account Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">I</span>
            </div>
            <div>
              <h3 className="font-semibold">Instagram</h3>
              <p className="text-sm text-muted-foreground">@username</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Manage
          </Button>
        </Card>

        {/* Add Account Card */}
        <Card className="p-6 border-dashed flex flex-col items-center justify-center">
          <Plus className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Connect New Account</p>
        </Card>
      </div>
    </div>
  );
}
