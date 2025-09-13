import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ChevronRight, Book, Sparkles, Lock, FileText, BarChart2} from "lucide-react";
import { Card,CardContent} from "@/components/ui/card"
import Link from "next/link"; 
import { Testimonial } from "@/components/testimonials";

const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

export default function Home() {
  return (
    <div className="relative container mx-auto px-4 pt-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 gradient-title">Your Space to Reflect. <br /> Your Story to Tell</h1>
        <p className="text-lg md:text-xl text-orange-800 mb-8">Capture your thoughts, track your moods, and reflect on your journey in a beautiful, secure space.</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-50 via-transparent to-transparent pointer-events-none z-10"/>

        <div className="bg-white rounded-2xl p-4 max-w-full mx-auto"> 
          <div className="border-b border-orange-100 pb-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span className="text-orange-900 font-medium">
                Today&rsquo;s Entry
              </span>
            </div>


            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-200"/>
              <div className="h-3 w-3 rounded-full bg-orange-300"/>
              <div className="h-3 w-3 rounded-full bg-orange-400"/>
            </div>
          </div>


          <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold text-orange-900 text-center">daily prompts</h3>
            <Skeleton className="h-4 bg-orange-100 rounded w-3/4" />
            <Skeleton className="h-4 bg-orange-100 rounded w-full" />
            <Skeleton className="h-4 bg-orange-100 rounded w-2/3" />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-10 mt-5">
          <Link href="/dashboard">
            <Button variant="journal" className="py-6 rounded-full flex items-center gap-2">Start Writing <ChevronRight className="h-5 w-5" /></Button>
          </Link>

          <Link href="#features">
            <Button variant="outline" className="px-6 py-6 rounded-full border-orange-600 text-orange-600 hover:bg-orange-100">Learn More <ChevronRight className="h-5 w-5" /></Button>
          </Link>
      </div>


      <section id="features" className="mt-10 mb-30 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          features.map((feature, index)=>(
            <Card key={index} className="shadow-lg">
              <CardContent>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-orange-600"/>
                </div>
                <h3 className="font-semibold text-xl text-black-900 mt-2 mb-2">{feature.title}</h3>
                <p className="text-orange-900">{feature.description}</p>
              </CardContent>
            </Card>
          ))
        }
      </section>

      <div className="mb-20 flex gap-20">
        <div>
          <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
            <FileText className="h-6 w-6 text-orange-600"/>
          </div>
          <h3 className="font-semibold text-xl text-black-900 mt-2 mb-2">Rich Text Editor</h3>
          <p className="text-orange-900 mb-3">Express yourself fully with our powerful editor featuring:</p>
          <ul>
            <li className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-400"/>
              <span>Format text with ease</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-400"/>
              <span>Embed links</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl p6 shadow-xl border border-orange-300 w-1/2 p-6 space-y-4">
          <div className="flex gap-2 mb-6">
            <div className="h-8 w-8 rounded-full bg-orange-100"/>
            <div className="h-8 w-8 rounded-full bg-orange-100"/>
            <div className="h-8 w-8 rounded-full bg-orange-100"/>
          </div>


          <Skeleton className="h-4 bg-orange-50 rounded w-3/4" />
          <Skeleton className="h-4 bg-orange-50 rounded w-full" />
          <Skeleton className="h-4 bg-orange-50 rounded w-2/3" />
          <Skeleton className="h-4 bg-orange-50 rounded w-1/3" />
        </div>
  
      </div>

      <div className="mb-20 flex gap-20">
        <div className="rounded-2xl p6 shadow-xl border border-orange-300 w-1/2 p-6 space-y-4">
          <div className="h-40 bg-gradient-to-t from-orange-100 to-orange-50 rounded-lg"></div>
          <div className="flex justify-between">
            <div className="h-4 w-16 bg-orange-50 rounded "/>
            <div className="h-4 w-16 bg-orange-50 rounded "/>
            <div className="h-4 w-16 bg-orange-50 rounded "/>
          </div>
        </div>

        <div>
          <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
            <BarChart2 className="h-6 w-6 text-orange-600"/>
          </div>
          <h3 className="font-semibold text-xl text-black-900 mt-2 mb-2">Mood Analytics</h3>
          <p className="text-orange-900 mb-3">Track your emotions with powerful analytics:</p>
          <ul>
            <li className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-400"/>
              <span>Visual mood trends</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-400"/>
              <span>Pattern recognition</span>
            </li>
          </ul>
        </div>

        
  
      </div>

      <Testimonial />
    </div>
  );
}
