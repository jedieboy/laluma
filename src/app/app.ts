import { Component } from '@angular/core';
import { ImageSwitcher } from './image-switcher/image-switcher';
import { ParallaxDirective } from './parallax.directive';
import { SiteHeader } from './site-header/site-header';
import { PHONE } from './site.config';

interface Service {
  name: string;
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [SiteHeader, ImageSwitcher, ParallaxDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly phone = PHONE;

  protected readonly services: { group: string; items: Service[] }[] = [
    {
      group: 'Stay',
      items: [
        { name: 'Boutique Stay / Rooms (By Reservation)', text: 'Cozy Standard & Suite Rooms For Couples/Families. 24H & Select Promos. Breakfast For 2 On Regular Stays. Reservation Required.' },
        { name: 'Table Reservations', text: 'Secure Your Seats In Advance. ₱1,000 Restaurant Reservation DP To Confirm (Deducted From Bill). Rebookable Policy Applies.' },
      ],
    },
    {
      group: 'Dine',
      items: [
        { name: 'Restaurant Dining (Lunch & Dinner)', text: 'Dine-In Filipino Comfort With A La Luma Twist. Perfect For Dates, Families, Barkada. Walk-Ins Welcome, Reservations Recommended.' },
        { name: 'Signature Cocktails / Open House Cocktail', text: 'House Signature Cocktails + Sharing Bottles Available. Ask For Menu & Pricing. Happy Hour May Apply (If Available).' },
        { name: 'Valentine Fine Dining + Sarswela (Feb 14–15)', text: 'Special Event Nights: Fine Dining + Live Sarswela Experience. Limited Slots. Reservation & DP Required.' },
      ],
    },
    {
      group: 'Celebrate',
      items: [
        { name: 'Wedding Reception Package', text: 'Wedding Venue Package Options With Event Space & Add-Ons. Ideal For 100–120 Pax Max. Advance Booking & DP Required.' },
        { name: 'Wedding Preparation Photoshoot', text: '2-Hour Wedding Prep Photoshoot Slot (AM Only) With Select Locations. Reservation + DP Required. Limited Availability.' },
        { name: 'Prenuptial Photoshoot Package', text: 'Exclusive Prenup Shoot Access (6 Hours) With Select Areas. Limited Slots. Reservation + DP Required.' },
        { name: 'Private Events / Venue Rental', text: 'Celebrate Birthdays, Anniversaries, Meetings & Intimate Gatherings. Flexible Setup Options. Reservation + DP Required.' },
        { name: 'Kids Art Events (Partner Programs)', text: 'Occasional Partner Events For Kids (Workshop/Competition/Exhibit). Limited Slots.' },
      ],
    },
  ];

  protected readonly phones = [
    { href: 'tel:09984966388', label: '0998 496 6388' },
    { href: 'tel:09984900388', label: '0998 490 0388' },
    { href: 'tel:09778301225', label: '0977 830 1225' },
  ];

  // TODO: replace with La Luma's exact Facebook page and listing URLs.
  protected readonly socials = [
    { href: 'https://www.instagram.com/la_luma2025', label: 'Instagram · la_luma2025' },
    { href: 'https://www.tiktok.com/@lalumasorsogon', label: 'TikTok · @lalumasorsogon' },
    { href: 'https://www.facebook.com/', label: 'Facebook · La Luma' },
  ];

  protected readonly bookingSites = [
    { href: 'https://www.airbnb.com/', label: 'Airbnb' },
    { href: 'https://www.booking.com/', label: 'Booking.com' },
    { href: 'https://www.agoda.com/', label: 'Agoda' },
  ];
}
