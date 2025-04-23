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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Image, Link } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PostPopup({ isOpen, onClose }) {
  const [date, setDate] = React.useState();
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="w-[800px] max-w-[95vw] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create Social Media Post</CardTitle>
          <CardDescription>
            Create and schedule your social media content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Sol Kolon */}
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title/Caption</Label>
                  <Input id="title" placeholder="Enter post title or caption" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your post content here..."
                    className="min-h-[200px]"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* Sağ Kolon */}
                <div className="space-y-2">
                  <Label>Media</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center transition-colors hover:border-primary/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    {selectedImage ? (
                      <div className="relative">
                        <img
                          src={selectedImage}
                          alt="Preview"
                          className="max-h-[200px] mx-auto rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setSelectedImage(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-2 py-8"
                      >
                        <Image className="h-12 w-12 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Click to upload image
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Schedule Post</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="link">External Link (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="link"
                      placeholder="Add a link to your post"
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
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
            <Button variant="outline" className="hover:cursor-pointer">
              Save as Draft
            </Button>
            <Button className="hover:cursor-pointer">Schedule Post</Button>
          </div>
        </CardFooter>
      </Card>
    </Modal>
  );
}
