import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgIf, NgFor, NgOptimizedImage],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit {
  videos = [
    "assets/CommercialWindowCleaning/CommerciaCleaning1.mp4", 
    "assets/CommercialWindowCleaning/CommerciaCleaning3.mp4", 
    "assets/CommercialWindowCleaning/CommerciaCleaning.mp4", 
    "assets/CommercialWindowCleaning/CommercialCleaning1.mp4", 
    "assets/CommercialWindowCleaning/CommercialCleaning3.mp4", 
    "assets/PressureWashing/PressureWashing2.mp4", 
    "assets/PressureWashing/PressureWashing3.mp4", 
    "assets/PressureWashing/PresurreWashing1.mp4", 
    "assets/RoofCleaning/RoofCleaning1.mp4", 
    "assets/WindowCleaning/WindowCleaning1.mp4", 
    "assets/WindowCleaning/WindowCleaning2.mp4", 
    "assets/WindowCleaning/WindowCleaning2.mp4"
  ];

  images = [
    "assets/ConservatoryCleaning/Conservatory1.png", 
    "assets/ConservatoryCleaning/Conservatory2.png", 
    "assets/ConservatoryCleaning/Conservatory3.png", 
    "assets/ConservatoryCleaning/Conservatory4.png", 
    "assets/GutterFasciaAndSoffitCleaning/GutterAndFasciaCleaning.png", 
    "assets/GutterFasciaAndSoffitCleaning/GutterAndFasciaCleaning1.png", 
    "assets/GutterFasciaAndSoffitCleaning/GutterCleaning1.png",  
    "assets/PressureWashing/PressureWashing1.png", 
    "assets/PressureWashing/PressureWashing2.png", 
    "assets/PressureWashing/PressureWashing3.png", 
    "assets/PressureWashing/PressureWashing4.png", 
    "assets/PressureWashing/PressureWashing5.png", 
    "assets/PressureWashing/PressureWashing6.png", 
    "assets/PressureWashing/PressureWashing7.png", 
    "assets/PressureWashing/PressureWashing8.png", 
    "assets/PressureWashing/PressureWashing9.png", 
    "assets/PressureWashing/PressureWashing10.png", 
    "assets/PressureWashing/PressureWashing11.png", 
    "assets/PressureWashing/PressureWashing12.png",
    "assets/RoofCleaning/RoofCleaning1.png",
    "assets/RoofCleaning/RoofCleaning2.png",
    "assets/SoftWashing/WallCleaning1.png",
    "assets/WindowCleaning/WindowCleaning1.png",
    "assets/WindowCleaning/WinodwCleaning3.png"
  ];

  combinedMedia: string[] = [];

  ngOnInit() {
    // Combine the arrays
    this.combinedMedia = [...this.images];

    // Sort the combined array (assuming sorting by filename)
    this.combinedMedia.sort();
  }
}
