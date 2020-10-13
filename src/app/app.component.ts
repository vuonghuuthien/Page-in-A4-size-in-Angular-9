import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
  sizePage = {
    width: 21, //cm
    height: 29.7 //cm
  }
  paddingPage = {
    top: 2, //cm
    right: 2, //cm
    bottom: 2, //cm
    left: 2 //cm
  }
  color = 'black';
  pages = [
    {
      content: []
    }
  ]

  data = [
    {
      title: "Name",
      value: "Thomas K.Wilson"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }
  ]

  heightPageWithoutPadding = this.convertCmtoPx(this.sizePage.height - (this.paddingPage.top + this.paddingPage.bottom));
  elContainer = document.getElementById('container'); 

  constructor (){

  }
  
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.insertContentBlock();
  }

  insertContentBlock() {
    var nodes = "";
    var node = "";
    var iPage = 0; 
    var iBlock = 0; 
    var elPage = document.getElementById('page-' + iPage); 
    var elPageContent = document.getElementById('page-' + iPage + '-content'); 
    for (let i = 0; i < this.data.length; i++) {
      node = this.getHTMLBlock(iPage, iBlock, this.data[i]);
      elPageContent.innerHTML = nodes + node;
      if (elPageContent.offsetHeight > this.heightPageWithoutPadding) {
        this.elContainer.innerHTML = 
      } else {
        nodes += node;
        elPageContent.innerHTML = nodes;
      }
      console.log(elPageContent.offsetHeight);
    }
    // nodes += `<button type="button" class="buttonAdd" (click)="addBlock()">Add Block</button>`;
    

  }

  clickPage(iPage) {
    // document.getElementById('content-' + i).focus();
  }

  inputBlock(iPage, iBlock) {
    // var element = document.getElementById('content-' + i)
    // var heightContent = element.offsetHeight * 2.54 / 96; // Convert pixels to cm

  }

  addBlock() {

  }

  convertPxToCm(px) {
    return Math.round(px * 2.54/96 * 100) / 100;
  }

  convertCmtoPx(cm) {
    return Math.round(cm * 96/2.54);
  }

  getHTMLBlock(iPage, iBlock, data) {
    return `<div class="block" [id]="page-${iPage}-content-block-${iBlock}"
              (input)="inputBlock(${iPage}, ${iBlock})">
              <div class="title">${data.title}</div>
              <div class="value" contenteditable>${data.value}</div>
            </div>`;
  }

  getHTMLPage(iPage, iBlock, data) {
    return `<div class="page" [id]="'page-' + ${iPage}" 
              [style.height.cm]="${this.sizePage.height}"
              [style.width.cm]="${this.sizePage.width}"
              [style.paddingTop.cm]="${this.paddingPage.top}"
              [style.paddingRight.cm]="${this.paddingPage.right}"
              [style.paddingBottom.cm]="${this.paddingPage.bottom}"
              [style.paddingLeft.cm]="${this.paddingPage.left}" 
              (click)="clickPage(${iPage})">
              <div class="content" [id]="'page-' + i + '-content'">
                <div *ngFor="let block of page.content; index as j"
                  class="block" [id]="'page-' + i + '-content' + '-block-' + j"
                  (input)="inputBlock(i, j)">
                  <div class="title">{{block.title}}</div>
                  <div class="value" contenteditable>{{block.value}}</div>
                </div>
              </div>
            </div>`;
  }
}
