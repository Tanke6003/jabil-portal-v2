import { Component, ContentChildren, QueryList, AfterContentInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-carousel',
  template: `
    <div class="carousel-container"  [ngStyle]="{ 'max-height': height !== '' ? height : 'auto','min-height': height !== '' ? height : 'auto' }">
      <button class="prev-button" (click)="onPrevClick()"><i class="fas fa-chevron-left"></i></button>
      <div class="carousel-OT">
        <ng-content></ng-content>
      </div>
      <button class="next-button" (click)="onNextClick()"><i class="fas fa-chevron-right"></i></button>
    </div>
  `,
  styleUrls: [],
})
export class CarouselComponent implements AfterContentInit {
  @ContentChildren('carouselItem') carouselItems!: QueryList<any>;

  @Input() autoplay = true;
  @Input() Interval: number = 7000;
  @Input() height?:string= '';
  index: number = 0;
  intervalId: any;

  ngAfterContentInit() {
    this.mostrarElemento(this.index);
    this.iniciarAutoplay();
  }

  onPrevClick() {
    this.index > 0? this.index-- : this.index  = this.carouselItems.length-1;
    this.mostrarElemento(this.index);
    this.resetAutoplay();
  }

  onNextClick() {
    this.index < this.carouselItems.length-1 ? this.index++ : this.index =0;
    this.mostrarElemento(this.index);
    this.resetAutoplay();
  }

  mostrarElemento(index: number) {
    this.carouselItems.toArray().forEach((item, i) => {
      item.nativeElement.classList.toggle('active', i === index);
    });
  }

  iniciarAutoplay() {
    if (this.autoplay) {
      this.intervalId = setInterval(() => {
        this.index < this.carouselItems.length-1 ? this.index++ : this.index =0;
        this.mostrarElemento(this.index);
      }, this.Interval);
    }
  }

  resetAutoplay() {
    if (this.autoplay) {
      clearInterval(this.intervalId);
      this.iniciarAutoplay();
    }
  }

  @HostListener('mouseenter')
  detenerAutoplay() {
    clearInterval(this.intervalId);
  }

  @HostListener('mouseleave')
  reiniciarAutoplay() {
    this.iniciarAutoplay();
  }

  @HostListener('window:blur', ['$event'])
  manejarPausaAutoplay(event: any) {
    this.detenerAutoplay();
  }

  @HostListener('window:focus', ['$event'])
  manejarReanudarAutoplay(event: any) {
    this.reiniciarAutoplay();
  }
}
