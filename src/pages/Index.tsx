
import Layout from "@/components/Layout";
import CipherBox from "@/components/CipherBox";
import InfoCard from "@/components/InfoCard";
import { Key, Lock, FileKey, ShieldCheck } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gradient">
            Encryption & Decryption Tool
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn the basics of cryptography through practice
          </p>
        </div>

        <CipherBox />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <InfoCard
            title="Caesar Cipher"
            description="A simple substitution cipher where each letter is shifted by a fixed number."
            icon={Key}
          />
          <InfoCard
            title="AES"
            description="Advanced Encryption Standard - a specification for the encryption of electronic data."
            icon={Lock}
            color="text-cyan-500"
          />
          <InfoCard
            title="Base64 & Base32"
            description="Encoding schemes that represent binary data in ASCII string format."
            icon={FileKey}
            color="text-emerald-500"
          />
          <InfoCard
            title="URL Encoding"
            description="Special characters are replaced with % followed by hex digits."
            icon={ShieldCheck}
            color="text-violet-500"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
