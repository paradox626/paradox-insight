'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Search, FolderOpen, Trash2 } from 'lucide-react'

const platforms = [
  {
    id: 1,
    name: 'Everfit',
    description: 'Simple, drag-and-drop workout programming with progress tracking and habit coaching.',
    targetAudience: 'Solo trainers, gyms, and fitness organizations',
    keyFeatures: 'Simple drag-and-drop workout programming, progress tracking, habit coaching, visual progress graphs, integration with wearables (Apple Health, Google Fit, Garmin), custom branding',
    support: '24/7 email support, help articles, and video tutorials',
    pricing: 'Starts at $25/month for solo trainers, with team options',
    pros: 'Simple interface, wearable integrations, custom branding',
    cons: 'Limited customization for advanced features like payment processing and some automations',
    link: 'https://www.everfit.io'
  },
  {
    id: 2,
    name: 'Trainerize',
    description: 'Comprehensive client management with in-app messaging, video calls, and full nutrition tracking.',
    targetAudience: 'Trainers focused on comprehensive client management and communication',
    keyFeatures: 'In-app messaging, video calls, notifications, full nutrition tracking via MyFitnessPal, integrates with various fitness devices and apps (Fitbit, Withings, Mindbody), customizable branding and payment processing',
    support: 'Email and live chat support, knowledge base, community forums',
    pricing: 'Starts at $5/month for 1 client, $40/month for 2 clients, scalable for larger teams',
    pros: 'Comprehensive features, wide range of integrations, customizable branding',
    cons: 'Complexity and overwhelming for new trainers due to its advanced features',
    link: 'https://www.trainerize.com'
  },
  {
    id: 3,
    name: 'TrainHeroic',
    description: 'Advanced performance tracking and team management for strength and conditioning coaches.',
    targetAudience: 'Strength and conditioning coaches, athletes, and teams',
    keyFeatures: 'Community-building features like leaderboards and team messaging, advanced performance tracking, exercise libraries, athlete analytics, group management for coaching teams',
    support: 'Live chat, email, and extensive documentation',
    pricing: 'Free for athletes, $10/month per coach, or team pricing',
    pros: 'Advanced performance tracking, team management features',
    cons: 'Not ideal for solo trainers who need custom branding and specific payment options',
    link: 'https://www.trainheroic.com'
  },
  {
    id: 4,
    name: 'SugarWOD',
    description: 'CrossFit-focused platform with whiteboard workout tracking and social interaction features.',
    targetAudience: 'CrossFit coaches and gyms',
    keyFeatures: 'Whiteboard workout tracking, performance history, leaderboards, social interaction features (high-fives, comments), workout library tailored for CrossFit',
    support: 'Community-based support, email help, and training resources',
    pricing: 'Starts at $19/month for individual coaches, higher tiers for gyms',
    pros: 'Tailored for CrossFit, strong community features',
    cons: 'Limited to CrossFit-focused training; not suitable for diverse training styles',
    link: 'https://www.sugarwod.com'
  },
  {
    id: 5,
    name: 'Wodify',
    description: 'Comprehensive gym management system integrating workout tracking with business tools.',
    targetAudience: 'CrossFit coaches and gym owners',
    keyFeatures: 'Workout logging, gym management, attendance tracking, payment processing, integrates workout tracking with business management tools (invoicing, scheduling)',
    support: '24/7 customer support, onboarding services, and webinars',
    pricing: '$100+/month depending on the number of users and features',
    pros: 'All-in-one solution for gym management and workout tracking',
    cons: 'High pricing, especially for smaller gyms or trainers',
    link: 'https://www.wodify.com'
  },
  {
    id: 6,
    name: 'TrueCoach',
    description: 'Simple interface for workout programming, client communication, and video analysis.',
    targetAudience: 'Personal trainers and remote coaches',
    keyFeatures: 'Simple interface for workout programming and client communication, video analysis and messaging for client feedback, habit tracking and progress photos',
    support: 'Email support, community forums, and a help center',
    pricing: 'Starts at $19/month for solo trainers, scales with more clients',
    pros: 'Simple interface, video analysis tools',
    cons: 'Lacks team management or advanced nutrition tracking',
    link: 'https://www.truecoach.co'
  },
  {
    id: 7,
    name: 'My PT Hub',
    description: 'All-in-one platform for workout programming, client management, and billing.',
    targetAudience: 'Personal trainers, fitness professionals, and small gyms',
    keyFeatures: 'Custom workout programming, client management, billing tools, integration with MyFitnessPal and Stripe for payments',
    support: '24/7 chat, tutorials, and setup assistance',
    pricing: 'Starts at $20/month',
    pros: 'Comprehensive features, payment integration',
    cons: 'Interface can be confusing and not as user-friendly as others',
    link: 'https://www.mypthub.net'
  },
  {
    id: 8,
    name: 'PT Distinction',
    description: 'Comprehensive client management with white-label branding for solo trainers and businesses.',
    targetAudience: 'Personal trainers focused on online and in-person training',
    keyFeatures: 'Comprehensive client management, workout programming, and assessments, white-label branding for solo trainers and businesses',
    support: 'Extensive knowledge base, live chat, email support',
    pricing: '$19/month for up to 5 clients; scales based on client count',
    pros: 'White-label branding, comprehensive assessment tools',
    cons: 'Steep learning curve for beginners',
    link: 'https://www.ptdistinction.com'
  },
  {
    id: 9,
    name: 'FitSW',
    description: 'Basic workout and nutrition tracking with integrated calendar and client reminders.',
    targetAudience: 'Personal trainers needing simplified client management',
    keyFeatures: 'Basic workout and nutrition tracking, integrated calendar, progress tracking, and client reminders',
    support: 'Email support and a resource library',
    pricing: 'Free for up to 5 clients; paid plans start at $19/month',
    pros: 'Free plan available, simple to use',
    cons: 'Basic features, lacking in automation and advanced tools',
    link: 'https://www.fitsw.com'
  },
  {
    id: 10,
    name: 'FITR',
    description: 'Automated client management, customizable workouts, and progress tracking.',
    targetAudience: 'Personal trainers, fitness professionals, and gyms serving both individual clients and large groups',
    keyFeatures: 'Client management automation, customizable workouts, analytics & progress tracking, mobile apps, custom branding, payment processing',
    support: 'Email support, help desk, FAQs, live chat, webinars, documentation, and training videos',
    pricing: 'Starts at $34.99/month with no hidden fees',
    pros: 'Intuitive interface, unlimited clients, customizable features',
    cons: 'Small transaction fees applied per client charge',
    link: 'https://www.fitr.training'
  },
  {
    id: 11,
    name: 'Virtuagym',
    description: 'Comprehensive fitness management system including workout and nutrition tracking, member management, and custom branding.',
    targetAudience: 'Gyms and fitness centers',
    keyFeatures: 'Workout and nutrition tracking, member management, custom branding',
    support: 'Not specified',
    pricing: 'Starts at $25/month',
    pros: 'Ideal for gyms with full client management tools, and a community-building focus',
    cons: 'May be too feature-rich for solo trainers',
    link: 'https://business.virtuagym.com'
  },
  {
    id: 12,
    name: 'The Workout Coach',
    description: 'Free personal trainer platform offering workout logging, performance tracking, and basic client management.',
    targetAudience: 'Small-scale trainers and budget-conscious professionals',
    keyFeatures: 'Workout logging, performance tracking, basic client management',
    support: 'Not specified',
    pricing: 'Free for trainers, with added costs for client access',
    pros: 'Budget-friendly, simple interface',
    cons: 'Lacks advanced automation or marketing tools',
    link: 'https://theworkout.coach'
  },
  {
    id: 13,
    name: 'MacroActive',
    description: 'Custom branding for fitness businesses, live streaming, and content ownership for trainers.',
    targetAudience: 'Fitness businesses focused on branding and content creation',
    keyFeatures: 'Custom branding, live streaming, content ownership',
    support: 'Not specified',
    pricing: 'Custom pricing based on business needs',
    pros: 'Excellent branding and content creation tools',
    cons: 'Higher pricing for small operations',
    link: 'https://macroactive.com'
  },
  {
    id: 14,
    name: 'PT Minder',
    description: 'Simple, all-in-one client management, online bookings, workout tracking, and payment solutions.',
    targetAudience: 'Personal trainers and small fitness businesses',
    keyFeatures: 'Client management, online bookings, workout tracking, payment solutions',
    support: 'Not specified',
    pricing: 'Starts at $19/month',
    pros: 'Easy to use, integrated scheduling and payment processing',
    cons: 'Limited automation and marketing tools',
    link: 'https://www.ptminder.com'
  },
  {
    id: 15,
    name: 'QuickCoach',
    description: 'Free software for workout programming, client communication, and progress tracking.',
    targetAudience: 'New trainers or those with a small client base',
    keyFeatures: 'Workout programming, client communication, progress tracking',
    support: 'Not specified',
    pricing: 'Free for all users',
    pros: 'Completely free and easy to use',
    cons: 'Lacks integration with fitness wearables or advanced features',
    link: 'https://quickcoach.fit'
  },
  {
    id: 16,
    name: 'Exercise.com',
    description: 'Fully customizable fitness apps, CRM, workout builder, progress tracking, and eCommerce tools.',
    targetAudience: 'Fitness businesses of all sizes',
    keyFeatures: 'Customizable fitness apps, CRM, workout builder, progress tracking, eCommerce tools',
    support: 'Not specified',
    pricing: 'Custom pricing',
    pros: 'Powerful all-in-one solution for fitness businesses; full custom branding',
    cons: 'Higher pricing for smaller teams',
    link: 'https://www.exercise.com'
  },
  {
    id: 17,
    name: 'FitBudd',
    description: 'Custom-branded app for workout programming, habit tracking, and client management.',
    targetAudience: 'Personal trainers and fitness professionals',
    keyFeatures: 'Custom-branded app, workout programming, habit tracking, client management',
    support: 'Not specified',
    pricing: 'Starts at $50/month',
    pros: 'Custom branding and flexible subscription options',
    cons: 'Higher cost compared to competitors',
    link: 'https://www.fitbudd.com'
  },
  {
    id: 18,
    name: 'TrainerFu',
    description: 'Workout programming, habit tracking, progress monitoring, and integration with wearables like Fitbit.',
    targetAudience: 'Personal trainers, especially those with Fitbit-using clients',
    keyFeatures: 'Workout programming, habit tracking, progress monitoring, Fitbit integration',
    support: 'Not specified',
    pricing: 'Free with premium features available',
    pros: 'Free plan for entry-level users, Fitbit integration',
    cons: 'Limited scalability for large businesses',
    link: 'https://www.trainerfu.com'
  },
  {
    id: 19,
    name: 'Superset',
    description: 'Modern, efficient workout builder, custom exercise video library, and simplified client management.',
    targetAudience: 'Trainers who want streamlined workflows',
    keyFeatures: 'Efficient workout builder, custom exercise video library, simplified client management',
    support: 'Not specified',
    pricing: 'Custom pricing based on business size',
    pros: 'Fast and simple, ideal for efficient workout programming',
    cons: 'Limited integrations with wearables and external apps',
    link: 'https://www.supersetapp.com'
  },
  {
    id: 20,
    name: 'CoachAccountable',
    description: 'Custom coaching workflows, habit tracking, invoicing, and goal setting for personal trainers.',
    targetAudience: 'Personal trainers focused on accountability and tracking',
    keyFeatures: 'Custom coaching workflows, habit tracking, invoicing, goal setting',
    support: 'Not specified',
    pricing: 'Starts at $20/month',
    pros: 'Excellent for individualized coaching',
    cons: 'Limited scalability for large teams',
    link: 'https://www.coachaccountable.com'
  },
  {
    id: 21,
    name: 'Kahunas',
    description: 'All-in-one coaching platform with custom branding, client management, workout and nutrition tracking.',
    targetAudience: 'Fitness professionals looking for extensive customization',
    keyFeatures: 'Custom branding, client management, workout and nutrition tracking',
    support: 'Not specified',
    pricing: 'Custom pricing based on features',
    pros: 'Offers extensive customization and client engagement features',
    cons: 'Not as widely known as competitors',
    link: 'https://www.kahunas.io'
  },
  {
    id: 22,
    name: 'CoachRx',
    description: 'Comprehensive platform for fitness coaches focusing on program design, client management, and business scaling with AI-driven features.',
    targetAudience: 'Remote Coaches, Gym Owners, Personal Trainers, Strength & Conditioning Coaches, Group Programmers, Physical Therapists',
    keyFeatures: 'AI Coaching Assistant (RxBot), advanced program design tools, nutrition & lifestyle coaching, unified mobile app for coaches and clients, business management suite, individual and group coaching capabilities',
    support: 'Transition assistance, onboarding webinars, demo calls',
    pricing: 'Custom pricing, free 14-day trial available',
    pros: 'AI-powered efficiency, comprehensive business suite, flexibility for individual and group coaching, personalized coaching capabilities',
    cons: 'Pricing not publicly available, may be complex for beginners',
    link: 'https://www.coachrx.app/'
  }
]

export function Page() {
  const [savedPlatforms, setSavedPlatforms] = useState<string[]>([])
  const [comparePlatforms, setComparePlatforms] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')
  const [isComparing, setIsComparing] = useState(false)

  const filteredAndSortedPlatforms = useMemo(() => {
    return platforms
      .filter(platform => 
        platform.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterBy === 'all' || 
         (filterBy === 'free' && platform.pricing.toLowerCase().includes('free')) ||
         (filterBy === 'paid' && !platform.pricing.toLowerCase().includes('free')))
      )
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name)
        } else if (sortBy === 'priceLowToHigh') {
          const getPrice = (price: string) => parseFloat(price.replace(/[^0-9.]/g, '')) || 0
          return getPrice(a.pricing) - getPrice(b.pricing)
        } else {
          const getPrice = (price: string) => parseFloat(price.replace(/[^0-9.]/g, '')) || 0
          return getPrice(b.pricing) - getPrice(a.pricing)
        }
      })
  }, [searchTerm, sortBy, filterBy])

  const handleSave = (platformName: string) => {
    if (!savedPlatforms.includes(platformName)) {
      setSavedPlatforms([...savedPlatforms, platformName])
    }
  }

  const handleRemoveSaved = (platformName: string) => {
    setSavedPlatforms(savedPlatforms.filter(name => name !== platformName))
  }

  const handleCompare = (platformName: string) => {
    if (comparePlatforms.length < 3 && !comparePlatforms.includes(platformName)) {
      setComparePlatforms([...comparePlatforms, platformName])
    }
    if (comparePlatforms.length === 2) {
      setIsComparing(true)
    }
  }

  const handleRemoveCompare = (platformName: string) => {
    setComparePlatforms(comparePlatforms.filter(name => name !== platformName))
    if (comparePlatforms.length <= 3) {
      setIsComparing(false)
    }
  }

  const handlePurchase = (link: string) => {
    window.open(link, '_blank')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel for Saved Platforms */}
      <div className="w-64 bg-white shadow-md p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">Saved Platforms</h2>
        <div className="space-y-2">
          {savedPlatforms.map((platform) => (
            <div key={platform} className="flex items-center justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start mr-2">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    {platform}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{platform}</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="mt-4 h-[60vh]">
                    {(() => {
                      const platformData = platforms.find((p) => p.name === platform)
                      if (platformData) {
                        return (
                          <div className="space-y-4">
                            <p><strong>Description:</strong> {platformData.description}</p>
                            <p><strong>Target Audience:</strong> {platformData.targetAudience}</p>
                            <p><strong>Key Features:</strong> {platformData.keyFeatures}</p>
                            <p><strong>Support:</strong> {platformData.support}</p>
                            <p><strong>Pricing:</strong> {platformData.pricing}</p>
                            <p><strong>Pros:</strong> {platformData.pros}</p>
                            <p><strong>Cons:</strong> {platformData.cons}</p>
                          </div>
                        )
                      }
                      return null
                    })()}
                  </ScrollArea>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => handlePurchase(platforms.find((p) => p.name === platform)?.link || '')}>
                      Purchase
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveSaved(platform)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">PARADOX Insights</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow relative">
            <Label htmlFor="search" className="text-indigo-700">Search</Label>
            <div className="relative">
              <Input
                id="search"
                placeholder="Search platforms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <Label htmlFor="sort" className="text-indigo-700">Sort by</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filter" className="text-indigo-700">Filter by</Label>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger id="filter">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {comparePlatforms.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Comparing Platforms</h2>
            <div className="flex flex-wrap gap-2">
              {comparePlatforms.map((platformName) => (
                <Button
                  key={platformName}
                  variant="outline"
                  onClick={() => handleRemoveCompare(platformName)}
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                >
                  {platformName} <X className="ml-2 h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPlatforms.map((platform) => (
            <Card key={platform.id} className="flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-indigo-50">
                <CardTitle className="text-indigo-700">{platform.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm mb-2">{platform.description}</p>
                <p className="text-sm mb-2"><span className="font-semibold text-indigo-600">Target Audience:</span> {platform.targetAudience}</p>
                <p className="text-sm mb-2"><span className="font-semibold text-indigo-600">Key Features:</span> {platform.keyFeatures}</p>
                <p className="text-sm mb-2"><span className="font-semibold text-indigo-600">Support:</span> {platform.support}</p>
                <p className="text-sm mb-2"><span className="font-semibold text-indigo-600">Pricing:</span> {platform.pricing}</p>
                <p className="text-sm mb-2"><span className="font-semibold text-green-600">Pros:</span> {platform.pros}</p>
                <p className="text-sm"><span className="font-semibold text-red-600">Cons:</span> {platform.cons}</p>
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-50">
                <Button 
                  onClick={() => handleCompare(platform.name)}
                  disabled={comparePlatforms.length >= 3 || comparePlatforms.includes(platform.name)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {comparePlatforms.includes(platform.name) ? 'Comparing' : 'Compare'}
                </Button>
                <Button onClick={() => handlePurchase(platform.link)} className="bg-green-600 hover:bg-green-700 text-white">
                  Purchase
                </Button>
                <Button onClick={() => handleSave(platform.name)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {savedPlatforms.includes(platform.name) ? 'Saved' : 'Save'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={isComparing} onOpenChange={setIsComparing}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-700">Platform Comparison</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            {comparePlatforms.map((platformName) => {
              const platform = platforms.find((p) => p.name === platformName)
              return (
                <Card key={platformName} className="flex flex-col bg-white shadow-md">
                  <CardHeader className="bg-indigo-50">
                    <CardTitle className="text-indigo-700">{platformName}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm mb-2">{platform?.description}</p>
                    <p className="text-sm mb-2"><span className="font-semibold text-indigo-600">Target Audience:</span> {platform?.targetAudience}</p>
                    <p className="text-sm mb-2"><span className="font-semibold text-indigo-600">Key Features:</span> {platform?.keyFeatures}</p>
                    <p className="text-sm mb-2"><span className="font-semibold text-indigo-600">Support:</span> {platform?.support}</p>
                    <p className="text-sm mb-2"><span className="font-semibold text-indigo-600">Pricing:</span> {platform?.pricing}</p>
                    <p className="text-sm mb-2"><span className="font-semibold text-green-600">Pros:</span> {platform?.pros}</p>
                    <p className="text-sm"><span className="font-semibold text-red-600">Cons:</span> {platform?.cons}</p>
                  </CardContent>
                  <CardFooter className="bg-gray-50">
                    <Button onClick={() => handlePurchase(platform?.link || '')} className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}