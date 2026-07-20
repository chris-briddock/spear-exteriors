import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { GalleryComponent } from "../gallery/gallery.component";
import { ServicesComponent } from "../services/services.component";
import { PackagesComponent } from "../packages/packages.component";
import { TrustComponent } from "../trust/trust.component";
import { ContactCtaComponent } from "../contact-cta/contact-cta.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [HeroComponent, ServicesComponent, PackagesComponent, TrustComponent, GalleryComponent, ContactCtaComponent]
})
export class HomeComponent {

}
