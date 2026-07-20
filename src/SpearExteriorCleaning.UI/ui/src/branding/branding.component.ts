import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-branding',
    imports: [RouterLink],
    templateUrl: './branding.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './branding.component.css'
})
export class BrandingComponent {

}
