import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Trash2, Receipt, Gauge, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { format } from 'date-fns';
import { toast } from 'sonner';

const SavedBills = () => {
  const navigate = useNavigate();
  const { savedBills, deleteBill, getCumulativeBill, user } = useUser();
  
  const cumulativeBill = getCumulativeBill();

  const handleDelete = (id: string, name: string) => {
    deleteBill(id);
    toast.success(`${name} bill deleted`);
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
          <div>
            <h1 className="text-lg font-semibold">Saved Bills</h1>
            <p className="text-xs text-muted-foreground">{user?.ltCategory === 'LT-I' ? 'Home' : 'Office/Shops'} Tariff</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Cumulative Bill Summary Card */}
        <div className="card-3d p-6 animate-fade-in overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="relative space-y-4">
            {/* Total Units */}
            <div className="flex items-center justify-between pb-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Total Units</span>
              </div>
              <span className="text-xl font-bold">{cumulativeBill.totalUnits.toFixed(3)} kWh</span>
            </div>
            
            {/* Slab Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Applied Slab</p>
                <p className="font-semibold text-primary">{cumulativeBill.slabLabel}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Rate per Unit</p>
                <p className="font-semibold">₹{cumulativeBill.ratePerUnit.toFixed(2)}/kWh</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-border/30">
              <div className="space-y-1">
                <p className="text-muted-foreground">Energy Cost</p>
                <p className="font-semibold">₹{cumulativeBill.energyCost.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Customer Charge</p>
                <p className="font-semibold">₹{cumulativeBill.customerCharge.toFixed(2)}</p>
              </div>
            </div>

            {/* Final Total */}
            <div className="pt-4 border-t border-accent/30 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/20">
                <IndianRupee className="w-6 h-6 text-accent" />
                <span className="text-muted-foreground">Total Bill:</span>
                <span className="text-3xl font-bold text-accent">₹{cumulativeBill.totalCost.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{savedBills.length} appliance{savedBills.length !== 1 ? 's' : ''} saved</p>
            </div>
          </div>
        </div>

        {/* Bills List */}
        {savedBills.length === 0 ? (
          <div className="card-3d p-12 text-center animate-fade-in">
            <Receipt className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-muted-foreground">No Saved Bills</h3>
            <p className="text-sm text-muted-foreground mt-2">Calculate and save your first bill!</p>
            <Button 
              variant="electric" 
              className="mt-6"
              onClick={() => navigate('/home')}
            >
              <Zap className="w-4 h-4" />
              Start Calculating
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">Saved Appliances</h2>
            {savedBills.map((bill, index) => (
              <div 
                key={bill.id}
                className="card-3d p-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{bill.applianceIcon}</div>
                    <div>
                      <h3 className="font-semibold">{bill.applianceName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {bill.quantity > 1 ? `${bill.quantity} × ` : ''}{bill.power}W • {bill.units.toFixed(3)} kWh
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {bill.modelName} • {bill.hours}h {bill.minutes}m
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(bill.date), 'MMM dd, yyyy • hh:mm a')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(bill.id, bill.applianceName)}
                    className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedBills;
