import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plane, Calendar, Wallet, MapPin, Sparkles, Loader2, ChevronRight, Clock } from 'lucide-react';
import { generateTripItinerary } from '@/services/gemini';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export default function TripPlanner() {
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState('');
  const [itinerary, setItinerary] = useState<any>(null);

  const handleAddInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleGenerate = async () => {
    if (!destination || !budget || !duration) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const result = await generateTripItinerary(
        destination,
        Number(budget),
        Number(duration),
        interests
      );
      setItinerary(result);
      toast.success("Trip itinerary generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">AI Trip Planner</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Tell us your dream destination and preferences, and our AI will craft the perfect itinerary for you.
        </p>
      </div>

      <Card className="border-none shadow-lg bg-white overflow-hidden">
        <CardContent className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="destination">Where do you want to go?</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input 
                  id="destination"
                  placeholder="e.g. Tokyo, Japan" 
                  className="pl-10 h-12"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">How many days?</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input 
                  id="duration"
                  type="number"
                  placeholder="e.g. 5" 
                  className="pl-10 h-12"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Total Budget (USD)</Label>
              <div className="relative">
                <Wallet className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input 
                  id="budget"
                  type="number"
                  placeholder="e.g. 2000" 
                  className="pl-10 h-12"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Interests</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g. Food, History" 
                  className="h-12"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                />
                <Button onClick={handleAddInterest} variant="secondary" className="h-12 px-6">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="px-3 py-1 gap-1">
                    {interest}
                    <button onClick={() => handleRemoveInterest(interest)} className="hover:text-red-500">×</button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full h-14 text-lg bg-indigo-600 hover:bg-indigo-700 rounded-xl gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Crafting your itinerary...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate My Trip
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {itinerary && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">Your Itinerary</h2>
              <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-bold">
                Total Est. Cost: {formatCurrency(itinerary.totalEstimatedCost)}
              </div>
            </div>

            <div className="space-y-8">
              {itinerary.itinerary.map((dayPlan: any) => (
                <Card key={dayPlan.day} className="border-none shadow-sm bg-white overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b border-slate-100">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                        {dayPlan.day}
                      </span>
                      Day {dayPlan.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                      {dayPlan.activities.map((activity: any, i: number) => (
                        <div key={i} className="p-6 flex gap-6 hover:bg-slate-50 transition-colors">
                          <div className="w-20 text-sm font-medium text-slate-400 pt-1">
                            {activity.time}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <h4 className="text-lg font-bold text-slate-900">{activity.activity}</h4>
                              <Badge variant="outline" className="capitalize">
                                {activity.category}
                              </Badge>
                            </div>
                            {activity.location && (
                              <div className="flex items-center gap-1 text-slate-500 text-sm">
                                <MapPin className="w-3 h-3" />
                                {activity.location}
                              </div>
                            )}
                            {activity.cost > 0 && (
                              <div className="text-sm font-medium text-indigo-600">
                                Est. Cost: {formatCurrency(activity.cost)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Button size="lg" className="bg-slate-900 text-white px-12 h-14 rounded-full gap-2">
                Save Trip to My Profile
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
