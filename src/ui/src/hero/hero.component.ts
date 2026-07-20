import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-hero',
    imports: [],
    templateUrl: './hero.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroVideo') videoRef?: ElementRef<HTMLVideoElement>;
  isPlaying = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.videoRef) {
      return;
    }
    const video = this.videoRef.nativeElement;
    video.muted = true;
    video.loop = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      this.isPlaying = false;
    }
  }

  toggleVideo(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) {
      return;
    }
    video.muted = true;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }
}
