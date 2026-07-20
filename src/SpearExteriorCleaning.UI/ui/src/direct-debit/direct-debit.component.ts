import { Component, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GoCardlessService } from './gocardless.service';

@Component({
  selector: 'app-direct-debit',
  imports: [],
  templateUrl: './direct-debit.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './direct-debit.component.css',
})
export class DirectDebitComponent {
  status: 'idle' | 'loading' | 'error' = 'idle';

  constructor(
    private gocardless: GoCardlessService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  startSetup(): void {
    if (!isPlatformBrowser(this.platformId) || this.status === 'loading') {
      return;
    }
    this.status = 'loading';
    this.gocardless.createRedirectFlow().subscribe({
      next: (response) => {
        window.location.href = response.redirectUrl;
      },
      error: () => {
        this.status = 'error';
      },
    });
  }
}
