import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Trash2, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { format } from 'date-fns';
import { toast } from 'sonner';

const SavedBills = () => {
  const navigate = useNavigate();
  const { savedBills, deleteBill, getTotalBill } = useUser();

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
          <h1 className="text-lg font-semibold">Saved Bills</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Total Bill Card */}
        <div className="card-3d p-6 text-center animate-fade-in overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="relative">
            <div className="inline-flex p-4 rounded-2xl bg-accent/20 mb-4">
              <Zap className="w-10 h-10 text-accent" />
            </div>
            <p className="text-muted-foreground">Total Electricity Bill</p>
            <p className="text-4xl font-bold text-accent mt-2">₹{getTotalBill().toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">{savedBills.length} saved items</p>
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
                        {bill.units.toFixed(3)} kWh • {bill.hours}h {bill.minutes}m
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(bill.date), 'MMM dd, yyyy • hh:mm a')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-accent">₹{bill.totalCost.toFixed(2)}</p>
                    <button
                      onClick={() => handleDelete(bill.id, bill.applianceName)}
                      className="mt-2 p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
