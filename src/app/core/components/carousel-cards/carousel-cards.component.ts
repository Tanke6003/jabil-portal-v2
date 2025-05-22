import { Component, ContentChildren, QueryList, AfterContentInit, Input, HostListener, OnInit } from '@angular/core';
export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;

}
@Component({
  selector: 'app-carousel-cards',
  templateUrl: './carousel-cards.component.html',
  styleUrls: ['./carousel-cards.component.scss']
})
export class CarouselCardsComponent implements AfterContentInit,OnInit{
  @Input() items: CarouselItem[] = [];
  isLoaded = false;
  @Input() autoplay = true;
  @Input() Interval: number = 2000;
  @Input() height?:string= '200px';
  @Input() cardsPerSlide: number = 3;

  index: number = 0;
  intervalId: any;
  itemsNodeList!: NodeListOf<Element>;
  async ngOnInit() {
    await this.getElements();
    this.mostrarElementos(this.index);
  }
  ngAfterContentInit() {
    if(this.autoplay)
      this.iniciarAutoplay();
    this.isLoaded = true;

  }

  onPrevClick() {
    this.index = (this.index - 1 + this.items.length) % this.items.length;
    this.mostrarElementos(this.index);
    this.resetAutoplay();
}

onNextClick() {
    this.index = (this.index + 1) % this.items.length;
    this.mostrarElementos(this.index);
    this.resetAutoplay();
}

 async getElements(){
  this.itemsNodeList = document.querySelectorAll('.carousel-item');
  return this.itemsNodeList;  
}

mostrarElementos(index: number) {
  const carouselItems = document.querySelectorAll('.carousel-item');
  carouselItems.forEach((item, i) => {
      const activeIndices = this.getActiveIndices(index, carouselItems.length);      
      item.classList.toggle('active', activeIndices.includes(i));
  });
}

getActiveIndices(index: number, totalItems: number): number[] {
  const activeIndices: number[] = [];

  for (let i = 0; i < this.cardsPerSlide; i++) {
      let activeIndex = index + i;
      if (activeIndex >= totalItems) {
          activeIndex = activeIndex - totalItems;
      }
      activeIndices.push(activeIndex);
  }
  return activeIndices;
}

  iniciarAutoplay() {
      this.intervalId = setInterval(() => {
        this.index < this.items.length-1 ? this.index++ : this.index =0;
        this.mostrarElementos(this.index);
      }, this.Interval);
  
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
    if(this.autoplay)
      this.iniciarAutoplay();
  }

  @HostListener('window:blur', ['$event'])
  manejarPausaAutoplay(event: any) {
    this.detenerAutoplay();
  }

  @HostListener('window:focus', ['$event'])
  manejarReanudarAutoplay(event: any) {
    if(this.autoplay)
      this.reiniciarAutoplay();
  }
}
