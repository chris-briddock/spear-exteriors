import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateRedirectFlowResponse {
  redirectUrl: string;
}

export interface CompleteRedirectFlowResponse {
  mandateId: string;
  customerId: string;
}

@Injectable({ providedIn: 'root' })
export class GoCardlessService {
  constructor(private readonly http: HttpClient) {}

  createRedirectFlow(): Observable<CreateRedirectFlowResponse> {
    return this.http.post<CreateRedirectFlowResponse>('/api/gocardless/redirect-flows', {});
  }

  completeRedirectFlow(redirectFlowId: string): Observable<CompleteRedirectFlowResponse> {
    return this.http.post<CompleteRedirectFlowResponse>(
      `/api/gocardless/redirect-flows/${encodeURIComponent(redirectFlowId)}/complete`,
      {},
    );
  }
}
