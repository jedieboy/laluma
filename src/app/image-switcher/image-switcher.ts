import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { SITE_CONFIG } from '../site.config';

export interface Slide {
  src: string;
  pos: string;
  kicker: string;
  title: string;
  text: string;
}

export const SLIDES: Slide[] = [
  { src: 'images/hero-facade.png', pos: '30% center', kicker: 'THE TERRACE', title: 'Arches and garden light', text: 'Tall arched windows, textured walls and a shaded garden terrace set the mood before you walk in.' },
  { src: 'images/burger.png', pos: 'center', kicker: 'RESTAURANT', title: 'Filipino comfort, La Luma twist', text: 'Dine-In Filipino Comfort With A La Luma Twist. Perfect For Dates, Families, Barkada. Walk-Ins Welcome, Reservations Recommended.' },
  { src: 'images/la-musica.png', pos: 'center', kicker: 'LA MUSICA', title: 'Classic OPM hits, live', text: 'Evening sets of classic OPM in an intimate room. Book your reservation to save a seat.' },
  { src: 'images/lamps.png', pos: 'center', kicker: 'LOCAL CRAFT', title: 'Parisukat na mga Tala', text: 'An original old woodcraft by Ronaldo “NAD” Tamang, artisan of Brgy. Paulog, Ligao. Si NAD ay gumagawa ng mga woodwork gaya ng mga religious image, pinto, hamba at iba pa, at para mapakinabangan ang mga scrap, naisipan niya itong gawing lamps.' },
  { src: 'images/asin-latte.png', pos: 'center 75%', kicker: 'CAFÉ', title: 'Asin tibuok latte', text: 'Made with asin tibuok, a traditional Boholano sea salt handmade using natural materials and an age-old process.' },
  { src: 'images/asin-chef.png', pos: 'center 30%', kicker: 'THE KITCHEN', title: 'Let’s love our local ingredients more', text: 'Our kitchen works with ingredients and makers from around the region.' },
];

const pad = (n: number) => String(n).padStart(2, '0');

@Component({
  selector: 'app-image-switcher',
  templateUrl: './image-switcher.html',
  styleUrl: './image-switcher.css',
})
export class ImageSwitcher {
  protected readonly slides = SLIDES;
  protected readonly idx = signal(0);
  private readonly paused = signal(false);

  protected readonly active = computed(() => SLIDES[this.idx()]);
  protected readonly counter = computed(() => `${pad(this.idx() + 1)} / ${pad(SLIDES.length)}`);
  protected readonly progress = computed(() => `${((this.idx() + 1) / SLIDES.length) * 100}%`);

  constructor() {
    const timer = setInterval(() => {
      if (SITE_CONFIG.autoplay && !this.paused()) this.go(this.idx() + 1);
    }, SITE_CONFIG.autoplaySeconds * 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  protected go(i: number): void {
    const n = SLIDES.length;
    this.idx.set(((i % n) + n) % n);
  }

  protected prev(): void {
    this.go(this.idx() - 1);
  }

  protected next(): void {
    this.go(this.idx() + 1);
  }

  protected setPaused(paused: boolean): void {
    this.paused.set(paused);
  }
}
