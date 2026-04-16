import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, MapPin, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      icon: Sparkles,
      title: "AI Trip Planner",
      description: "Get personalized itineraries based on your budget and interests."
    },
    {
      icon: MapPin,
      title: "Smart Recommendations",
      description: "Discover trending places and hidden gems with real-time data."
    },
    {
      icon: ShieldCheck,
      title: "Budget Tracker",
      description: "Keep your travel expenses in check with our integrated tracker."
    }
  ];

  const trendingDestinations = [
    { name: "Bali, Indonesia", image: "https://picsum.photos/seed/bali/800/600", rating: 4.8, cost: "$$$" },
    { name: "Santorini, Greece", image: "https://picsum.photos/seed/santorini/800/600", rating: 4.9, cost: "$$$$" },
    { name: "Kyoto, Japan", image: "https://picsum.photos/seed/kyoto/800/600", rating: 4.7, cost: "$$$" },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden flex items-center justify-center text-center px-6">
        <img 
          src="https://picsum.photos/seed/travel/1920/1080" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 max-w-3xl space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            Your Next Adventure <br /> Starts Here
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-200 font-light"
          >
            Plan your perfect trip with AI-powered itineraries, real-time maps, and budget tracking.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 justify-center pt-4"
          >
            <Link to="/trip-planner">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg rounded-full">
                Start Planning
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-8 h-14 text-lg rounded-full">
                Ask Assistant
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm bg-white p-6 h-full hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Trending Destinations */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Trending Destinations</h2>
            <p className="text-slate-600">Hand-picked places for your next getaway.</p>
          </div>
          <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
            View All
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trendingDestinations.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-slate-900 flex items-center gap-1">
                  ⭐ {dest.rating}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{dest.name}</h4>
                  <p className="text-slate-500 text-sm">Estimated Cost: {dest.cost}</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-indigo-50 hover:text-indigo-600">
                  <Plane className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
