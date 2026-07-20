import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { PackageTier } from './package-tier';

@Component({
  selector: 'app-packages',
  imports: [NgClass],
  templateUrl: './packages.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './packages.component.css'
})
export class PackagesComponent {
  tiers: PackageTier[] = [
    {
      name: 'Bronze',
      tagline: 'A quick, sharp refresh for the front of your home.',
      fromPrice: '£120',
      features: [
        'Clean of windows and frames',
        'Clean fascia boards & soffits',
        'Clean of front door',
      ],
    },
    {
      name: 'Silver',
      tagline: 'Our most thorough clean, gutters and porch included.',
      fromPrice: '£185',
      features: [
        'Deep clean of windows and frames',
        'Clean fascia boards & soffits',
        'Deep clean of front door',
        'Gutters cleared out, front and rear',
        'Exterior gutters cleaned',
        'Clean of door porch way (if applicable)',
      ],
    },
    {
      name: 'Gold',
      tagline: 'Everything above, plus a freshly pressure-washed path.',
      fromPrice: '£300',
      features: [
        'Everything in Bronze & Silver',
        'Pressure clean of front pathways',
      ],
    },
    {
      name: 'Diamond',
      tagline: 'The complete top-to-bottom exterior transformation.',
      fromPrice: '£800',
      features: [
        'Everything in Bronze, Silver & Gold',
        'Front roof cleaned, moss removed and treatment applied',
      ],
      highlight: true,
    },
  ];
}
