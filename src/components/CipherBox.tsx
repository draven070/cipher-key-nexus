
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CryptoMethod, cryptoMethods, processText } from "@/lib/crypto";
import { toast } from "sonner";
import { ArrowRightLeft, Copy, LockKeyhole, Shield } from "lucide-react";

const CipherBox = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [key, setKey] = useState("");
  const [method, setMethod] = useState<CryptoMethod>("caesar");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  // Process the text whenever any of the inputs change
  useEffect(() => {
    if (inputText) {
      const result = processText(inputText, method, mode === "encrypt", key);
      setOutputText(result);
    } else {
      setOutputText("");
    }
  }, [inputText, method, mode, key]);

  // Copy output to clipboard
  const copyToClipboard = () => {
    if (!outputText) return;

    navigator.clipboard.writeText(outputText)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  // Switch between encrypt and decrypt modes
  const toggleMode = () => {
    setMode(prev => prev === "encrypt" ? "decrypt" : "encrypt");
    // Swap input and output text when toggling
    setInputText(outputText);
  };

  // Get the current method configuration
  const currentMethod = cryptoMethods.find(m => m.id === method) || cryptoMethods[0];

  return (
    <Card className="w-full shadow-xl border border-border/40 glass-morph">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-gradient">
              <Shield size={20} />
              CipherKey Nexus
            </CardTitle>
            <CardDescription>
              Encrypt and decrypt your messages with various algorithms
            </CardDescription>
          </div>

          <Button 
            variant="outline"
            className="gap-2 transition-all border-cipher-700/20 hover:bg-cipher-700/20"
            onClick={toggleMode}>
            <ArrowRightLeft size={14} />
            {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs value={method} onValueChange={(v) => setMethod(v as CryptoMethod)} className="w-full">
          <TabsList className="grid grid-cols-5 gap-2">
            {cryptoMethods.map((m) => (
              <TabsTrigger
                key={m.id}
                value={m.id}
                className="data-[state=active]:bg-cipher-700 data-[state=active]:text-white"
              >
                {m.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {currentMethod.requiresKey && (
          <div className="flex gap-2 items-center">
            <LockKeyhole size={16} className="text-cipher-400" />
            <Input
              type={currentMethod.keyType || 'text'}
              placeholder={currentMethod.keyPlaceholder || "Key"}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="bg-secondary/50 border-cipher-700/20 focus-visible:ring-cipher-500"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              {mode === "encrypt" ? "Plain Text" : "Encrypted Text"}
            </label>
            <Textarea
              placeholder={`Enter text to ${mode}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] resize-none bg-secondary/50 border-cipher-700/20 focus-visible:ring-cipher-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">
                {mode === "encrypt" ? "Encrypted Text" : "Decrypted Text"}
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                disabled={!outputText}
                className="text-xs h-6 px-2 gap-1"
              >
                <Copy size={12} />
                Copy
              </Button>
            </div>
            <Textarea
              placeholder="Result will appear here..."
              value={outputText}
              readOnly
              className="min-h-[200px] resize-none bg-secondary/80 border-cipher-700/30 focus-visible:ring-cipher-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CipherBox;
