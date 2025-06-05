
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Edit, Phone, Mail } from "lucide-react";

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: 1,
      name: "Acme Corporation",
      contact: "John Smith",
      email: "john@acme.com",
      phone: "+1 (555) 123-4567",
      totalQuotes: 12,
      totalValue: "$45,600",
      status: "active",
      lastActivity: "2 days ago"
    },
    {
      id: 2,
      name: "TechStart Inc",
      contact: "Sarah Johnson",
      email: "sarah@techstart.com",
      phone: "+1 (555) 987-6543",
      totalQuotes: 8,
      totalValue: "$28,900",
      status: "active",
      lastActivity: "1 week ago"
    },
    {
      id: 3,
      name: "Global Systems",
      contact: "Mike Chen",
      email: "mike@globalsys.com",
      phone: "+1 (555) 456-7890",
      totalQuotes: 15,
      totalValue: "$67,200",
      status: "active",
      lastActivity: "3 days ago"
    },
    {
      id: 4,
      name: "Startup Innovations",
      contact: "Lisa Davis",
      email: "lisa@startup.com",
      phone: "+1 (555) 321-0987",
      totalQuotes: 3,
      totalValue: "$12,400",
      status: "prospect",
      lastActivity: "2 weeks ago"
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "prospect":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer relationships and contact information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers by name, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <p className="text-sm text-gray-600">{customer.contact}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(customer.status)} border-0`}>
                  {customer.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{customer.totalQuotes}</p>
                  <p className="text-xs text-gray-600">Total Quotes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{customer.totalValue}</p>
                  <p className="text-xs text-gray-600">Total Value</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">Last activity: {customer.lastActivity}</span>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && searchTerm && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No customers found matching "{searchTerm}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerList;
