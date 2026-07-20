import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: 'direct-debit',
        loadComponent: () => import('../direct-debit/direct-debit.component').then(m => m.DirectDebitComponent),
    },
    {
        path: 'direct-debit/complete',
        loadComponent: () => import('../direct-debit/direct-debit-complete.component').then(m => m.DirectDebitCompleteComponent),
    },
];
