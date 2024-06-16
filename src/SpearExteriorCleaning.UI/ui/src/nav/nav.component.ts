import { Component,  } from '@angular/core';
import { NavigationItemProps } from './navigation-item-props';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';
import { BrandingComponent } from "../branding/branding.component";

@Component({
    selector: 'app-nav',
    standalone: true,
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    imports: [RouterLink, NgFor, NgClass, BrandingComponent]
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
      this.isNavOpen = false;
      this.navState = 'closing';
      setTimeout(() => {
        this.navState = 'hidden';
      }, 500);
    }
  }

  navigationItems: NavigationItemProps[] = [
    {
      id: 1,
      title: 'Services',
      content: ['Window Cleaning', 'Gutter Cleaning', 'Pressure Washing', 'Full Exterior Cleaning', 'Conservatory Cleaning', 'Roof Cleaning', 'Render Cleaning', 'Soffit & Fascia Cleaning'],
      link: ['window-cleaning', 'gutter-cleaning', 'pressure-washing', 'full-exterior-cleaning', 'conservatory-cleaning', 'roof-cleaning', 'render-cleaning', 'soffit-fascia-cleaning' ],
      expanded: false,
    }
  ];

  toggleAccordionItem(item: NavigationItemProps): void {
    item.expanded = !item.expanded;
  }
}
