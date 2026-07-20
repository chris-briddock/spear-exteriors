import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface TrustPoint {
  title: string;
  description: string;
}

@Component({
  selector: 'app-trust',
  imports: [NgOptimizedImage],
  templateUrl: './trust.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './trust.component.css'
})
export class TrustComponent {
  points: TrustPoint[] = [
    {
      title: 'Pure Water Technology',
      description: 'Carbon-fibre water fed poles and purified water for a streak-free, spotless finish on every window.',
    },
    {
      title: 'Proof of Every Clean',
      description: 'Gutters are vacuum cleared and checked, with photos and video provided as evidence of the work.',
    },
    {
      title: 'Local Coverage',
      description: 'Serving Milton Keynes, Bedfordshire, Buckinghamshire and Hertfordshire.',
    },
    {
      title: 'Flexible Scheduling',
      description: 'Regular cleans every 4, 6 or 8 weeks, or a one-off visit whenever you need it.',
    },
  ];
}
