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
    this.insertListData();
  }

  insertListData() {
    var html_ListBlock = ""; // HTML List Block of Current Page
    var html_Block = ""; // HTML Block of Current Block
    var iPage = 0; // index of Current Page
    var iBlock = 0; // index of Current Block
    var elPageContent = document.getElementById('page-' + iPage + '-content'); // Get element Content of Current Page
    for (let i = 0; i < this.data.length; i++) {
      // Create HTML Block this.data[i]
      html_Block = this.createHTMLBlock(iPage, iBlock, this.data[i]);
      // InnerHTML ListBlock and Current Block to Current Page
      elPageContent.innerHTML = html_ListBlock + html_Block; 
      // Check Content Height of Current Page
      if (elPageContent.offsetHeight > this.heightPageWithoutPadding) {
        // InnerHTML does not have Current Block
        elPageContent.innerHTML = html_ListBlock;
        // To the next page. Index Current Page is: 0 + 1 = 1
        iPage += 1;
        // Create HTML Page
        this.elContainer.innerHTML = this.createHTMLPage(iPage);
        // Get element Content of Current Page
        elPageContent = document.getElementById('page-' + iPage + '-content'); 
        html_ListBlock = html_Block; // HTML List Block of Current Page
        elPageContent.innerHTML = html_ListBlock;
      } else {
        html_ListBlock += html_Block;
        elPageContent.innerHTML = html_ListBlock;
      }
      console.log(elPageContent.offsetHeight);
    }
    // nodes += `<button type="button" class="buttonAdd" (click)="addBlock()">Add Block</button>`;
    

  }

  clickPage(iPage) {
    document.getElementById('page-' + iPage + '-content').focus();
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

  createHTMLBlock(iPage, iBlock, data) {
    return `<div class="block" [id]="page-${iPage}-content-block-${iBlock}"
              (input)="inputBlock(${iPage}, ${iBlock})">
              <div class="title">${data.title}</div>
              <div class="value" contenteditable>${data.value}</div>
            </div>`;
  }

  createHTMLPage(iPage) {
    return `<div class="page" id="page-${iPage}" 
              [style.height.cm]="${this.sizePage.height}"
              [style.width.cm]="${this.sizePage.width}"
              [style.paddingTop.cm]="${this.paddingPage.top}"
              [style.paddingRight.cm]="${this.paddingPage.right}"
              [style.paddingBottom.cm]="${this.paddingPage.bottom}"
              [style.paddingLeft.cm]="${this.paddingPage.left}" 
              (click)="clickPage(${iPage})">
              <div class="content" id="page-${iPage}-content">
              </div>
            </div>`;
  }
}
