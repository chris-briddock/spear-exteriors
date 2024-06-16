import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { GalleryComponent } from "../gallery/gallery.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeroComponent, GalleryComponent]
})
export class HomeComponent {

}
