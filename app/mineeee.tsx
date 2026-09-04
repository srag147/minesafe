"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Set the standard",
    description: "Make safety the foundation of every shift.",
  },
  {
    number: "02",
    title: "Stay situationally aware",
    description: "Recognize hazards before they become incidents.",
  },
  {
    number: "03",
    title: "Learn and improve",
    description: "Turn every experience into a safer next shift.",
  },
];

export default function Home() {
  const [menuOpen] = useState(false);
  return (
    <main>
      <nav className="site-nav">
        <Link href="/" className="brand">
          <span className="logo-mark">M</span>
          <span>MineSafe</span>
        </Link>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#mission">Mission</a>
          <a href="#principles">Principles</a>
          <a href="#resources">Resources</a>
          <a href="/dashboard" className="nav-button">
            Dashboard
          </a>
        </div>
      </nav>

    <section className="hero">
  <div className="hero-grid">

    <div className="hero-copy">
      <p className="eyebrow">
        <span className="eyebrow-line" />
        Safety starts here
      </p>

      <h1>
        Every shift.
        <br />
        Everyone home.
      </h1>

      <p className="hero-description">
        MineSafe helps mining teams build safer habits, identify risks,
        and make better decisions before incidents happen.
      </p>

      <div className="hero-actions">
        <a href="/dashboard" className="button button-primary">
          Open Dashboard →
        </a>

        <a href="#mission" className="text-link">
          Learn more <span>→</span>
        </a>
      </div>
    </div>

    <div className="mine-illustration">
      <div className="tunnel tunnel-back" />
      <div className="tunnel tunnel-mid" />
      <div className="tunnel tunnel-front" />

      <div className="tunnel-light" />

      <div className="rail rail-left" />
      <div className="rail rail-right" />

      <div className="illustration-label label-top">
        MINE SAFE <span>{"///"}</span>
      </div>

      <div className="tunnel-marker">
        01
        <span> SAFE</span>
      </div>

      <div className="illustration-label label-bottom">
        STATUS
        <strong>
          <span className="status-dot" />
          ACTIVE
        </strong>
      </div>
    </div>

  </div>

  <div className="hero-foot">
    <span className="foot-rule" />
    Built for safer shifts
  </div>
</section>

      <section id="mission" className="section">
        <p className="eyebrow">THE MISSION</p>

        <h2>
          Safety isn&apos;t a checklist.
          <br />
          <span>It&apos;s a culture.</span>
        </h2>

        <p className="section-description">
          MineSafe gives teams a simple framework for building awareness,
          improving communication, and reducing preventable risk.
        </p>
      </section>

      <section id="principles" className="section principles">
        <div className="section-heading">
          <p className="eyebrow">THREE PRINCIPLES</p>
          <h2>Simple rules. Serious impact.</h2>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article key={step.number} className="step-card">
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="resources" className="section resources">
        <p className="eyebrow">RESOURCES</p>

        <h2>Build safer habits every day.</h2>

        <p className="section-description">
          Explore safety guidance, shift resources, and operational tools
          designed for real-world mining environments.
        </p>

        <a href="/dashboard" className="primary-button">
          Explore Dashboard →
        </a>
      </section>

      <footer>
        <div className="brand">
          <span className="logo-mark">M</span>
          <span>MineSafe</span>
        </div>

        <p>Safety starts here.</p>
      </footer>
    </main>
  );
}