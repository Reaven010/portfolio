import React from "react"
import { ExternalLink } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/interfaces-carousel"

const projects = [
  {
    title: "FrontForge",
    url: "https://github.com/Reaven010/frontforge",
    image: "./frontforge.png",
    categories: ["AI/GenAI", "Fullstack"],
    description: "An AI-powered web platform that instantly generates responsive HTML, CSS, and JS interfaces from simple prompts using the Gemini API.",
    stack: ["NODE.JS", "EXPRESS", "GEMINI API"],
    theme: "primary"
  },
  {
    title: "Sign Language Audio",
    url: "https://github.com/Reaven010/sign-language-to-voice",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    categories: ["Vision", "ML Models"],
    description: "A real-time computer vision system that detects sign language gestures using a webcam and converts them into spoken audio to bridge communication barriers.",
    stack: ["PYTHON", "OPENCV", "MEDIAPIPE"],
    theme: "secondary"
  },
  {
    title: "Eureka Technical Club",
    url: "https://club-pi-roan.vercel.app/",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    categories: ["WebGL", "Frontend"],
    description: "A scalable cinematic landing experience featuring dynamic 3D starfields, fluid cursor simulations, and GSAP-powered motion. Built as an architectural blueprint for ongoing club operations.",
    stack: ["JAVASCRIPT", "THREE.JS", "GSAP"],
    theme: "tertiary"
  }
];

const getThemeClasses = (theme: string) => {
  switch (theme) {
    case 'primary':
      return {
        text: 'group-hover:text-primary',
        badge: 'bg-primary-container text-on-primary-container',
        border: 'border-b border-primary'
      };
    case 'secondary':
      return {
        text: 'group-hover:text-secondary',
        badge: 'bg-secondary-container text-on-secondary-container',
        border: 'border-b border-secondary'
      };
    case 'tertiary':
      return {
        text: 'group-hover:text-tertiary',
        badge: 'bg-tertiary-container text-on-tertiary-container',
        border: 'border-b border-tertiary'
      };
    default:
      return {
        text: 'group-hover:text-primary',
        badge: 'bg-primary-container text-on-primary-container',
        border: 'border-b border-primary'
      };
  }
};

export default function ProjectsCarousel() {
  return (
    <div className="w-full relative px-4 md:px-12">
      <Carousel 
        opts={{ 
          loop: true,
          align: "start"
        }} 
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-8">
          {projects.map((project, index) => {
            const themeClasses = getThemeClasses(project.theme);
            
            return (
              <CarouselItem key={index} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-[60%]">
                <div 
                  className="group cursor-pointer h-full flex flex-col" 
                  onClick={() => window.open(project.url, '_blank')}
                >
                  <div
                    className="relative overflow-hidden rounded-lg bg-surface-container mb-8 aspect-video md:aspect-[16/10] border border-outline-variant/10"
                  >
                    <img 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                      src={project.image} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                      {project.categories.map(category => (
                        <span key={category} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${themeClasses.badge}`}>
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className={`text-3xl font-bold mb-4 transition-colors flex items-center gap-2 ${themeClasses.text}`}>
                    {project.title} 
                    <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                  </h3>
                  
                  <p className="text-on-surface-variant leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4 flex-wrap mt-auto">
                    {project.stack.map(tech => (
                      <span key={tech} className={`text-xs font-bold text-white tracking-widest pb-1 ${themeClasses.border}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
