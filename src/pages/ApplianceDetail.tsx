import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Clock, Save, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { appliances } from '@/data/appliances';
import { calculateBill } from '@/utils/billingCalculator';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

interface BillResult {
  units: number;
  ratePerUnit: number;
  energyCost: number;
  customerCharge: number;
  totalCost: number;
}

const ApplianceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, saveBill } = useUser();
  
  const appliance = appliances.find(a => a.id === id);
  
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [result, setResult] = useState<BillResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  if (!appliance || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Appliance not found</p>
      </div>
    );
  }

  const handleCalculate = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;

    if (h === 0 && m === 0) {
      toast.error('Please enter usage time');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const billResult = calculateBill(appliance.power, h, m, user.ltCategory);
      setResult(billResult);
      setIsCalculating(false);
    }, 500);
  };

  const handleSave = () => {
    if (!result) return;

    saveBill({
      applianceName: appliance.name,
      applianceIcon: appliance.icon,
      power: appliance.power,
      hours: parseInt(hours) || 0,
      minutes: parseInt(minutes) || 0,
      units: result.units,
      energyCost: result.energyCost,
      customerCharge: result.customerCharge,
      totalCost: result.totalCost,
      ratePerUnit: result.ratePerUnit
    });

    toast.success('Bill saved successfully!');
    navigate('/saved-bills');
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">{appliance.name}</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Appliance Card */}
        <div className="card-3d p-6 text-center animate-fade-in">
          <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-400/10 mb-4">
            <appliance.IconComponent className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{appliance.name}</h2>
          <p className="text-muted-foreground mt-2">Average Power: <span className="text-primary font-semibold">{appliance.power}W</span></p>
          <p className="text-sm text-muted-foreground mt-1">
            Category: {user.ltCategory === 'LT-I' ? 'Home (LT-I)' : 'Office/Shops (LT-II)'}
          </p>
        </div>

        {/* Usage Input */}
        <div className="card-3d p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Usage Duration</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Hours</label>
              <Input
                type="number"
                placeholder="0"
                min="0"
                max="24"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Minutes</label>
              <Input
                type="number"
                placeholder="0"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>
          </div>

          {result && (
            <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground">Rate per Unit</p>
              <p className="text-lg font-semibold text-primary">₹{result.ratePerUnit}/kWh</p>
            </div>
          )}

          <Button 
            variant="electric" 
            className="w-full" 
            size="lg"
            onClick={handleCalculate}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <Calculator className="w-5 h-5" />
                Calculate Bill
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="card-3d p-6 space-y-4 animate-scale-in">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Bill Breakdown</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">Units Consumed</span>
                <span className="font-semibold">{result.units.toFixed(3)} kWh</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">Energy Cost</span>
                <span className="font-semibold">₹{result.energyCost.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">Customer Charge</span>
                <span className="font-semibold">₹{result.customerCharge.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                <span className="font-semibold">Total Cost</span>
                <span className="text-2xl font-bold text-accent">₹{result.totalCost.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              variant="glow" 
              className="w-full" 
              size="lg"
              onClick={handleSave}
            >
              <Save className="w-5 h-5" />
              Save Bill
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplianceDetail;
