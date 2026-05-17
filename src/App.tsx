/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Scissors, 
  Sparkles, 
  Heart, 
  Star,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Clock,
  Calendar,
  User,
  Plus,
  Minus,
  CheckCircle2
} from "lucide-react";

const SERVICES = [
  {
    title: "Bridal Makeup",
    description: "Exquisite bridal transformations that highlight your natural beauty for your special day.",
    image: "https://i.ibb.co/xNsdq5K/IMG-20260508-220350-899.jpg",
    price: "Starting ₹5,000"
  },
  {
    title: "Hair Styling",
    description: "From classic updos to modern waves, we create hairstyles that command attention.",
    image: "https://i.ibb.co/cKMnhwcC/IMG-20260508-220350-900.jpg",
    price: "Starting ₹800"
  },
  {
    title: "Luxury Facial & Glow",
    description: "Rejuvenating skin treatments designed to give you a radiant, healthy complexion and a natural bridal glow.",
    image: "https://i.ibb.co/vftW6xW/IMG-20260507-143711-377.webp",
    price: "Starting ₹1,200"
  },
  {
    title: "Engagement Look",
    description: "Perfectly balanced makeup for your engagement ceremony and pre-wedding events.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    price: "Starting ₹3,500"
  }
];

const REAL_BRIDES = [
  {
    name: "The Signature Royal Glow",
    description: "Our Latest Masterpiece",
    image: "https://i.ibb.co/W42fKP41/IMG-20260507-143739-226.webp",
    details: "A breathtaking traditional bridal transformation showcasing heavy kundan jewelry and radiant makeup."
  },
  {
    name: "The Royal Magenta Glow",
    description: "Signature Bridal Look with Heavy Jewelry",
    image: "https://i.ibb.co/KzShKzSW/IMG-20260508-220350-902.jpg", 
    details: "Traditional pink lehenga with intricate stone work and kundan set."
  },
  {
    name: "Subtle Ivory Serenity",
    description: "Elegant Profile with Delicate Lace",
    image: "https://i.ibb.co/8nsf75xJ/IMG-20260508-220350-906.jpg", 
    details: "Contemporary ivory bridal look with soft makeup and lace dupatta."
  },
  {
    name: "Golden Hour Enchantment",
    description: "Sunset Wedding Portrait",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800&auto=format&fit=crop",
    details: "Warm gold tones with smoked-out eyes and a royal red bindi."
  },
  {
    name: "Minimalist Modern Bride",
    description: "Daytime Nude Palette",
    image: "https://images.unsplash.com/photo-1512496011931-a2c388278ab0?q=80&w=800&auto=format&fit=crop",
    details: "Clean skin focus with subtle shimmer and soft rose lips."
  }
];

const RECENT_POSTS = [
  { id: 1, image: "https://i.ibb.co/xNsdq5K/IMG-20260508-220350-899.jpg", likes: "1.2k", comments: "84" },
  { id: 2, image: "https://i.ibb.co/cKMnhwcC/IMG-20260508-220350-900.jpg", likes: "890", comments: "32" },
  { id: 3, image: "https://i.ibb.co/KzShKzSW/IMG-20260508-220350-902.jpg", likes: "2.5k", comments: "120" },
  { id: 4, image: "https://i.ibb.co/8nsf75xJ/IMG-20260508-220350-906.jpg", likes: "1.5k", comments: "67" },
  { id: 5, image: "https://images.unsplash.com/photo-1512496011931-a2c388278ab0?q=80&w=800&auto=format&fit=crop", likes: "940", comments: "45" },
  { id: 6, image: "https://i.ibb.co/8LSHQsbt/IMG-20260508-220350-903.jpg", likes: "3.2k", comments: "210" },
];

const FAQ_ITEMS = [
  {
    question: "How should I prepare for my bridal makeup session?",
    answer: "We recommend getting a professional facial at least 7 days before. On the day, ensure your face is clean and moisturized. Wear a button-down shirt to avoid messing up your hair and makeup during outfit changes."
  },
  {
    question: "What is your booking and cancellation policy?",
    answer: "A 50% non-refundable deposit is required to secure your bridal date. Cancellations made within 48 hours of the appointment will incur a full charge. Rescheduling is subject to availability."
  },
  {
    question: "Do you offer on-site (venue) bridal services?",
    answer: "Yes, we offer on-site services for bridal packages. Travel charges may apply depending on the location. Please mention your venue details during the booking request for an accurate quote."
  },
  {
    question: "How far in advance should I book my bridal makeover?",
    answer: "Bridal dates during the peak wedding season (October-February) book up fast. We recommend securing your date at least 3-6 months in advance to ensure availability."
  },
  {
    question: "Do you provide hair styling and saree draping as well?",
    answer: "Yes, all our bridal packages are comprehensive and include professional hair styling, saree/dupatta draping, and jewelry setting as part of the total makeover."
  }
];


const SOCIAL_LINKS = {
  phone: "tel:+918307004361",
  whatsappBase: "https://wa.me/918307004361",
  instagram: "https://ig.me/m/mona_makeover_0021"
};

export default function App() {
  const [bookingData, setBookingData] = useState({
    name: "",
    service: SERVICES[0].title,
    date: "",
    time: ""
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock availability logic: Weekends and specific dates are "Busy"
  const getAvailability = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    // Weekends are busy (0 = Sunday, 6 = Saturday)
    if (dayOfWeek === 0) return "limited";
    if (dayOfWeek === 6) return "busy";
    // Random dates
    if ([12, 15, 22].includes(day)) return "busy";
    return "available";
  };

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const days = [];
    const totalDays = daysInMonth(month, year);
    const startingDay = firstDayOfMonth(month, year);
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);

    // Empty slots for previous month days
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10 md:h-12 md:w-12" />);
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const status = getAvailability(day, month, year);
      const isSelected = bookingData.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      days.push(
        <button
          key={day}
          type="button"
          disabled={status === 'busy'}
          onClick={() => setBookingData({...bookingData, date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`})}
          className={`relative group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full text-xs font-medium transition-all
            ${status === 'busy' ? 'cursor-not-allowed text-paper/20' : 'hover:scale-110'}
            ${isSelected ? 'bg-brand-gold text-white shadow-lg' : status === 'busy' ? '' : 'text-paper hover:bg-white/10'}
          `}
        >
          {day}
          {status === 'available' && !isSelected && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-green-500/50" />}
          {status === 'limited' && !isSelected && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-yellow-500/50" />}
          {status === 'busy' && <span className="absolute top-1/2 left-1/2 h-4 w-[1px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-paper/10" />}
        </button>
      );
    }

    return (
      <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-gold">{monthName} {year}</h4>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={() => setCurrentDate(new Date(year, month - 1))}
              className="rounded-full p-2 hover:bg-white/5"
            >
              <ChevronRight className="rotate-180" size={16} />
            </button>
            <button 
              type="button"
              onClick={() => setCurrentDate(new Date(year, month + 1))}
              className="rounded-full p-2 hover:bg-white/5"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-7 gap-1 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={`${d}-${i}`} className="text-[10px] font-bold text-paper/40">{d}</span>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-paper/60">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Available
          </div>
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-paper/60">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" /> Limited 
          </div>
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-paper/60">
            <span className="h-1.5 w-1.5 rounded-full bg-paper/20" /> Fully Booked
          </div>
        </div>
      </div>
    );
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi Mona Makeover, I want to book an appointment!%0AName: ${bookingData.name}%0AService: ${bookingData.service}%0ADate: ${bookingData.date}%0ATime: ${bookingData.time}`;
    window.open(`${SOCIAL_LINKS.whatsappBase}?text=${message}`, "_blank");
  };

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const nextSlide = () => {
    setGalleryIndex((prev) => (prev + 1) % REAL_BRIDES.length);
  };

  const prevSlide = () => {
    setGalleryIndex((prev) => (prev - 1 + REAL_BRIDES.length) % REAL_BRIDES.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen selection:bg-brand-gold/30 selection:text-ink">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-ink/10 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-gold" />
            <span className="font-serif text-xl font-semibold tracking-tight">Mona Makeover</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#services" className="luxury-underline text-xs font-medium uppercase tracking-widest transition-colors">Services</a>
            <a href="#gallery" className="luxury-underline text-xs font-medium uppercase tracking-widest transition-colors">Gallery</a>
            <a href="#faq" className="luxury-underline text-xs font-medium uppercase tracking-widest transition-colors">FAQ</a>
            <a href="#about" className="luxury-underline text-xs font-medium uppercase tracking-widest transition-colors">About</a>
            <a href="#booking" className="luxury-underline text-xs font-medium uppercase tracking-widest transition-colors text-brand-gold">Book Now</a>
          </div>
          <a
            href="#booking"
            className="flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-ink hover:text-paper"
          >
            <Phone size={12} />
            Appointment
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://i.ibb.co/8LSHQsbt/IMG-20260508-220350-903.jpg"
            alt="Mona Makeover Signature Bride"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-20 px-6 text-center text-white"
        >
          <span className="mb-4 block text-xs font-light uppercase tracking-[0.5em] text-white/80">Sector-2 Ballabgarh's Premier Beauty Parlour</span>
          <h1 className="mb-6 text-6xl font-light leading-[1.1] md:text-8xl lg:text-9xl">
            Reveal Your <br />
            <span className="italic">Radiance</span>
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <a
              href="#booking"
              className="group flex items-center gap-3 rounded-full bg-brand-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-ink"
            >
              <MessageCircle size={16} />
              Book Appointment
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Explore Services
            </a>
          </div>
        </motion.div>

        {/* Vertical Rail Text */}
        <div className="absolute bottom-12 left-6 z-20 hidden md:block">
          <span className="vertical-text text-white/50">Est. 2021 • Mona Makeover</span>
        </div>
      </section>

      {/* Marquee Style Banner */}
      <div className="bg-ink py-4 text-paper overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-16 text-[10px] font-bold uppercase tracking-[0.4em]"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-2">
              <Star size={10} className="text-brand-gold" />
              Bridal Specialist • Professional Makeovers • Hair Artistry • Luxury Facials
            </span>
          ))}
        </motion.div>
      </div>

      {/* Services Grid */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-16 flex flex-col items-end justify-between border-b border-ink/10 pb-8 md:flex-row">
          <div className="max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Our Expertise</span>
            <h2 className="mt-2 text-4xl leading-tight md:text-5xl">Curated Services for the <span className="italic">Modern Woman</span></h2>
          </div>
          <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-ink/60 md:mt-0">
            Every service is tailored to your unique features and preferences, ensuring a look that is both timeless and trendy.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              whileHover={{ scale: 1.02, y: -8 }}
              className="group relative rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-paper hover:shadow-2xl hover:shadow-brand-gold/10"
            >
              <div className="mb-6 overflow-hidden rounded-3xl aspect-[3/4]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center justify-between border-b border-ink/5 pb-2">
                <h3 className="text-xl font-medium">{service.title}</h3>
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">{service.price}</span>
              </div>
              <p className="mt-3 text-xs font-light leading-relaxed text-ink/60">{service.description}</p>
              <button 
                onClick={() => {
                  setBookingData(prev => ({ ...prev, service: service.title }));
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-ink transition-all hover:gap-2"
              >
                Book This Service <ChevronRight size={10} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section (Split Layout) */}
      <section id="about" className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <div className="relative h-[400px] md:h-screen">
            <img
              src="https://images.unsplash.com/photo-1522338140262-f43f55132422?q=80&w=800&auto=format&fit=crop"
              alt="Mona Working"
              className="h-full w-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="flex h-32 w-32 items-center justify-center rounded-full border border-white/20 p-2 backdrop-blur-sm"
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/40 text-[8px] font-bold uppercase tracking-widest text-center">
                  <span>Mona</span>
                  <span>Makeover</span>
                  <span>Professional</span>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-12 py-24 md:px-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">The Artist Behind</span>
            <h2 className="mt-4 text-5xl leading-tight">Mastering the Art of <br /><span className="italic">Elegance</span></h2>
            <p className="mt-8 text-sm font-light leading-relaxed text-paper/70">
              Founded in 2021 by Mona, our parlour in Sector-2, Ballabgarh has quickly become the destination for brides seeking sophistication and a flawless glow. We believe that makeup isn't about masking, but about revealing your most confident self.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <span className="block text-3xl font-serif">500+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-paper/40">Happy Clients</span>
              </div>
              <div>
                <span className="block text-3xl font-serif">150+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-paper/40">Bridal Shoots</span>
              </div>
            </div>
            <a 
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-16 flex items-center gap-3 self-start border-b border-brand-gold pb-1 text-xs font-bold uppercase tracking-widest text-brand-gold transition-all hover:text-white hover:border-white"
            >
              Follow our journey on Instagram <Instagram size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-ink pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Real Brides</span>
          <h2 className="mt-4 text-4xl text-paper md:text-6xl">Our <span className="italic">Masterpieces</span></h2>
        </div>
        
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] md:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={galleryIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative h-full w-full"
              >
                <img 
                  src={REAL_BRIDES[galleryIndex].image} 
                  alt={REAL_BRIDES[galleryIndex].name} 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-12 left-12 right-12 text-paper">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">{REAL_BRIDES[galleryIndex].description}</p>
                    <h3 className="mt-2 font-serif text-3xl md:text-5xl">{REAL_BRIDES[galleryIndex].name}</h3>
                    <p className="mt-4 max-w-xl text-sm font-light text-paper/60">{REAL_BRIDES[galleryIndex].details}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 right-12 z-30 flex gap-4">
              <button 
                onClick={prevSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white hover:text-ink"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white hover:text-ink"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Pagination Line */}
            <div className="absolute bottom-0 left-0 z-30 flex h-1 w-full gap-1 px-12 pb-6">
              {REAL_BRIDES.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${i === galleryIndex ? 'bg-brand-gold' : 'bg-white/10'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="bg-ink pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col items-center justify-between border-b border-paper/10 pb-12 md:flex-row">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Instagram Feed</span>
              <h2 className="mt-4 text-4xl text-paper md:text-5xl">Recent on <span className="italic">Social</span></h2>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs font-light text-paper/40 md:justify-start">
                <span>1.5k Followers</span>
                <span className="h-1 w-1 rounded-full bg-brand-gold" />
                <span>500+ Posts</span>
              </div>
            </div>
            <a 
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-3 rounded-full border border-paper/20 px-8 py-4 text-xs font-bold uppercase tracking-widest text-paper transition-all hover:bg-paper hover:text-ink md:mt-0"
            >
              <Instagram size={16} /> @mona_makeover_0021
            </a>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6"
          >
            {RECENT_POSTS.map((post) => (
              <motion.a
                key={post.id}
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative aspect-square overflow-hidden rounded-2xl"
              >
                <img 
                  src={post.image} 
                  alt={`Instagram post ${post.id}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex gap-4 text-paper">
                    <div className="flex items-center gap-1">
                      <Heart size={14} fill="white" />
                      <span className="text-[10px] font-bold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} fill="white" />
                      <span className="text-[10px] font-bold">{post.comments}</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="mt-4 text-brand-gold" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Reservation</span>
              <h2 className="mt-4 text-5xl leading-tight md:text-6xl">Book Your <br /><span className="italic">Transformation</span></h2>
              <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-ink/60">
                Fill out the form to request an appointment. Once submitted, it will open WhatsApp with your details pre-filled for our team to confirm.
              </p>
              
              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest">Instant Confirmation</h4>
                    <p className="text-xs text-ink/40">Responses within 24 hours via WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                    <Star size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest">Bridal Specialist</h4>
                    <p className="text-xs text-ink/40">Mona personally handles all bridal consultations</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="rounded-[2.5rem] bg-ink p-8 text-paper shadow-2xl md:p-12"
            >
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-paper/40 flex items-center gap-2">
                    <User size={12} className="text-brand-gold" /> Your Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rakhi Sharma"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm placeholder:text-white/20 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-paper/40 flex items-center gap-2">
                    <Scissors size={12} className="text-brand-gold" /> Select Service
                  </label>
                  <select
                    value={bookingData.service}
                    onChange={(e) => setBookingData({...bookingData, service: e.target.value})}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm focus:border-brand-gold focus:outline-none"
                  >
                    {SERVICES.map((s, i) => (
                      <option key={i} value={s.title} className="bg-ink">{s.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-8">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-paper/40 flex items-center gap-2">
                      <Calendar size={12} className="text-brand-gold" /> Choose Your Date
                    </label>
                    {renderCalendar()}
                    <input
                      required
                      type="hidden"
                      value={bookingData.date}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-paper/40 flex items-center gap-2">
                      <Clock size={12} className="text-brand-gold" /> Preferred Time
                    </label>
                    <input
                      required
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-brand-gold py-5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-ink active:scale-95"
                >
                  <MessageCircle size={14} /> 
                  Send Request via WhatsApp
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-16 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Common Queries</span>
            <h2 className="mt-4 text-4xl text-ink md:text-5xl">Frequently Asked <span className="italic">Questions</span></h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <div 
                key={index}
                className={`overflow-hidden rounded-3xl border border-ink/5 bg-paper transition-all duration-300 ${openFaqIndex === index ? 'shadow-xl shadow-brand-gold/5' : ''}`}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <span className="text-sm font-medium tracking-tight text-ink md:text-base">{faq.question}</span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 transition-transform duration-300 ${openFaqIndex === index ? 'bg-brand-gold text-white border-brand-gold' : ''}`}>
                    {openFaqIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-ink/5 px-8 pb-6 pt-2">
                        <p className="text-sm font-light leading-relaxed text-ink/60">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="mx-auto max-w-7xl px-6 py-24 pb-36 md:pb-24">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Get in touch</span>
            <h2 className="mt-2 text-5xl leading-tight md:text-6xl">Let's Create Your <br /><span className="italic">Signature</span> Look</h2>
            <div className="mt-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Visit Us</span>
                  <p className="text-sm">Sector-2, Ballabgarh, Faridabad, Haryana</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10">
                  <Instagram size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Social DM</span>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-brand-gold transition-colors">@mona_makeover_0021</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Call Directly</span>
                  <div className="flex items-center gap-3">
                    <a href={SOCIAL_LINKS.phone} className="block text-sm hover:text-brand-gold transition-colors">+91 83070 04361</a>
                    <a href={SOCIAL_LINKS.whatsappBase} target="_blank" rel="noopener noreferrer" className="text-brand-gold transition-transform hover:scale-110">
                      <MessageCircle size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-end">
            <div className="rounded-[40px] bg-ink p-12 text-paper">
              <Sparkles className="mb-6 h-8 w-8 text-brand-gold" />
              <h3 className="mb-8 text-3xl leading-tight font-light">Book your free consultation today.</h3>
              <p className="mb-12 text-xs font-light tracking-wide text-paper/60 uppercase">Mon-Sun: 10:00 AM — 08:00 PM</p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#booking"
                  className="flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ink transition-all hover:bg-brand-gold hover:text-white"
                >
                  <Calendar size={14} /> Open Form
                </a>
                <a 
                  href={SOCIAL_LINKS.phone}
                  className="flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10"
                >
                  <Phone size={14} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-ink/10 pt-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
            © {new Date().getFullYear()} Mona Makeover Beauty Parlour. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-ink">
             <a href="#" className="hover:text-brand-gold">Privacy</a>
             <a href="#" className="hover:text-brand-gold">Terms</a>
             <a href="#" className="hover:text-brand-gold">Cookies</a>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-ink/5 bg-white/80 p-4 backdrop-blur-xl md:hidden">
        <a 
          href="#booking"
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-gold py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-brand-gold/20 transition-all active:scale-95"
        >
          <Calendar size={16} />
          Book Now
        </a>
      </div>
    </div>
  );
}
