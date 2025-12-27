import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Clock, Save, Calculator, ChevronDown, Hash, Cpu, Minus, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { appliances, ApplianceModel } from '@/data/appliances';
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

const MAX_QUANTITY = 25;

const ApplianceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, saveBill } = useUser();
  
  const appliance = appliances.find(a => a.id === id);
  
  const defaultModel = appliance?.models.find(m => m.isDefault) || appliance?.models[0];
  
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState<ApplianceModel | undefined>(defaultModel);
  const [showQuantitySheet, setShowQuantitySheet] = useState(false);
  const [showModelSheet, setShowModelSheet] = useState(false);
  const [result, setResult] = useState<BillResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  if (!appliance || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Appliance not found</p>
      </div>
    );
  }

  const effectivePower = selectedModel?.power || appliance.power;
  const totalPower = effectivePower * quantity;

  const handleCalculate = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;

    if (h === 0 && m === 0) {
      toast.error('Please enter usage time');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const billResult = calculateBill(totalPower, h, m, user.ltCategory);
      setResult(billResult);
      setIsCalculating(false);
    }, 500);
  };

  const handleSave = () => {
    if (!result) return;

    saveBill({
      applianceName: appliance.name,
      applianceIcon: appliance.icon,
      power: effectivePower,
      modelName: selectedModel?.name || 'Average',
      quantity: quantity,
      hours: parseInt(hours) || 0,
      minutes: parseInt(minutes) || 0,
      units: result.units
    });

    toast.success('Bill saved successfully!');
    navigate('/saved-bills');
  };

  const incrementQuantity = () => {
    if (quantity < MAX_QUANTITY) {
      setQuantity(quantity + 1);
      setResult(null);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setResult(null);
    }
  };

  const handleModelSelect = (model: ApplianceModel) => {
    setSelectedModel(model);
    setShowModelSheet(false);
    setResult(null);
  };

  const handleQuantitySelect = (num: number) => {
    setQuantity(num);
    setShowQuantitySheet(false);
    setResult(null);
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
          <p className="text-muted-foreground mt-2">
            Selected Power: <span className="text-primary font-semibold">{effectivePower}W</span>
            {quantity > 1 && (
              <span className="text-accent"> × {quantity} = {totalPower}W</span>
            )}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Category: {user.ltCategory === 'LT-I' ? 'Home (LT-I)' : 'Office/Shops (LT-II)'}
          </p>
        </div>

        {/* Model Selection */}
        <div className="card-3d p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Select {appliance.name} Model / Type</h3>
          </div>
          
          <Sheet open={showModelSheet} onOpenChange={setShowModelSheet}>
            <SheetTrigger asChild>
              <button
                className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-left">
                  <p className="font-medium">{selectedModel?.name || 'Select Model'}</p>
                  <p className="text-sm text-muted-foreground">{effectivePower}W</p>
                </div>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
              <SheetHeader className="pb-4">
                <SheetTitle>Select {appliance.name} Model / Type</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(70vh-100px)]">
                <div className="space-y-2 pr-4">
                  {appliance.models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelSelect(model)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                        selectedModel?.id === model.id 
                          ? 'bg-primary/20 border-2 border-primary' 
                          : 'bg-secondary/50 border border-border hover:bg-secondary/80'
                      }`}
                    >
                      <div className="text-left flex-1">
                        <p className={`font-medium ${model.isDefault ? 'text-accent' : ''}`}>
                          {model.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-primary font-semibold">{model.power}W</span>
                        {selectedModel?.id === model.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        {/* Quantity Selection */}
        <div className="card-3d p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">How many {appliance.name}s are there?</h3>
          </div>
          
          {/* Stepper Control */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="w-12 h-12 rounded-full bg-secondary/50 border border-border hover:bg-secondary hover:border-primary/50 transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-5 h-5" />
            </button>
            
            <Sheet open={showQuantitySheet} onOpenChange={setShowQuantitySheet}>
              <SheetTrigger asChild>
                <button className="w-20 h-16 rounded-xl bg-primary/10 border-2 border-primary/50 hover:border-primary transition-colors flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{quantity}</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl">
                <SheetHeader className="pb-4">
                  <SheetTitle>Select Quantity</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(60vh-100px)]">
                  <div className="grid grid-cols-5 gap-3 pr-4">
                    {Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        onClick={() => handleQuantitySelect(num)}
                        className={`p-4 rounded-xl text-lg font-semibold transition-colors ${
                          quantity === num 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary/50 border border-border hover:bg-secondary/80 hover:border-primary/50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            
            <button
              onClick={incrementQuantity}
              disabled={quantity >= MAX_QUANTITY}
              className="w-12 h-12 rounded-full bg-secondary/50 border border-border hover:bg-secondary hover:border-primary/50 transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Tap the number to select from list
          </p>
        </div>

        {/* Usage Input */}
        <div className="card-3d p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.15s' }}>
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
                onChange={(e) => {
                  setHours(e.target.value);
                  setResult(null);
                }}
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
                onChange={(e) => {
                  setMinutes(e.target.value);
                  setResult(null);
                }}
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
                <span className="text-muted-foreground">Model/Type</span>
                <span className="font-semibold text-sm">{selectedModel?.name}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">Quantity × Power</span>
                <span className="font-semibold">{quantity} × {effectivePower}W = {totalPower}W</span>
              </div>

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
