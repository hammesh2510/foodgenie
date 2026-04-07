import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER'); // 'CUSTOMER' or 'OWNER'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.role === 'OWNER') {
          navigate('/partner/dashboard');
        } else if (data.user.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl animate-slide-up">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-tr from-brand-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg shadow-brand-500/30 mb-6">
            <Utensils className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Join FoodGenie
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {/* Role Selection */}
          <div className="flex bg-white/50 dark:bg-dark-900/50 p-1 rounded-xl shadow-inner border border-gray-100 dark:border-dark-700">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                role === 'CUSTOMER' ? 'bg-white dark:bg-dark-800 shadow-[0_2px_4px_rgb(0,0,0,0.05)] text-brand-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
              onClick={() => setRole('CUSTOMER')}
            >
              Hungry Customer
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                role === 'OWNER' ? 'bg-white dark:bg-dark-800 shadow-[0_2px_4px_rgb(0,0,0,0.05)] text-brand-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
              onClick={() => setRole('OWNER')}
            >
              Restaurant Partner
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="name"
                type="text"
                required
                className="input-field pl-10"
                placeholder={role === 'OWNER' ? "Restaurant Name" : "Full Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="input-field pl-10"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="password"
                type="password"
                required
                className="input-field pl-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full btn-primary py-3 text-lg flex items-center justify-center gap-2"
            >
              {isLoading ? 'Creating account...' : (
                <>
                  Create Account
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
