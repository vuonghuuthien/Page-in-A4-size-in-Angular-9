import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

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
  elContainer;
  anchorsBlockValue;

  constructor (private elementRef: ElementRef){

  }
  
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.elContainer = document.getElementById('container');
    this.insertListData();
    this.anchorsBlockValue = this.elementRef.nativeElement.querySelectorAll('.block .value');
    this.anchorsBlockValue.forEach((anchor: HTMLAnchorElement) => {
      anchor.addEventListener('input', this.handleAnchorBlockValue)
    })
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
      iBlock += 1;
    }
    // nodes += `<button type="button" class="buttonAdd" (click)="addBlock()">Add Block</button>`;
    

  }

  handleAnchorBlockValue = (event: Event) => {
    // Prevent opening anchors the default way
    event.preventDefault();
    const anchor = event.target as HTMLAnchorElement;
    const id_anchorParentEl = anchor.parentElement.getAttribute('id'); // page-iPage-content-block-iBlock
    const iPage = id_anchorParentEl.slice(id_anchorParentEl.indexOf("page-") + ("page-").length, id_anchorParentEl.indexOf("-content"));
    const iBlock = id_anchorParentEl.slice(id_anchorParentEl.indexOf("block-") + ("block-").length, id_anchorParentEl.length);
    this.inputBlock(iPage, iBlock);
  }

  inputBlock(iPage, iBlock) {
    console.log(iPage);
    console.log(iBlock);

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
    return `<div class="block" id="page-${iPage}-content-block-${iBlock}">
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
              [style.paddingLeft.cm]="${this.paddingPage.left}">
              <div class="content" id="page-${iPage}-content">
              </div>
            </div>`;
  }
}
