
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import QuoteList from "./QuoteList";
import NewQuoteForm from "./NewQuoteForm";
import UserSettings from "./UserSettings";
import Logo from "@/components/ui/logo";

const QuoteManagement = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("quotes");

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo size="md" variant="compact" />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="quotes" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Quotes</span>
            </TabsTrigger>
            <TabsTrigger value="new-quote" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Quote</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="space-y-6">
            <QuoteList />
          </TabsContent>

          <TabsContent value="new-quote" className="space-y-6">
            <NewQuoteForm onSuccess={() => setActiveTab("quotes")} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <UserSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default QuoteManagement;
