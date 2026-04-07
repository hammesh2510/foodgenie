import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Clock, CheckCircle, Package } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Failed to parse user details', e);
      }
    }
  }, []);

  if (!user) {
    // If we rendering this component without a user, it might be loading or unauthorized
    // but the ProtectedRoutes should catch this first.
    return <div className="p-8 text-center text-gray-500">Loading user data...</div>;
  }

  // Mock Orders Data
  const recentOrders = [
    {
      id: "ORD-73921",
      restaurant: "Burger King",
      date: "Oct 12, 2026",
      total: "$24.50",
      status: "Delivered",
      items: "2x Whopper Meal, 1x Onion Rings",
      imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: "ORD-73894",
      restaurant: "Spice Symphony Indian",
      date: "Oct 10, 2026",
      total: "$38.00",
      status: "Delivered",
      items: "1x Butter Chicken, 2x Garlic Naan, 1x Samosa Chat",
      imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: "ORD-73855",
      restaurant: "Pizza Hut",
      date: "Oct 05, 2026",
      total: "$42.99",
      status: "Cancelled",
      items: "1x Large Pepperoni, 1x Garlic Bread",
      imageUrl: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Preparing': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in py-8">
      
      {/* Header section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Account Settings / User Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-orange-400 to-orange-600"></div>
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-12 left-6 h-24 w-24 bg-white rounded-full p-2 shadow-md">
                <div className="h-full w-full bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <User size={40} />
                </div>
              </div>
              <div className="pt-14">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500 font-medium capitalize">{user.role}</p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-3 text-gray-400" />
                  <span>+1 (555) 123-4567</span> {/* Mock phone number */}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                  <span>123 Main St, New York, NY 10001</span> {/* Mock address */}
                </div>
              </div>

              <button className="w-full mt-8 bg-orange-50 text-orange-600 hover:bg-orange-100 font-medium py-2.5 rounded-lg transition-colors border border-orange-200">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="mr-2 h-5 w-5 text-orange-500" />
              Account Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-orange-50 p-4 rounded-xl">
                <p className="text-3xl font-bold text-orange-600">12</p>
                <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide font-semibold">Total Orders</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-3xl font-bold text-gray-800">4</p>
                <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide font-semibold">Saved Places</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Clock className="mr-2 h-6 w-6 text-orange-500" />
                Recent Orders
              </h2>
              <button className="text-orange-600 font-medium hover:text-orange-700 text-sm">View All</button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors bg-gray-50/50 flex flex-col sm:flex-row gap-4">
                  
                  {/* Restaurant Image */}
                  <div className="h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={order.imageUrl} alt={order.restaurant} className="h-full w-full object-cover" />
                  </div>
                  
                  {/* Order Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-gray-900">{order.restaurant}</h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{order.items}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 border-t border-gray-200/60 pt-3">
                      <div className="text-sm text-gray-500">
                        {order.date} <span className="mx-2">•</span> {order.id}
                      </div>
                      <div className="font-bold text-gray-900">
                        {order.total}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
