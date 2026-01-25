import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const USSDDemo = () => {
  const [screen, setScreen] = useState(0);
  const [input, setInput] = useState("");

  const screens = [
    {
      title: "Welcome to Agri-Bridge",
      content: `Welcome to Agri-Bridge
      
1. Buy Produce
2. Sell Produce
3. Track Order
4. My Account

Reply with option number:`,
    },
    {
      title: "Buy Produce",
      content: `Select Category:

1. Vegetables
2. Fruits
3. Tubers
4. Grains
0. Back

Reply with option number:`,
    },
    {
      title: "Tubers",
      content: `Available Tubers:

1. Yam - 10 GHS/tuber
2. Cassava - 8 GHS/kg
3. Cocoyam - 6 GHS/kg
0. Back

Reply with option number:`,
    },
    {
      title: "Order Confirmation",
      content: `Yam Tubers
Price: 10 GHS/tuber

Enter quantity:`,
    },
    {
      title: "Confirm Order",
      content: `Order Summary:
Item: Yam Tubers
Qty: 50 tubers
Total: 500 GHS

1. Confirm Order
2. Cancel
0. Back`,
    },
    {
      title: "Success",
      content: `Order Confirmed!

Order ID: AGR-2026-001
An agent will contact you shortly.

Thank you for using Agri-Bridge!

Press any key to start over.`,
    },
  ];

  const handleInput = (value: string) => {
    setInput(value);
  };

  const handleSubmit = () => {
    if (screen < screens.length - 1) {
      setScreen((prev) => prev + 1);
    } else {
      setScreen(0);
    }
    setInput("");
  };

  const handleBack = () => {
    if (screen > 0) {
      setScreen((prev) => prev - 1);
    }
    setInput("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-primary mx-auto flex items-center justify-center mb-6">
            <Phone className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">USSD Demo</h1>
          <p className="text-muted-foreground">
            Experience how Agri-Bridge works on basic phones without internet access.
            Dial *123*456# to access the real service.
          </p>
        </div>

        {/* Phone Mockup */}
        <div className="max-w-xs mx-auto">
          <div className="bg-foreground rounded-[2.5rem] p-3 shadow-2xl">
            <div className="bg-card rounded-[2rem] overflow-hidden">
              {/* Phone Header */}
              <div className="bg-primary px-4 py-3 flex items-center justify-between">
                <span className="text-primary-foreground text-sm font-medium">*123*456#</span>
                <span className="text-primary-foreground/70 text-xs">Agri-Bridge</span>
              </div>

              {/* Screen Content */}
              <div className="p-4 min-h-[350px] bg-card">
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                    {screens[screen].content}
                  </pre>
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => handleInput(e.target.value)}
                    placeholder="Enter response"
                    className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground"
                  />
                  <Button onClick={handleSubmit} size="sm">
                    Send
                  </Button>
                </div>

                {screen > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="mt-2 w-full"
                  >
                    ← Back
                  </Button>
                )}
              </div>

              {/* Phone Footer */}
              <div className="bg-muted h-8 flex items-center justify-center">
                <div className="w-24 h-1 bg-foreground/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default USSDDemo;
