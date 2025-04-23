import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import api from "../lib/api.js";
import { SchedulePostPopup } from "../components/popups/SchedulePostPopup.jsx";

export default function Schedule() {
  const [scheduledContents, setScheduledContents] = useState([]);
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false);

  const getScheduledContents = async () => {
    try {
      const response = await api("get", "/contents");
      setScheduledContents(response);
    } catch (error) {
      console.error("Error fetching scheduled contents:", error);
    }
  };

  useEffect(() => {
    getScheduledContents();
  }, []);

  const handleScheduleSubmit = async (scheduleData) => {
    try {
      await api("post", "/content/schedule", scheduleData);

      getScheduledContents();
      setIsSchedulePopupOpen(false);
    } catch (error) {
      console.error("Error scheduling content:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Content Schedule</h2>
        <Button
          className="hover:cursor-pointer"
          onClick={() => setIsSchedulePopupOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Schedule Post
        </Button>
      </div>

      <div className="grid gap-4">
        {/* Calendar View */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="w-5 h-5" />
            <h3 className="font-semibold">Upcoming Posts</h3>
          </div>
          <div className="space-y-4">
            {scheduledContents.map((content, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{content.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {content.platform}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {content.scheduledTime}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      <SchedulePostPopup
        isOpen={isSchedulePopupOpen}
        onClose={() => setIsSchedulePopupOpen(false)}
        onSubmit={handleScheduleSubmit}
      />
    </div>
  );
}
