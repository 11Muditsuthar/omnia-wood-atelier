import React, { useState } from 'react';
import { supabase } from './supabase';
import './App.css'; 

export default function App() {
  const [inquiry, setInquiry] = useState({ fullName: '', projectDetails: '' });
  const [submissionState, setSubmissionState] = useState({ status: 'idle', message: '' });

  const handleInquirySubmit = async (event) => {
    event.preventDefault();
    const fullName = inquiry.fullName.trim();
    const projectDetails = inquiry.projectDetails.trim();

    if (!fullName || !projectDetails) {
      setSubmissionState({ status: 'error', message: 'Please complete both fields.' });
      return;
    }

    setSubmissionState({ status: 'submitting', message: '' });

    const { error } = await supabase.from('client_inquiries').insert({
      name: fullName,
      project_details: projectDetails,
    });

    if (error) {
      setSubmissionState({ status: 'error', message: 'Submission failed. Try again.' });
      return;
    }

    setInquiry({ fullName: '', projectDetails: '' });
    setSubmissionState({ status: 'success', message: 'Inquiry submitted successfully.' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-zinc-700 selection:text-white">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-zinc-800/50 backdrop-blur-xl sticky top-0 z-50 bg-zinc-950/70">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <span className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-zinc-100">
            Omnia
          </span>
          <span className="text-[10px] md:text-xs tracking-widest text-zinc-500 uppercase mt-1 md:mt-0">
            Wood Atelier
          </span>
        </div>
        <div className="hidden lg:flex items-center space-x-10 text-[11px] tracking-[0.2em] uppercase text-zinc-400">
          <a href="#portfolio" className="hover:text-zinc-100 transition-colors duration-300">Portfolio</a>
          <a href="#philosophy" className="hover:text-zinc-100 transition-colors duration-300">Philosophy</a>
          <a href="#inquire" className="hover:text-zinc-100 transition-colors duration-300">Start Project</a>
        </div>
        <div className="hidden md:block">
          <a href="#inquire">
            <button className="text-[11px] uppercase tracking-[0.2em] border border-zinc-700 px-6 py-3 hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-300">
              Inquire
            </button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 min-h-[95vh] border-b border-zinc-900 overflow-hidden">
        
        {/* Animated Background Layer */}
        <div className="absolute inset-0 z-0 bg-zinc-950 flex items-center justify-center">
          {/* Wood Texture Base */}
          <img 
            src="https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&q=80&w=2000" 
            alt="Master Carpentry Woodwork" 
            className="absolute inset-0 w-full h-full object-cover opacity-15 hero-pan mix-blend-luminosity"
          />
          
          {/* Animated Architectural Grid */}
          <div className="absolute inset-0 bg-blueprint-grid animate-blueprint z-10"></div>
          
          {/* Cinematic Spotlight Overlay (Darkens edges, highlights center) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--tw-gradient-stops))] from-transparent via-zinc-950/80 to-zinc-950 z-20"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-30 flex flex-col items-center w-full mt-[-80px]">
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-zinc-400 mb-8 opacity-0 hero-fade-up">
            Architectural Millwork & Master Carpentry
          </p>
          
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter max-w-5xl text-zinc-100 leading-[1.1] opacity-0 hero-fade-up hero-delay-1">
            Global Standards. <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-100 to-zinc-500 hero-shine">
              Master Craftsmanship.
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-16 w-full sm:w-auto opacity-0 hero-fade-up hero-delay-2 justify-center">
            <a href="#portfolio" className="w-full sm:w-auto">
              <button className="w-full bg-zinc-100 text-zinc-950 px-10 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-300 transition-colors duration-300">
                Explore Portfolio
              </button>
            </a>
            <a href="#inquire" className="w-full sm:w-auto">
              <button className="w-full border border-zinc-700 text-zinc-300 px-10 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-900 hover:border-zinc-500 transition-all duration-300">
                Initiate Project
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy & Heritage Statement */}
      <section id="philosophy" className="px-6 md:px-12 py-24 md:py-32 max-w-6xl mx-auto border-b border-zinc-900 text-left">
        <div className="max-w-3xl mb-16">
          <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-6 text-zinc-100">Our Philosophy</h2>
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            Omnia Wood Atelier was founded on a singular principle: uncompromising quality. We bridge the gap between traditional master carpentry and modern architectural demands, ensuring every piece of bespoke woodwork serves as a structural and visual anchor for the spaces it inhabits.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-zinc-300 mb-4 border-b border-zinc-800 pb-4">01. Heritage</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light mt-4">
              Decades of raw hands-on woodcraft refined into a standardized, modern execution unit.
            </p>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-zinc-300 mb-4 border-b border-zinc-800 pb-4">02. Precision</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light mt-4">
              Engineered joinery, premium hardware integration, and museum-grade finishes.
            </p>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-zinc-300 mb-4 border-b border-zinc-800 pb-4">03. Scale</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light mt-4">
              Structured teams ready to deploy on architect-led commercial and residential sites.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-b border-zinc-900">
        <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-16 text-center text-zinc-100">Core Capabilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-zinc-900/30 border border-zinc-800/50">
            <p className="text-zinc-300 text-[10px] md:text-xs tracking-[0.2em] uppercase">Bespoke Cabinetry</p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-800/50">
            <p className="text-zinc-300 text-[10px] md:text-xs tracking-[0.2em] uppercase">Architectural Doors</p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-800/50">
            <p className="text-zinc-300 text-[10px] md:text-xs tracking-[0.2em] uppercase">Custom Libraries</p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-800/50">
            <p className="text-zinc-300 text-[10px] md:text-xs tracking-[0.2em] uppercase">Commercial Fit-outs</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 px-4 md:px-6 max-w-[1400px] mx-auto border-b border-zinc-900">
        <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-16 text-center text-zinc-100">Selected Works</h2>
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
          
          <div className="group relative overflow-hidden bg-zinc-900 aspect-[2.35/1] border border-zinc-800/50">
            <img 
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600" 
              alt="Bespoke Library" 
              className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              <p className="text-zinc-100 text-[10px] md:text-xs tracking-[0.2em] uppercase bg-zinc-950/90 px-4 py-2 border border-zinc-800/50 backdrop-blur-md">
                Bespoke Library
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-zinc-900 aspect-[2.35/1] border border-zinc-800/50">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600" 
              alt="Architectural Kitchen" 
              className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              <p className="text-zinc-100 text-[10px] md:text-xs tracking-[0.2em] uppercase bg-zinc-950/90 px-4 py-2 border border-zinc-800/50 backdrop-blur-md">
                Architectural Kitchen
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Client Inquiry Section */}
      <section id="inquire" className="py-24 md:py-32 px-6 max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-6 text-zinc-100">Initiate a Project</h2>
        <p className="text-zinc-400 text-xs md:text-sm mb-12 font-light leading-relaxed">Partner with us for bespoke residential or commercial architectural millwork.</p>
        <form className="flex flex-col gap-6 text-left" onSubmit={handleInquirySubmit}>
          <input
            type="text"
            placeholder="Client or Firm Name"
            value={inquiry.fullName}
            onChange={(event) => setInquiry({ ...inquiry, fullName: event.target.value })}
            required
            className="bg-zinc-900/30 border border-zinc-800/80 p-5 text-sm text-zinc-100 outline-none focus:border-zinc-400 focus:bg-zinc-900/60 transition-all duration-300 placeholder:text-zinc-600"
          />
          <textarea
            placeholder="Project Details (e.g., Kitchen Millwork, Commercial Fit-out)"
            value={inquiry.projectDetails}
            onChange={(event) => setInquiry({ ...inquiry, projectDetails: event.target.value })}
            required
            rows="4"
            className="bg-zinc-900/30 border border-zinc-800/80 p-5 text-sm text-zinc-100 outline-none focus:border-zinc-400 focus:bg-zinc-900/60 transition-all duration-300 placeholder:text-zinc-600 resize-none"
          />
          <button
            type="submit"
            disabled={submissionState.status === 'submitting'}
            className="bg-zinc-100 text-zinc-950 py-5 mt-2 text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-300 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submissionState.status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
          </button>
          {submissionState.message && (
            <p className={`text-xs tracking-wide text-center mt-4 ${submissionState.status === 'error' ? 'text-red-400' : 'text-emerald-400'}`} role="status">
              {submissionState.message}
            </p>
          )}
        </form>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900 bg-zinc-950 text-center flex flex-col items-center">
        <span className="text-xl font-light tracking-[0.3em] uppercase text-zinc-100 mb-6">Omnia</span>
        <div className="flex space-x-8 mb-8 text-[10px] tracking-[0.2em] uppercase text-zinc-400">
          <a href="#" className="hover:text-zinc-100 transition-colors">Instagram</a>
          <a href="mailto:muditsuthar@gmail.com" className="hover:text-zinc-100 transition-colors">Email Us</a>
        </div>
        <p className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase">© {new Date().getFullYear()} Mudit Suthar. All rights reserved.</p>
      </footer>
    </div>
  );
}