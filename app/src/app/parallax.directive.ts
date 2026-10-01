import {
  DestroyRef,
  Directive,
  ElementRef,
  Injectable,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { SITE_CONFIG } from './site.config';

/**
 * Shares one passive scroll/resize listener across every parallax layer and
 * updates them in a single requestAnimationFrame.
 */
@Injectable({ providedIn: 'root' })
export class ParallaxService {
  private readonly layers = new Set<ParallaxDirective>();
  private raf = 0;
  private listening = false;
  private readonly reducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  private readonly schedule = () => {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.update();
    });
  };

  register(layer: ParallaxDirective): void {
    this.layers.add(layer);
    if (!this.listening) {
      this.listening = true;
      window.addEventListener('scroll', this.schedule, { passive: true });
      window.addEventListener('resize', this.schedule);
    }
    this.schedule();
  }

  unregister(layer: ParallaxDirective): void {
    this.layers.delete(layer);
    if (this.listening && this.layers.size === 0) {
      this.listening = false;
      window.removeEventListener('scroll', this.schedule);
      window.removeEventListener('resize', this.schedule);
    }
  }

  private update(): void {
    if (this.reducedMotion) return;
    const k = SITE_CONFIG.parallaxStrength;
    const ih = window.innerHeight;
    for (const layer of this.layers) {
      const el = layer.el.nativeElement;
      const parent = el.parentElement;
      if (!parent) continue;
      // Offset is measured from the parent so the layer's own transform doesn't feed back.
      const r = parent.getBoundingClientRect();
      if (r.bottom < -200 || r.top > ih + 200) continue;
      const c = r.top + r.height / 2 - ih / 2;
      el.style.transform = `translate3d(0,${(-c * layer.speed() * k).toFixed(1)}px,0)`;
    }
  }
}

/** Moves the host vertically at `speed` × the parent's distance from the viewport centre. */
@Directive({
  selector: '[appParallax]',
  host: { style: 'will-change: transform' },
})
export class ParallaxDirective {
  readonly speed = input.required<number>({ alias: 'appParallax' });
  readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const service = inject(ParallaxService);
    afterNextRender(() => service.register(this));
    inject(DestroyRef).onDestroy(() => service.unregister(this));
  }
}
