import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TCh2 } from '@/components/Typography';
import { Check, Crown } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: 'Rp 0',
    benefits: ['Unlimited canvas (for now)', 'Basic AI suggestions', 'Community support (soon)'],
    icon: <Check className="text-black" size={32} />,
    button: { label: 'Current Plan', disabled: true }
  },
  {
    name: 'Pro 👀',
    price: 'Rp XX.XXX',
    benefits: ['#####', '#####', '#####', '#####'],
    icon: <Crown className="text-black" size={32} />,
    button: { label: 'Coming Soon', disabled: true }
  }
];

export default function Pricings() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white py-16">
      <TCh2 className="mb-8 text-center text-black">Tier List</TCh2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center">
        {tiers.map((tier) => (
          <Card key={tier.name} className="flex-1 min-w-[280px] max-w-xs border border-gray-200 bg-white">
            <CardHeader className="flex flex-col items-center gap-2">
              {tier.icon}
              <CardTitle className="text-2xl font-bold text-black">{tier.name}</CardTitle>
              <div className="text-3xl font-extrabold text-black">{tier.price}</div>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 mt-2 mb-4">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-black">
                    <Check className="text-black" size={18} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button disabled={tier.button.disabled} className="w-full">
                {tier.button.label}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
