import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plane, Calendar, Wallet, TrendingUp, Plus, ChevronRight, MapPin, Clock, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const upcomingTrips = [
    { id: '1', destination: 'Tokyo, Japan', date: 'Oct 12 - Oct 20', status: 'Upcoming', image: 'https://picsum.photos/seed/tokyo/400/300' },
    { id: '2', destination: 'Paris, France', date: 'Dec 05 - Dec 12', status: 'Planning', image: 'https://picsum.photos/seed/paris/400/300' },
  ];

  const budgetData = [
    { category: 'Food', spent: 450, budget: 600, color: '#6366f1' },
    { category: 'Transport', spent: 300, budget: 400, color: '#8b5cf6' },
    { category: 'Hotels', spent: 1200, budget: 1500, color: '#ec4899' },
    { category: 'Sightseeing', spent: 200, budget: 300, color: '#f59e0b' },
  ];

  const recentExpenses = [
    { id: '1', item: 'Sushi Dinner', amount: 85, date: 'Today', category: 'Food' },
    { id: '2', item: 'Metro Pass', amount: 25, date: 'Yesterday', category: 'Transport' },
    { id: '3', item: 'Museum Entry', amount: 40, date: '2 days ago', category: 'Sightseeing' },
  ];

  return (
    <div className="space-y-10 pb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Traveler!</h1>
          <p className="text-slate-500">Here's what's happening with your upcoming adventures.</p>
        </div>
        <Link to="/trip-planner">
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl gap-2 shadow-lg shadow-indigo-200">
            <Plus className="w-4 h-4" />
            New Trip
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Total Trips', value: '12', icon: Plane, color: 'bg-blue-50 text-blue-600' },
          { label: 'Countries Visited', value: '8', icon: MapPin, color: 'bg-green-50 text-green-600' },
          { label: 'Total Spent', value: '$4,250', icon: Wallet, color: 'bg-amber-50 text-amber-600' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Trips */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Upcoming Trips</h2>
            <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">View All</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-sm bg-white overflow-hidden group cursor-pointer">
                  <div className="relative h-40">
                    <img 
                      src={trip.image} 
                      alt={trip.destination} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur text-slate-900 border-none">
                        {trip.status}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900">{trip.destination}</h3>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {trip.date}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(j => (
                          <div key={j} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                            <img src={`https://i.pravatar.cc/150?u=${j}`} alt="User" />
                          </div>
                        ))}
                      </div>
                      <Button size="sm" variant="ghost" className="text-slate-400 group-hover:text-indigo-600">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Budget Visualization */}
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Budget Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetData} layout="vertical" margin={{ left: 20, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="category" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="spent" radius={[0, 4, 4, 0]} barSize={20}>
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {budgetData.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{item.category}</p>
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(item.spent)} / {formatCurrency(item.budget)}</p>
                    <Progress value={(item.spent / item.budget) * 100} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Recent Expenses & Quick Tips */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">Recent Expenses</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50 px-6">
                {recentExpenses.map((expense) => (
                  <div key={expense.id} className="py-4 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{expense.item}</p>
                        <p className="text-xs text-slate-500">{expense.category} • {expense.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">-{formatCurrency(expense.amount)}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50 text-center">
                <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-500 hover:text-indigo-600">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-indigo-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <CardContent className="p-6 space-y-4 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold leading-tight">AI Travel Tip</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                "Traveling to Tokyo? Get a Suica card for seamless transport. Most small shops now accept it too!"
              </p>
              <Button variant="secondary" size="sm" className="w-full bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg font-bold">
                Get More Tips
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
