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
import { Input } from "@/components/ui/input";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const platformConfig = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "bg-pink-500",
    hoverColor: "hover:bg-pink-600",
    description: "Connect your Instagram Business account",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    description: "Connect your Twitter account",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
    description: "Connect your Facebook Page",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-700",
    hoverColor: "hover:bg-blue-800",
    description: "Connect your LinkedIn Company Page",
  },
];

export function ConnectAccountPopup({ isOpen, onClose, onSubmit }) {
  const [selectedPlatform, setSelectedPlatform] = React.useState(null);
  const [credentials, setCredentials] = React.useState({
    username: "",
    apiKey: "",
  });
  const [error, setError] = React.useState("");

  const handleConnect = async () => {
    setError("");
    if (!selectedPlatform) {
      setError("Plase select a platform");
      return;
    }

    if (!credentials.username || !credentials.apiKey) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await onSubmit({
        platform: selectedPlatform,
        ...credentials,
      });
    } catch (error) {
      setError(error.message || "Failed to connect account");
    }
  };

  const renderCredentialsForm = () => {
    if (!selectedPlatform) return null;

    return (
      <div className="space-y-3 mt-4">
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Enter your API key"
            value={credentials.apiKey}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                apiKey: e.target.value,
              }))
            }
          />
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="w-[600px] max-w-[95vw] shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl">
            Connect Social Media Account
          </CardTitle>
          <CardDescription>
            Connect your social media accounts to start scheduling posts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-3">
            {platformConfig.map((platform) => (
              <Button
                key={platform.id}
                variant="outline"
                className={`h-20 flex flex-col items-center justify-center gap-2 hover:cursor-pointer ${
                  selectedPlatform === platform.id
                    ? `${platform.color} text-white`
                    : platform.hoverColor
                }`}
                onClick={() => setSelectedPlatform(platform.id)}
              >
                <platform.icon className="h-8 w-8" />
                <span>{platform.name}</span>
              </Button>
            ))}
          </div>

          {selectedPlatform && (
            <div className="mt-4">
              <Alert className="mb-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {
                    platformConfig.find((p) => p.id === selectedPlatform)
                      ?.description
                  }
                </AlertDescription>
              </Alert>
              {renderCredentialsForm()}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-4 border-t mt-4">
          <Button
            variant="ghost"
            className="hover:cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="hover:cursor-pointer"
            onClick={handleConnect}
            disabled={
              !selectedPlatform || !credentials.username || !credentials.apiKey
            }
          >
            Connect Account
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  );
}
