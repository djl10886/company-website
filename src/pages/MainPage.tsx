import React from 'react';
import Home from './Home';
import About from './About';
import Products from './Products';
import Contact from './Contact';

export default function MainPage() {
  return (
    <main>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="products">
        <Products />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}