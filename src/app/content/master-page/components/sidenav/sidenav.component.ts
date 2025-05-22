import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { NavItem,NavStatus } from "src/app/core/types/nav.types";

import { fadeInOut } from "src/app/core/animations/fadeInOut";
@Component({
  selector: "ot-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  animations: [fadeInOut],
})
export class SidenavComponent implements OnInit {
  @Input() items: NavItem[] = [];
  @Input() expandWidth: string = "17rem";
  @Input() backgroundColor: string = "rgb(0, 56, 101)";
  @Input() fontColor: string = "#ffffff";
  @Input() status:string="Development"
  filteredItems: NavItem[] = [];
  filterChanged: EventEmitter<string> = new EventEmitter<string>();
  marginWidth: string = "3rem";
  header: string = "";
  multiple: boolean = false;
  navStatus: NavStatus = NavStatus.Collapsed;
  constructor(private _router: Router) {
    this.navStatus = this.getNavStatusFromString(localStorage.getItem("ot-sidenav-status")??"Collapsed")
    if(this.navStatus == "Pinned")
      this.marginWidth = this.expandWidth
  }

  ngOnInit(): void {
    this.SetSCSSProperties();
    this.filteredItems = [...this.items];
  }
  togglePinned(): void {
    if (this.navStatus == "Pinned") {
      this.navStatus = NavStatus.Expand;
      this.marginWidth = "3rem";
    }
    else {
      this.navStatus = NavStatus.Pinned;
      this.marginWidth = this.expandWidth;
    }
    this.SetSCSSProperties();
    localStorage.setItem("ot-sidenav-status", this.navStatus);
    return;
  }
  SetSCSSProperties(): void {
    document.documentElement.style.setProperty(
      "--expand-width-ot-sidenav",
      this.expandWidth
    );
    document.documentElement.style.setProperty(
      "--background-color-ot-sidenav",
      this.backgroundColor
    );
    document.documentElement.style.setProperty(
      "--font-color-ot-sidenav",
      this.fontColor
    );
    document.documentElement.style.setProperty(
      "--margin-width-app-content",
      this.marginWidth
    );
  }
  handleClick(item: NavItem): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }
  // check if the item is active or not based on the url of the page and the href of the item
  getActiveClass(item: NavItem): string {
    if (this._router.url.includes(item.href) && item.href != "") {
      return "active";
    } else if (item.href == "" && item.expanded) {
      return "active";
    } else if (item.childrens != undefined) {
      for (const element of item.childrens) {
        if (this._router.url.includes(element.href)) {
          return "active";
        }
      }
      return "";
    } else {
      return "";
    }
  }
  applyFilter(event: Event): void {
    const filterTerm = (event.target as HTMLInputElement)?.value || '';
    if(filterTerm === ''){
      this.filteredItems = this.items
    }
    else{
    this.filteredItems = this.filterMenu(this.items, (item:NavItem) =>
      this.filterCriteria(item, filterTerm)
    );
    }
    this.filterChanged.emit(filterTerm);
  }  
  filterCriteria(item: NavItem, filterTerm: string): boolean {
    // Define aquí la lógica de filtrado, por ejemplo, basándote en el nombre del elemento
    return item.name.toLowerCase().includes(filterTerm.toLowerCase());
  }
  
  filterMenu(menu: NavItem[], filterCriteria: (item: NavItem) => boolean): NavItem[] {
    const filteredMenu: NavItem[] = [];
    for (const item of menu) {
      if (filterCriteria(item)) {
        filteredMenu.push(item);
      } else if (item.childrens && item.childrens.length > 0) {
        const filteredChildren = this.filterMenu(item.childrens, filterCriteria);
        if (filteredChildren.length > 0) {
          item.childrens = filteredChildren;
          filteredMenu.push(item);
        }
      }
    }
    return filteredMenu;
  }

  shrinkItems(item: NavItem): void {
    if (!this.multiple) {
      for (let modelItem of this.items) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  enter() {
    if (this.navStatus != "Pinned") {
      this.navStatus = NavStatus.Expand;
      localStorage.setItem("ot-sidenav-status", this.navStatus);
    }
  }
  // check if the cursor leaves the sidebar and collapse the sidebar if it is not pinned
  leave() {
    if (this.navStatus != "Pinned") {
      this.navStatus = NavStatus.Collapsed;
      localStorage.setItem("ot-sidenav-status", this.navStatus);
    }
    this.multiple = false;
  }
  getNavStatusFromString(statusString: string): NavStatus {
    const statusUpperCase = statusString.toUpperCase();
    if (statusUpperCase === 'COLLAPSED' || statusUpperCase === 'EXPAND' || statusUpperCase === 'PINNED')
      return NavStatus[statusString as keyof typeof NavStatus];
    return NavStatus.Collapsed;
  }
}
