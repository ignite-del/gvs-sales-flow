
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Download, 
  Eye, 
  Edit, 
  FileText, 
  DollarSign,
  Calendar,
  User
} from "lucide-react";

const DocumentList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const quotes = [
    {
      id: "Q-2024-001",
      customer: "Acme Corporation",
      contact: "John Smith",
      amount: "$12,500.00",
      status: "pending",
      date: "2024-01-15",
      validUntil: "2024-02-15",
      type: "quote"
    },
    {
      id: "Q-2024-002",
      customer: "TechStart Inc",
      contact: "Sarah Johnson",
      amount: "$8,750.00",
      status: "approved",
      date: "2024-01-14",
      validUntil: "2024-02-14",
      type: "quote"
    },
    {
      id: "Q-2024-003",
      customer: "Global Systems",
      contact: "Mike Chen",
      amount: "$23,400.00",
      status: "draft",
      date: "2024-01-13",
      validUntil: "2024-02-13",
      type: "quote"
    }
  ];

  const invoices = [
    {
      id: "INV-2024-001",
      customer: "TechStart Inc",
      contact: "Sarah Johnson",
      amount: "$8,750.00",
      status: "paid",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      type: "invoice"
    },
    {
      id: "INV-2024-002",
      customer: "Global Systems",
      contact: "Mike Chen",
      amount: "$15,200.00",
      status: "sent",
      date: "2024-01-10",
      dueDate: "2024-02-10",
      type: "invoice"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
      case "sent":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvoices = invoices.filter(invoice =>
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DocumentCard = ({ document }: { document: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${document.type === 'quote' ? 'bg-blue-100' : 'bg-green-100'}`}>
              {document.type === 'quote' ? (
                <FileText className={`h-5 w-5 ${document.type === 'quote' ? 'text-blue-600' : 'text-green-600'}`} />
              ) : (
                <DollarSign className="h-5 w-5 text-green-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{document.id}</h3>
              <p className="text-sm text-gray-600">{document.customer}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(document.status)} border-0`}>
            {document.status}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{document.contact}</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">{document.amount}</span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Created: {document.date}</span>
            </div>
            {document.type === 'quote' && (
              <span>Valid until: {document.validUntil}</span>
            )}
            {document.type === 'invoice' && (
              <span>Due: {document.dueDate}</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-600 mt-1">Manage your quotes and invoices</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search documents by ID, customer, or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Document Tabs */}
      <Tabs defaultValue="quotes" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="quotes" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Quotes ({filteredQuotes.length})</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Invoices ({filteredInvoices.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quotes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map((quote) => (
              <DocumentCard key={quote.id} document={quote} />
            ))}
          </div>
          {filteredQuotes.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm ? `No quotes found matching "${searchTerm}"` : "No quotes found"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="invoices">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map((invoice) => (
              <DocumentCard key={invoice.id} document={invoice} />
            ))}
          </div>
          {filteredInvoices.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm ? `No invoices found matching "${searchTerm}"` : "No invoices found"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentList;
