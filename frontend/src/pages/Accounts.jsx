import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ConnectAccountPopup } from "@/components/popups/ConnectAccountPopup";

export default function Accounts() {
  const [isConnectPopupOpen, setIsConnectPopupOpen] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([
    { platform: "twitter", username: "@twitteruser" },
    { platform: "instagram", username: "@instagramuser" },
  ]);

  const handleConnectAccount = async (accountData) => {
    try {
      // API çağrısı yapılacak
      console.log("Connecting account:", accountData);

      // Başarılı bağlantıdan sonra listeye ekle
      setConnectedAccounts((prev) => [
        ...prev,
        {
          platform: accountData.platform,
          username: accountData.username,
        },
      ]);

      // Popup'ı kapat
      setIsConnectPopupOpen(false);
    } catch (error) {
      console.error("Failed to connect account:", error);
      throw error;
    }
  };

  const getPlatformConfig = (platform) => {
    const configs = {
      twitter: { bg: "bg-blue-400", letter: "T" },
      instagram: { bg: "bg-pink-500", letter: "I" },
      facebook: { bg: "bg-blue-600", letter: "F" },
      linkedin: { bg: "bg-blue-700", letter: "L" },
    };
    return configs[platform] || { bg: "bg-gray-400", letter: "?" };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">My Accounts</h2>
        <Button
          className="hover:cursor-pointer"
          onClick={() => setIsConnectPopupOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Connect Account
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Connected Account Cards */}
        {connectedAccounts.map((account, index) => {
          const config = getPlatformConfig(account.platform);
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 ${config.bg} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white text-xl">{config.letter}</span>
                </div>
                <div>
                  <h3 className="font-semibold capitalize">
                    {account.platform}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {account.username}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full hover:cursor-pointer">
                Manage
              </Button>
            </Card>
          );
        })}

        {/* Add Account Card */}
        <Card
          className="p-6 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => setIsConnectPopupOpen(true)}
        >
          <Plus className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Connect New Account</p>
        </Card>
      </div>

      <ConnectAccountPopup
        isOpen={isConnectPopupOpen}
        onClose={() => setIsConnectPopupOpen(false)}
        onSubmit={handleConnectAccount}
      />
    </div>
  );
}
