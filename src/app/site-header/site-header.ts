import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { PHONE } from '../site.config';

const MOBILE_QUERY = '(max-width: 859.98px)';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  host: { '[class.solid]': 'solid()' },
})
export class SiteHeader {
  protected readonly phone = PHONE;
  protected readonly links = [
    { href: '#inside', label: 'Inside' },
    { href: '#services', label: 'Services' },
    { href: '#asin', label: 'Local' },
    { href: '#visit', label: 'Visit' },
  ];

  private readonly scrolled = signal(false);
  private readonly mobile = signal(false);
  private readonly open = signal(false);

  /** The menu panel only exists on mobile widths. */
  protected readonly menuOpen = computed(() => this.mobile() && this.open());
  protected readonly solid = computed(() => this.scrolled() || this.menuOpen());

  constructor() {
    const mq = matchMedia(MOBILE_QUERY);
    const onMq = () => {
      this.mobile.set(mq.matches);
      if (!mq.matches) this.open.set(false);
    };
    const onScroll = () => this.scrolled.set(window.scrollY > 60);
    onMq();
    onScroll();
    mq.addEventListener('change', onMq);
    window.addEventListener('scroll', onScroll, { passive: true });
    inject(DestroyRef).onDestroy(() => {
      mq.removeEventListener('change', onMq);
      window.removeEventListener('scroll', onScroll);
    });
  }

  protected toggleMenu(): void {
    this.open.update((v) => !v);
  }

  protected closeMenu(): void {
    this.open.set(false);
  }
}
