import React from 'react';
import '../css/section.css'

function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}

export default Section;
