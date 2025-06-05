
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import QuoteForm from "@/components/QuoteForm";
import CustomerList from "@/components/CustomerList";
import DocumentList from "@/components/DocumentList";
import { 
  Building2, 
  FileText, 
  DollarSign, 
  Users, 
  TrendingUp,
  Plus,
  Calendar
} from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeView, setActiveView] = useState("dashboard");

  const stats = [
    {
      title: "Total Quotes",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Active Invoices",
      value: "18",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Customers",
      value: "56",
      change: "+23%",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Monthly Revenue",
      value: "$45,280",
      change: "+18%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentQuotes = [
    { id: "Q-2024-001", customer: "Acme Corp", amount: "$12,500", status: "pending", date: "2024-01-15" },
    { id: "Q-2024-002", customer: "TechStart Inc", amount: "$8,750", status: "approved", date: "2024-01-14" },
    { id: "Q-2024-003", customer: "Global Systems", amount: "$23,400", status: "draft", date: "2024-01-13" },
  ];

  const renderContent = () => {
    switch (activeView) {
      case "create-quote":
        return <QuoteForm onBack={() => setActiveView("dashboard")} />;
      case "customers":
        return <CustomerList />;
      case "documents":
        return <DocumentList />;
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your sales.</p>
              </div>
              <Button 
                onClick={() => setActiveView("create-quote")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Quote
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Recent Quotes</span>
                  </CardTitle>
                  <CardDescription>Your latest quotations and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentQuotes.map((quote) => (
                      <div key={quote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{quote.id}</p>
                          <p className="text-sm text-gray-600">{quote.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{quote.amount}</p>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={quote.status === "approved" ? "default" : 
                                      quote.status === "pending" ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {quote.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveView("documents")}>
                    View All Documents
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>Common tasks to help you work faster</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12"
                      onClick={() => setActiveView("create-quote")}
                    >
                      <Plus className="h-4 w-4 mr-3" />
                      Create New Quote
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12"
                      onClick={() => setActiveView("customers")}
                    >
                      <Users className="h-4 w-4 mr-3" />
                      Manage Customers
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12"
                      onClick={() => setActiveView("documents")}
                    >
                      <FileText className="h-4 w-4 mr-3" />
                      View All Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        onLogout={onLogout}
      />
      
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
