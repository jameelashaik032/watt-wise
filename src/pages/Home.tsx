import { useNavigate } from 'react-router-dom';
import { Settings, Save, Zap } from 'lucide-react';
import { appliances } from '@/data/appliances';
import { useUser } from '@/contexts/UserContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, getTotalBill } = useUser();

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate('/saved-bills')}
            className="relative p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <Save className="w-6 h-6 text-primary" />
            {getTotalBill() > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-gradient">Watt Scope</h1>
          </div>

          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <Settings className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Welcome Message */}
      <div className="px-4 py-6">
        <p className="text-muted-foreground text-sm">Welcome, {user?.username}</p>
        <h2 className="text-2xl font-bold mt-1">Select an Appliance</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Category: <span className="text-primary font-medium">{user?.ltCategory === 'LT-I' ? 'Home' : 'Office/Shops'}</span>
        </p>
      </div>

      {/* Appliance Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {appliances.map((appliance, index) => (
            <button
              key={appliance.id}
              onClick={() => navigate(`/appliance/${appliance.id}`)}
              className="card-3d p-4 text-left animate-fade-in group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-400/10 group-hover:from-primary/30 group-hover:to-cyan-400/20 transition-all duration-300">
                  <appliance.IconComponent className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {appliance.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {appliance.power}W
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      {getTotalBill() > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => navigate('/saved-bills')}
            className="w-full glass rounded-xl p-4 flex items-center justify-between animate-scale-in"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Total Bill</p>
                <p className="text-lg font-bold text-accent">₹{getTotalBill().toFixed(2)}</p>
              </div>
            </div>
            <span className="text-primary text-sm font-medium">View All →</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
