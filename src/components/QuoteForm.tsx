
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuoteFormProps {
  onBack: () => void;
}

interface LineItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

const QuoteForm = ({ onBack }: QuoteFormProps) => {
  const { toast } = useToast();
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", productName: "", quantity: 1, unitPrice: 0, discount: 0, total: 0 }
  ]);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      productName: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      total: 0
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Calculate total when quantity, unitPrice, or discount changes
        if (field === 'quantity' || field === 'unitPrice' || field === 'discount') {
          const subtotal = Number(updated.quantity) * Number(updated.unitPrice);
          const discountAmount = subtotal * (Number(updated.discount) / 100);
          updated.total = subtotal - discountAmount;
        }
        return updated;
      }
      return item;
    }));
  };

  const calculateGrandTotal = () => {
    return lineItems.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSaveQuote = () => {
    toast({
      title: "Quote Saved",
      description: "Your quote has been saved successfully.",
    });
  };

  const handleGeneratePDF = () => {
    toast({
      title: "PDF Generated",
      description: "Quote PDF has been generated and is ready for download.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Quote</h1>
          <p className="text-gray-600">Generate a professional quotation for your customer</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input id="customerName" placeholder="Acme Corporation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input id="contactPerson" placeholder="John Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@acme.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="123 Business St, Suite 100, City, State 12345" />
            </div>
          </CardContent>
        </Card>

        {/* Quote Details */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quoteNumber">Quote Number</Label>
              <Input id="quoteNumber" value="Q-2024-004" readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quoteDate">Quote Date</Label>
              <Input id="quoteDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input id="validUntil" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net30">Net 30 days</SelectItem>
                  <SelectItem value="net15">Net 15 days</SelectItem>
                  <SelectItem value="immediate">Due on receipt</SelectItem>
                  <SelectItem value="net60">Net 60 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Line Items</CardTitle>
            <Button onClick={addLineItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lineItems.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-lg">
                <div className="col-span-4">
                  <Label htmlFor={`product-${item.id}`}>Product/Service</Label>
                  <Input
                    id={`product-${item.id}`}
                    value={item.productName}
                    onChange={(e) => updateLineItem(item.id, 'productName', e.target.value)}
                    placeholder="Product name or service description"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    min="1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`price-${item.id}`}>Unit Price</Label>
                  <Input
                    id={`price-${item.id}`}
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`discount-${item.id}`}>Discount %</Label>
                  <Input
                    id={`discount-${item.id}`}
                    type="number"
                    value={item.discount}
                    onChange={(e) => updateLineItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>
                <div className="col-span-1">
                  <Label>Total</Label>
                  <div className="h-10 flex items-center font-medium text-gray-900">
                    ${item.total.toFixed(2)}
                  </div>
                </div>
                <div className="col-span-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLineItem(item.id)}
                    disabled={lineItems.length === 1}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Grand Total:</span>
                <span className="text-blue-600">${calculateGrandTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes & Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add any special terms, conditions, or notes for this quote..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button variant="outline" onClick={handleSaveQuote}>
          Save Draft
        </Button>
        <Button onClick={handleGeneratePDF} className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Generate PDF
        </Button>
      </div>
    </div>
  );
};

export default QuoteForm;
