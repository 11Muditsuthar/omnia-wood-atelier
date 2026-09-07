import { useEffect, useRef, useState } from 'react';
import './App.css';

const projects = [
  { number: '01', title: 'The Quiet House', type: 'Private Residence · Jaipur', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=90&w=1800', className: 'project--wide' },
  { number: '02', title: 'Monumental Kitchen', type: 'Private Residence · Udaipur', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=1600', className: 'project--tall' },
  { number: '03', title: 'Chamber of Oak', type: 'Private Residence · Delhi', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=90&w=1600', className: 'project--tall project--offset' },
];

const process = [
  ['01', 'Listen', 'Every considered detail begins with a conversation about how a space should feel.'],
  ['02', 'Resolve', 'Drawings become finely-tuned proportions, material studies, and construction logic.'],
  ['03', 'Make', 'Our workshop translates precision into warmth—one surface, joint, and edge at a time.'],
  ['04', 'Settle', 'We install with quiet exactitude, until every piece belongs to the architecture.'],
];

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={diagonal ? 'icon icon--diagonal' : 'icon'}><path d="M4 12h15M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.25" /></svg>;
}

function Mark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>;
}

export default function App() {
  const [inquiry, setInquiry] = useState({ fullName: '', email: '', phone: '', projectDetails: '', website: '' });
  const [submissionState, setSubmissionState] = useState({ status: 'idle', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const appRef = useRef(null);
  const inquiryStartedAt = useRef(0);

  useEffect(() => {
    inquiryStartedAt.current = Date.now();
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 });
    const targets = document.querySelectorAll('[data-reveal]');
    targets.forEach((target) => revealObserver.observe(target));
    const onScroll = () => document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    const onPointerMove = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--pointer-y', `${(event.clientY / window.innerHeight) * 100}%`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => { revealObserver.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('pointermove', onPointerMove); };
  }, []);

  const handleInquirySubmit = async (event) => {
    event.preventDefault();
    const fullName = inquiry.fullName.trim();
    const email = inquiry.email.trim();
    const phone = inquiry.phone.trim();
    const projectDetails = inquiry.projectDetails.trim();
    if (!fullName || !email || !phone || !projectDetails) { setSubmissionState({ status: 'error', message: 'Please complete the required fields.' }); return; }
    setSubmissionState({ status: 'submitting', message: '' });
    try {
      const response = await fetch('https://formsubmit.co/ajax/muditsuthar@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          project_details: projectDetails,
          _subject: `New Omnia enquiry — ${fullName}`,
          _template: 'table',
          _replyto: email,
          _honey: inquiry.website,
          _captcha: 'true',
          submitted_after_ms: Date.now() - inquiryStartedAt.current,
        }),
      });
      if (!response.ok) throw new Error('Email delivery failed');
    } catch {
      setSubmissionState({ status: 'error', message: 'We could not send your inquiry. Please try again or email us directly.' });
      return;
    }
    setInquiry({ fullName: '', email: '', phone: '', projectDetails: '', website: '' });
    inquiryStartedAt.current = Date.now();
    setSubmissionState({ status: 'success', message: 'Thank you — your enquiry has been sent. We’ll be in touch shortly.' });
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={appRef} className="site-shell">
      <div className="film-grain" aria-hidden="true" />
      <header className="site-header">
        <a href="#top" className="brand" onClick={closeMenu} aria-label="Omnia Wood Atelier home"><Mark /><span className="brand-name">Omnia</span><span className="brand-subtitle">Wood Atelier</span></a>
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}><span>01</span> Work</a><a href="#atelier" onClick={closeMenu}><span>02</span> Atelier</a><a href="#process" onClick={closeMenu}><span>03</span> Process</a>
        </nav>
        <a href="#inquire" className="header-cta"><span>Start a project</span><Arrow /></a>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><i /><i /></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" role="img" aria-label="Custom timber interior with handcrafted cabinetry" /><div className="hero-ambient" aria-hidden="true" /><div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
        <p className="hero-location reveal" data-reveal><span className="pulse-dot" /> India · Worldwide</p>
        <div className="hero-copy"><p className="eyebrow hero-kicker reveal" data-reveal>Architectural millwork · master carpentry</p><h1 className="hero-title"><span className="reveal-line" data-reveal>Built for the</span><em className="reveal-line" data-reveal>way you live.</em></h1><div className="hero-bottom reveal" data-reveal><p>Rare materials, resolved with discipline.<br />Made for spaces that outlast trends.</p><a href="#work" className="circular-link" aria-label="Explore selected works"><Arrow diagonal /></a></div></div>
        <div className="hero-side-note" aria-hidden="true"><span>Scroll to explore</span><i /></div><div className="hero-index" aria-hidden="true">( 01 — 05 )</div>
      </section>

      <section className="ticker" aria-label="Our specialties"><div className="ticker-track"><span>Bespoke cabinetry <b>✦</b> Architectural interiors <b>✦</b> Hand-finished timber <b>✦</b> Bespoke cabinetry <b>✦</b> Architectural interiors <b>✦</b> Hand-finished timber <b>✦</b></span></div></section>

      <section className="intro section-pad" id="atelier">
        <div className="section-meta reveal" data-reveal><span>( About Omnia )</span><span>01 — 04</span></div>
        <div className="intro-grid"><div className="intro-visual reveal" data-reveal><div className="wood-block" aria-hidden="true"><span /><span /><span /><span /></div><p>Material Study<br />No. 03 — Walnut</p></div><div className="intro-copy"><p className="eyebrow reveal" data-reveal>More than a finish</p><h2 className="display-title reveal" data-reveal>We give timber<br /><em>its rightful weight.</em></h2><div className="intro-text reveal" data-reveal><p>Omnia is a studio for spaces with a point of view. We make quietly distinctive millwork for private homes, hospitality, and commercial interiors.</p><a className="text-link" href="#process">Inside the atelier <Arrow /></a></div></div></div>
      </section>

      <section className="capabilities section-pad"><div className="section-meta reveal" data-reveal><span>( What we make )</span><span>02 — 04</span></div><div className="capability-list">{['Kitchens & cabinetry', 'Libraries & private studies', 'Doors & wall panelling', 'Hospitality & retail fit-outs'].map((item, index) => <div className="capability-row reveal" data-reveal key={item}><span>0{index + 1}</span><h3>{item}</h3><a href="#inquire" aria-label={`Enquire about ${item}`}><Arrow diagonal /></a></div>)}</div></section>

      <section id="work" className="work section-pad"><div className="work-heading"><div className="section-meta reveal" data-reveal><span>( Selected works )</span><span>03 — 04</span></div><h2 className="display-title reveal" data-reveal>Objects of <em>belonging.</em></h2><p className="reveal" data-reveal>A small selection of spaces shaped around craft, proportion, and the people who inhabit them.</p></div><div className="project-grid">{projects.map((project) => <article className={`project ${project.className} reveal`} data-reveal key={project.number}><div className="project-image-wrap"><img src={project.image} alt={project.title} /></div><div className="project-caption"><span>{project.number}</span><div><h3>{project.title}</h3><p>{project.type}</p></div><a href="#inquire" aria-label={`Enquire about ${project.title}`}><Arrow diagonal /></a></div></article>)}</div><a href="#inquire" className="view-all reveal" data-reveal><span>Discuss your project</span><Arrow /></a></section>

      <section id="process" className="process section-pad"><div className="process-image" aria-hidden="true" /><div className="process-overlay" /><div className="process-content"><div className="section-meta section-meta--light reveal" data-reveal><span>( The Omnia way )</span><span>04 — 04</span></div><h2 className="display-title display-title--light reveal" data-reveal>There is a<br /><em>right way</em> to make.</h2><div className="process-list">{process.map(([number, title, text]) => <div className="process-row reveal" data-reveal key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section id="inquire" className="inquiry section-pad"><div className="inquiry-top"><div className="section-meta reveal" data-reveal><span>( Begin a conversation )</span><span>2026</span></div><h2 className="display-title reveal" data-reveal>Let’s make<br /><em>something lasting.</em></h2></div><form className="inquiry-form reveal" data-reveal onSubmit={handleInquirySubmit}><label><span>Your name / studio</span><input type="text" autoComplete="name" value={inquiry.fullName} onChange={(event) => setInquiry({ ...inquiry, fullName: event.target.value })} placeholder="Your name or practice" required /></label><div className="form-field-grid"><label className="form-small"><span>Email address</span><input type="email" autoComplete="email" value={inquiry.email} onChange={(event) => setInquiry({ ...inquiry, email: event.target.value })} placeholder="you@company.com" required /></label><label className="form-small"><span>Phone / WhatsApp</span><input type="tel" autoComplete="tel" value={inquiry.phone} onChange={(event) => setInquiry({ ...inquiry, phone: event.target.value })} placeholder="Your preferred number" required /></label></div><label><span>A little about your project</span><textarea value={inquiry.projectDetails} onChange={(event) => setInquiry({ ...inquiry, projectDetails: event.target.value })} placeholder="Tell us about the space, location, and what you have in mind…" rows="2" required /></label><label className="form-honeypot" aria-hidden="true"><span>Website</span><input type="text" tabIndex="-1" autoComplete="off" value={inquiry.website} onChange={(event) => setInquiry({ ...inquiry, website: event.target.value })} /></label><div className="form-footer"><p>For general enquiries:<br /><a href="mailto:muditsuthar@gmail.com">muditsuthar@gmail.com</a></p><button type="submit" disabled={submissionState.status === 'submitting'}><span>{submissionState.status === 'submitting' ? 'Sending...' : 'Send enquiry'}</span><Arrow diagonal /></button></div>{submissionState.message && <p className={`form-message ${submissionState.status}`} role="status">{submissionState.message}</p>}</form></section>
      <footer className="footer"><div className="footer-brand"><Mark /><span>Omnia</span></div><p>© {new Date().getFullYear()} Omnia Wood Atelier</p><a href="#top">Back to top <Arrow diagonal /></a></footer>
    </main>
  );
}
