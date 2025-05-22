import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, Input} from "@angular/core";
import { Router } from "@angular/router";
import { NavItem,NavStatus } from "src/app/core/types/nav.types";
import { fadeInOut } from "src/app/core/animations/fadeInOut";
@Component({
  selector: "app-sublevel-menu",
  template: `
    <ul
      *ngIf="navStatus != 'Collapsed'  && item.childrens && item.childrens.length > 0"
      [@submenu]="
        expanded
          ? {
              value: 'visible',
              params: {
                transitionParams: '500ms cubic-bezier(0.86, 0, 0.07, 1)',
                height: '*'
              }
            }
          : {
              value: 'hidden',
              params: {
                transitionParams: '500ms cubic-bezier(0.86, 0, 0.07, 1)',
                height: '0'
              }
            }
      "
      class="sublevel-nav"
    >
    <div
          *ngIf="item.childrens.length > 0; then noLast; else last"
        ></div>
        <ng-template #noLast>
        <li  *ngFor="let item of item.childrens" class="sublevel-nav-item sublevel-line">
        <a
          class="sublevel-nav-link"
          (click)="handleClick(item)"
          *ngIf="item.childrens && item.childrens.length > 0"
          [ngClass]="getActiveClass(item)"
        >
          <i
            
            class="sublevel-link-icon"
            [ngClass]="item.icon != '' ? item.icon : 'fa fa-circle'"
          ></i>
          <span class="sublevel-link-text" @fadeInOut *ngIf="navStatus?.toString() != 'Collapsed' ">
          {{item.name | translate}}
          </span>
          <i
            *ngIf="item.childrens && navStatus?.toString() != 'Collapsed' "
            class="menu-collapse-icon"
            [ngClass]="
              !item.expanded ? 'fa fa-angle-right' : 'fa fa-angle-down'
            "
          ></i>
        </a>
        <div
          *ngIf="
            (!item.childrens || (item.childrens && item.childrens.length === 0)) &&
              !item.external;
            then internalItemBlock;
            else externalItemBlock
          "
        ></div>
        <ng-template #internalItemBlock>
          <a
            class="sublevel-nav-link"
            *ngIf="!item.childrens || (item.childrens && item.childrens.length === 0)"
            [routerLink]="[item.href]"
            routerLinkActive="active-sublevel"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <i
              class="sublevel-link-icon"
              [ngClass]="(item.icon != '' && item.icon != null)? item.icon : 'fa fa-circle'"
            ></i>
            <span class="sublevel-link-text" @fadeInOut *ngIf="navStatus?.toString() != 'Collapsed' ">
            {{item.name | translate}}
            </span>
          </a>
        </ng-template>
        <ng-template #externalItemBlock>
          <a
            class="sublevel-nav-link"
            *ngIf="!item.childrens || (item.childrens && item.childrens.length === 0)"
            [href]="item.href"
            target="_blank"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <i
              class="sublevel-link-icon"
              [ngClass]="(item.icon != '' && item.icon != null) ? item.icon : 'fa fa-circle'"


            ></i>
            <span class="sublevel-link-text" @fadeInOut *ngIf="navStatus?.toString() != 'Collapsed' ">
            {{item.name | translate}}
            </span>
          </a>
        </ng-template>

        <div *ngIf="item.childrens && item.childrens.length > 0">
          <app-sublevel-menu
            [item]="item"
            [navStatus]="navStatus"
            [multiple]="multiple"
            [expanded]="item.expanded"
          ></app-sublevel-menu>
        </div>
      </li>
        </ng-template>
        <ng-template #last>
        <li  *ngFor="let item of item.childrens" class="sublevel-nav-item">
        <div
          *ngIf="
            (!item.childrens || (item.childrens && item.childrens.length === 0)) &&
              !item.external;
            then internalItemBlock;
            else externalItemBlock
          "
        ></div>
        <ng-template #internalItemBlock>
          <a
            class="sublevel-nav-link"
            *ngIf="!item.childrens || (item.childrens && item.childrens.length === 0)"
            [routerLink]="[item.href]"
            routerLinkActive="active-sublevel"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <i
              class="sublevel-link-icon"
              [ngClass]="(item.icon != '' && item.icon != null)? item.icon : 'fa fa-circle'"
            ></i>
            <span class="sublevel-link-text" @fadeInOut *ngIf="navStatus?.toString() != 'Collapsed' ">
            {{item.name | translate}}
            </span>
          </a>
        </ng-template>
        <ng-template #externalItemBlock>
          <a
            class="sublevel-nav-link"
            *ngIf="!item.childrens || (item.childrens && item.childrens.length === 0)"
            [href]="item.href"
            target="_blank"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <i
              class="sublevel-link-icon"
              [ngClass]="(item.icon != '' && item.icon != null) ? item.icon : 'fa fa-circle'"


            ></i>
            <span class="sublevel-link-text" @fadeInOut *ngIf="navStatus?.toString() != 'Collapsed' ">
            {{item.name | translate}}
            </span>
          </a>
        </ng-template>
        </li>
        </ng-template>


    </ul>
  `,
  styleUrls: ["./sidenav.component.scss"],
  animations: [
    fadeInOut,
    trigger("submenu", [
      state(
        "hidden",
        style({
          height: "0",
          overflow: "hidden",
        })
      ),
      state(
        "visible",
        style({
          height: "*",
        })
      ),
      transition("visible <=> hidden", [
        style({ overflow: "hidden" }),
        animate("{{transitionParams}}"),
      ]),
      transition("void => *", animate(0)),
    ]),
  ],
})
export class SublevelMenuComponent {
  @Input() item: NavItem = {
    href: "",
    icon: "",
    name: "",
    childrens: [],
  };
  @Input() navStatus:NavStatus= NavStatus.Collapsed;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(public router: Router) {

  }
  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.item.childrens && this.item.childrens.length > 0) {
        for (let modelItem of this.item.childrens) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }
  // get the style class for the body element based on the screen width and the collapsed state of the sidebar
  getActiveClass(item: NavItem): string {
    return item.expanded && this.router.url.includes(item.href)
      ? "active-sublevel"
      : "";
  }
  shrinkItems(item: NavItem): void {
    if (!this.multiple) {
      for (let modelItem of this.item.childrens??[]) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
  expandItem( item: NavItem): void {
    if (!this.multiple) {
      for (let modelItem of this.item.childrens??[]) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }
}
