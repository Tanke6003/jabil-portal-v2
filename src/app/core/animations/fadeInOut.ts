import { animate, style, transition, trigger } from "@angular/animations";
export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0}),
    animate('500ms',
      style({opacity: 1})
    )
  ]),
  transition(':leave', [
    style({opacity: 1}),
    animate('500ms',
      style({opacity: 0})
    )
  ])
])

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({height: 0}),
    animate('500ms',
      style({height: '*'})
    )
  ]),
  transition(':leave', [
    style({height: '*'}),
    animate('500ms',
      style({height: 0})
    )
  ])
])