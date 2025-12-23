import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Home, Building, Info } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) {
    navigate('/login');
    return null;
  }

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
          <h1 className="text-lg font-semibold">Profile</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Avatar */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-cyan-400 text-4xl font-bold text-primary-foreground">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
          <p className="text-muted-foreground mt-1">
            {user.ltCategory === 'LT-I' ? 'Home Consumer' : 'Commercial Consumer'}
          </p>
        </div>

        {/* User Info */}
        <div className="card-3d p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/20">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/20">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/20">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/20">
              {user.ltCategory === 'LT-I' ? (
                <Home className="w-5 h-5 text-primary" />
              ) : (
                <Building className="w-5 h-5 text-primary" />
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">LT Category</p>
              <p className="font-medium">
                {user.ltCategory} ({user.ltCategory === 'LT-I' ? 'Home' : 'Office/Shops'})
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="card-3d p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">About Watt Scope</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Watt Scope helps you track and manage your electricity consumption efficiently. 
            Monitor individual appliance usage and calculate costs to save energy and money. 
            Get accurate billing based on your LT category and current slab rates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
