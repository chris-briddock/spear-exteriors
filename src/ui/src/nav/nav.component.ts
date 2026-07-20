import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationItemProps } from './navigation-item-props';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { BrandingComponent } from "../branding/branding.component";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, NgClass, BrandingComponent]
})

export class NavComponent {
  constructor() {}

  isNavOpen: boolean = false;
  navState: 'hidden' | 'visible' | 'closing' = 'hidden';

  public toggleNav(): void {

    this.isNavOpen = !this.isNavOpen;
    if (this.navState === 'hidden' || this.navState === 'closing') {
      this.isNavOpen = true;
      this.navState = 'visible';
    } else {
      this.closeNav();
    }
  }

  public closeNav(): void {
    this.isNavOpen = false;
    this.navState = 'closing';
    setTimeout(() => {
      this.navState = 'hidden';
    }, 500);
  }

  navigationItems: NavigationItemProps[] = [
    {
      id: 1,
      title: 'Services',
      content: ['Window Cleaning', 'Gutter Cleaning', 'Pressure Washing', 'Full Exterior Cleaning', 'Conservatory Cleaning', 'Roof Cleaning', 'Render Cleaning', 'Soffit & Fascia Cleaning'],
      link: ['window-cleaning', 'gutter-cleaning', 'pressure-washing', 'full-exterior-cleaning', 'conservatory-cleaning', 'roof-cleaning', 'render-cleaning', 'soffit-fascia-cleaning' ],
      expanded: false,
    },
    {
      id: 2,
      title: 'Handyman',
      content: ['Flat Pack Furniture Building', 'Shelf Hanging', 'TV Wall Mounting', 'Wood & Laminate Flooring Laying', 'Picture & Mirror Hanging'],
      link: ['flat-pack-furniture-building', 'shelf-hanging', 'tv-wall-mounting', 'wood-laminate-flooring-laying', 'picture-mirror-hanging'],
      expanded: false,
    }
  ];

  toggleAccordionItem(item: NavigationItemProps): void {
    item.expanded = !item.expanded;
  }
}
