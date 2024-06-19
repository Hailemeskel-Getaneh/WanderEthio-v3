import React from 'react';
import { Link } from 'react-router-dom';
import FixedHeader from './FIxedHeader';
import { BottomHeader } from './Header';
import '../styles/headerBooking.css';

export default function HeaderBooking() {
  return (
    <div>
        <FixedHeader />

      <section className="booking-hero">

        <h1>Book Your Trip</h1>
        <p className='booking-discoverPara'>Plan your perfect Ethiopian getaway</p>
        <p className='booking-headercontentP'>Book now to enjoy exclusive offers, hassle-free reservations, and personalized travel experiences in Ethiopia.</p>
  
  <BottomHeader/>
      </section>
    </div>
  );
}
