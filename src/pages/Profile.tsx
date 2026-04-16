import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Heart, History, Settings, User, Mail, Globe, Shield } from 'lucide-react';

export default function Profile() {
  const user = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    location: "San Francisco, CA",
    joined: "March 2024",
    trips: 12,
    countries: 8,
    avatar: "https://i.pravatar.cc/150?u=alex"
  };

  const travelHistory = [
    { destination: "Rome, Italy", date: "June 2024", image: "https://picsum.photos/seed/rome/400/300" },
    { destination: "London, UK", date: "April 2024", image: "https://picsum.photos/seed/london/400/300" },
    { destination: "New York, USA", date: "January 2024", image: "https://picsum.photos/seed/nyc/400/300" },
  ];

  const wishlist = [
    { destination: "Reykjavik, Iceland", added: "2 weeks ago", image: "https://picsum.photos/seed/iceland/400/300" },
    { destination: "Cape Town, South Africa", added: "1 month ago", image: "https://picsum.photos/seed/capetown/400/300" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      {/* Profile Header */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600"></div>
        <CardContent className="p-8 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-4xl bg-slate-100 text-slate-400">AJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2 pb-2">
              <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
              <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {user.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {user.joined}</span>
              </div>
            </div>
            <div className="flex gap-3 pb-2">
              <Button variant="outline" className="rounded-xl gap-2">
                <Settings className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl">
                Share Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-slate-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{user.trips}</p>
              <p className="text-sm text-slate-500">Total Trips</p>
            </div>
            <div className="text-center border-x border-slate-100">
              <p className="text-2xl font-bold text-slate-900">{user.countries}</p>
              <p className="text-sm text-slate-500">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">24</p>
              <p className="text-sm text-slate-500">Reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="history" className="space-y-8">
        <TabsList className="bg-white p-1 border border-slate-200 rounded-xl h-12">
          <TabsTrigger value="history" className="rounded-lg gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">
            <History className="w-4 h-4" />
            Travel History
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="rounded-lg gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">
            <Heart className="w-4 h-4" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">
            <Settings className="w-4 h-4" />
            Account Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {travelHistory.map((trip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-sm bg-white overflow-hidden group cursor-pointer">
                  <div className="h-40 overflow-hidden">
                    <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-slate-900">{trip.destination}</h4>
                    <p className="text-sm text-slate-500">{trip.date}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {wishlist.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-sm bg-white overflow-hidden group cursor-pointer">
                  <div className="h-40 overflow-hidden relative">
                    <img src={item.image} alt={item.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full text-red-500 hover:bg-red-50">
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-slate-900">{item.destination}</h4>
                    <p className="text-sm text-slate-500">Added {item.added}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 uppercase font-bold">Full Name</p>
                  <p className="text-slate-900 font-medium">{user.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 uppercase font-bold">Email Address</p>
                  <p className="text-slate-900 font-medium">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 uppercase font-bold">Location</p>
                  <p className="text-slate-900 font-medium">{user.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-3 rounded-xl">
                  <Globe className="w-4 h-4" />
                  Public Profile Visibility
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 rounded-xl">
                  <Mail className="w-4 h-4" />
                  Email Notifications
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
