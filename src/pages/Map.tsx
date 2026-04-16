import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Search, Navigation, Hotel, Utensils, Camera, Loader2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MapPage() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<'all' | 'hotels' | 'restaurants' | 'spots'>('all');

  const recommendations = [
    { name: "Grand Hyatt Tokyo", type: "Hotel", rating: 4.8, distance: "0.5 km", price: "$$$", image: "https://picsum.photos/seed/hotel1/400/300", category: "hotels" },
    { name: "Sushi Saito", type: "Restaurant", rating: 4.9, distance: "1.2 km", price: "$$$$", image: "https://picsum.photos/seed/food1/400/300", category: "restaurants" },
    { name: "Meiji Jingu", type: "Tourist Spot", rating: 4.7, distance: "2.5 km", price: "Free", image: "https://picsum.photos/seed/spot1/400/300", category: "spots" },
    { name: "Park Hyatt", type: "Hotel", rating: 4.9, distance: "3.1 km", price: "$$$$", image: "https://picsum.photos/seed/hotel2/400/300", category: "hotels" },
    { name: "Ichiran Ramen", type: "Restaurant", rating: 4.6, distance: "0.8 km", price: "$", image: "https://picsum.photos/seed/food2/400/300", category: "restaurants" },
  ];

  const filtered = recommendations.filter(r => category === 'all' || r.category === category);

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Sidebar */}
      <div className="w-96 flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Explore Nearby</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search places..." 
              className="pl-10 h-12 bg-white border-slate-200 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'all', label: 'All', icon: MapPin },
              { id: 'hotels', label: 'Hotels', icon: Hotel },
              { id: 'restaurants', label: 'Food', icon: Utensils },
              { id: 'spots', label: 'Spots', icon: Camera },
            ].map((item) => (
              <Button
                key={item.id}
                variant={category === item.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory(item.id as any)}
                className={cn(
                  "rounded-full gap-2 whitespace-nowrap",
                  category === item.id ? "bg-indigo-600" : "bg-white text-slate-600"
                )}
              >
                <item.icon className="w-3 h-3" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1 -mx-2 px-2">
          <div className="space-y-4">
            {filtered.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group">
                  <div className="flex gap-4 p-3">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          {item.rating}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">{item.type} • {item.distance}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-bold text-indigo-600">{item.price}</span>
                        <Button size="sm" variant="ghost" className="h-8 px-2 text-indigo-600 hover:bg-indigo-50">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative rounded-3xl overflow-hidden bg-slate-200 border border-slate-300 shadow-inner">
        {/* Placeholder for Google Maps */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-4">
          <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center animate-pulse">
            <Navigation className="w-10 h-10" />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-500">Interactive Map Loading...</p>
            <p className="text-sm">Connecting to Google Maps API</p>
          </div>
        </div>

        {/* Map Controls Overlay */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-2">
          <Button size="icon" className="bg-white text-slate-900 shadow-lg hover:bg-slate-50 rounded-xl">
            <Navigation className="w-5 h-5" />
          </Button>
          <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-none border-b border-slate-100">+</Button>
            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-none">-</Button>
          </div>
        </div>

        {/* Floating Search Bar Overlay */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/20 flex gap-2">
            <Input 
              placeholder="Search destination..." 
              className="border-none bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
