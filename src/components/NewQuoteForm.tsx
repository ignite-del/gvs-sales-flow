
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { validateGSTIN, formatCurrency } from "@/utils/validation";
import { useToast } from "@/hooks/use-toast";

interface QuoteItem {
  description: string;
  quantity: number;
  price: number;
}

interface NewQuoteFormProps {
  onSuccess: () => void;
}

const NewQuoteForm = ({ onSuccess }: NewQuoteFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [quoteTitle, setQuoteTitle] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [items, setItems] = useState<QuoteItem[]>([
    { description: "", quantity: 1, price: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof QuoteItem, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quoteTitle.trim()) {
      toast({
        title: "Error",
        description: "Quote title is required",
        variant: "destructive",
      });
      return;
    }

    if (gstNumber && !validateGSTIN(gstNumber)) {
      toast({
        title: "Error",
        description: "Please enter a valid GST number (15 characters)",
        variant: "destructive",
      });
      return;
    }

    const validItems = items.filter(item => 
      item.description.trim() && item.quantity > 0 && item.price > 0
    );

    if (validItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one valid item",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create quote
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          user_id: user?.id,
          quote_title: quoteTitle,
          gst_number: gstNumber || null,
          currency: 'INR'
        })
        .select()
        .single();

      if (quoteError) throw quoteError;

      // Create quote items
      const quoteItems = validItems.map(item => ({
        quote_id: quote.id,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        amount: item.quantity * item.price
      }));

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(quoteItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Success",
        description: "Quote created successfully",
      });

      // Reset form
      setQuoteTitle("");
      setGstNumber("");
      setItems([{ description: "", quantity: 1, price: 0 }]);
      onSuccess();

    } catch (error) {
      console.error('Error creating quote:', error);
      toast({
        title: "Error",
        description: "Failed to create quote",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create New Quote</h2>
        <p className="text-gray-600">Fill in the details below to create a new quote</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quote Details</CardTitle>
            <CardDescription>Basic information about your quote</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quote-title">Quote Title *</Label>
                <Input
                  id="quote-title"
                  value={quoteTitle}
                  onChange={(e) => setQuoteTitle(e.target.value)}
                  placeholder="Enter quote title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gst-number">GST Number</Label>
                <Input
                  id="gst-number"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                  placeholder="22AAAAA0000A1Z5"
                  maxLength={15}
                />
                <p className="text-xs text-gray-500">15-character GST number (optional)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Quote Items</CardTitle>
                <CardDescription>Add items to your quote</CardDescription>
              </div>
              <Button type="button" onClick={addItem} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg">
                <div className="md:col-span-5">
                  <Label>Description *</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Item description"
                    className="mt-1"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Quantity *</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Price (₹) *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Amount</Label>
                  <div className="mt-1 p-2 bg-gray-50 rounded text-right font-medium">
                    {formatCurrency(item.quantity * item.price)}
                  </div>
                </div>
                <div className="md:col-span-1 flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                    className="w-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-green-600">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Creating..." : "Create Quote"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewQuoteForm;
