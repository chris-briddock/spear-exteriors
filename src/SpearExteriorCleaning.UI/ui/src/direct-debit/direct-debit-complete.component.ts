import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GoCardlessService } from './gocardless.service';

@Component({
  selector: 'app-direct-debit-complete',
  imports: [RouterLink],
  templateUrl: './direct-debit-complete.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './direct-debit-complete.component.css',
})
export class DirectDebitCompleteComponent implements OnInit {
  status: 'loading' | 'success' | 'error' | 'missing' = 'loading';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gocardless: GoCardlessService,
  ) {}

  ngOnInit(): void {
    const redirectFlowId = this.route.snapshot.queryParamMap.get('redirect_flow_id');
    if (!redirectFlowId) {
      this.status = 'missing';
      return;
    }

    this.gocardless.completeRedirectFlow(redirectFlowId).subscribe({
      next: () => {
        this.status = 'success';
      },
      error: () => {
        this.status = 'error';
      },
    });
  }
}
