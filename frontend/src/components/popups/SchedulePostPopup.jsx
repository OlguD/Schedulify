import * as React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SchedulePostPopup({ isOpen, onClose }) {
  const [date, setDate] = React.useState();
  const [selectedContent, setSelectedContent] = React.useState("");
  const [selectedPlatforms, setSelectedPlatforms] = React.useState([]);

  const platforms = [
    { id: "instagram", label: "Instagram" },
    { id: "twitter", label: "Twitter" },
    { id: "facebook", label: "Facebook" },
    { id: "linkedin", label: "LinkedIn" },
  ];

  const togglePlatform = (platformId) => {
    setSelectedPlatforms((current) =>
      current.includes(platformId)
        ? current.filter((id) => id !== platformId)
        : [...current, platformId],
    );
  };

  const contentList = [
    {
      id: 1,
      title: "Summer Campaign Post",
      preview: "Get ready for summer...",
    },
    { id: 2, title: "Product Launch", preview: "Introducing our new..." },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="w-[600px] max-w-[95vw] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Schedule Existing Content</CardTitle>
          <CardDescription>
            Select content and schedule it for social media platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              {/* Content Seçimi */}
              <div className="space-y-2">
                <Label>Select Content</Label>
                <Select
                  value={selectedContent}
                  onValueChange={setSelectedContent}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select content to schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentList.map((content) => (
                      <SelectItem
                        key={content.id}
                        value={content.id.toString()}
                      >
                        <div>
                          <div className="font-medium">{content.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {content.preview}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Platform Seçimi - Checkbox Grubu */}
              <div className="space-y-2">
                <Label>Platforms</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={platform.id}
                        checked={selectedPlatforms.includes(platform.id)}
                        onCheckedChange={() => togglePlatform(platform.id)}
                      />
                      <Label htmlFor={platform.id} className="cursor-pointer">
                        {platform.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarih Seçimi */}
              <div className="space-y-2">
                <Label>Schedule Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !date && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Seçilen Content Önizleme */}
              {selectedContent && (
                <div className="space-y-2 p-4 border rounded-lg bg-muted/50">
                  <Label>Content Preview</Label>
                  <div className="text-sm">
                    {
                      contentList.find(
                        (c) => c.id.toString() === selectedContent,
                      )?.preview
                    }
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between pt-5 border-t mt-6">
          <Button
            variant="ghost"
            className="hover:cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              className="hover:cursor-pointer"
              disabled={
                !selectedContent || selectedPlatforms.length === 0 || !date
              }
              onClick={() => {
                onSubmit({
                  contentId: selectedContent,
                  platforms: selectedPlatforms,
                  scheduleDate: date,
                });
              }}
            >
              Schedule Post
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Modal>
  );
}
