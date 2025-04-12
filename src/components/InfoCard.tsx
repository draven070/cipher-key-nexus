
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
}

const InfoCard = ({ title, description, icon: Icon, color = "text-cipher-500" }: InfoCardProps) => {
  return (
    <Card className="h-full border border-border/40 glass-morph">
      <CardHeader>
        <div className={`${color} mb-2`}>
          <Icon size={24} />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground"></CardContent>
    </Card>
  );
};

export default InfoCard;
