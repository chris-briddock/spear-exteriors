import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ServiceItem } from './service-item';
import { HandymanItem } from './handyman-item';

@Component({
  selector: 'app-services',
  imports: [NgOptimizedImage],
  templateUrl: './services.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services: ServiceItem[] = [
    {
      title: 'Window Cleaning',
      description: 'Water fed pole cleaning with pure water for streak-free, spotless windows every time.',
      image: 'assets/WindowCleaning/WindowCleaning1.png',
    },
    {
      title: 'Gutter Cleaning & Repairs',
      description: 'Full vacuum clearance of debris, plus photo and video evidence of every clean.',
      image: 'assets/GutterFasciaAndSoffitCleaning/GutterAndFasciaCleaning.png',
    },
    {
      title: 'Pressure Washing',
      description: 'Driveways, patios and paths refreshed and restored, weeds cleared at the root.',
      image: 'assets/PressureWashing/PressureWashing1.png',
    },
    {
      title: 'Roof Cleaning',
      description: 'Moss and algae safely removed to protect your roof and restore its appearance.',
      image: 'assets/RoofCleaning/RoofCleaning1.png',
    },
    {
      title: 'Soft Washing',
      description: 'Gentle chemical cleaning for render and walls too delicate for pressure washing.',
      image: 'assets/SoftWashing/WallCleaning1.png',
    },
    {
      title: 'Conservatory Cleaning',
      description: 'A thorough, dedicated clean for conservatory roofs and frames.',
      image: 'assets/ConservatoryCleaning/Conservatory1.png',
    },
  ];

  handymanServices: HandymanItem[] = [
    {
      title: 'Flat Pack Furniture Building',
      description: 'Wardrobes, desks, cabinets and more, built properly and securely.',
      icon: 'cube',
    },
    {
      title: 'Shelf Hanging',
      description: 'Shelves fitted level and secure, on any wall type.',
      icon: 'shelf',
    },
    {
      title: 'TV Wall Mounting',
      description: 'Televisions mounted safely and neatly, with cables tidied away.',
      icon: 'tv',
    },
    {
      title: 'Wood & Laminate Flooring Laying',
      description: 'Wood and laminate floors laid cleanly and finished to a high standard.',
      icon: 'flooring',
    },
    {
      title: 'Picture & Mirror Hanging',
      description: 'Pictures, mirrors and frames hung straight and secure.',
      icon: 'picture',
    },
  ];
}
