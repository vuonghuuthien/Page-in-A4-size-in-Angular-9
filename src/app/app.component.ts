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
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
    }, {
      title: "Email",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone",
      value: "0123 456 789"
    }, {
      title: "Job",
      value: "Teacher"
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
    var html_ListBlock = "";
    var html_Block = "";
    var iPage = 0;
    var iBlock = 0;
    var elPageContent = document.getElementById('page-' + iPage + '-content');
    for (let i = 0; i < this.data.length; i++) {
      // Create HTML Block this.data[i]
      html_Block = this.createHTMLBlock(iPage, iBlock, this.data[i]);
      elPageContent.innerHTML = html_ListBlock + html_Block; 

      if (elPageContent.offsetHeight > this.heightPageWithoutPadding) {
        elPageContent.innerHTML = html_ListBlock;

        iPage += 1;
        this.elContainer.innerHTML += this.createHTMLPage(iPage);
        elPageContent = document.getElementById('page-' + iPage + '-content'); 
        
        html_ListBlock = html_Block;
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
    var elPageContent = anchor.parentElement.parentElement;
    console.log(iPage);
    console.log(iBlock);
    console.log(elPageContent.offsetHeight);
    if (elPageContent.offsetHeight > this.heightPageWithoutPadding) {
      
    } else {

    }
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
              style="
                height: ${this.sizePage.height}cm;
                width:  ${this.sizePage.width}cm;
                padding-top: ${this.paddingPage.top}cm;
                padding-right: ${this.paddingPage.right}cm;
                padding-bottom: ${this.paddingPage.bottom}cm;
                padding-left: ${this.paddingPage.left}cm;
              ">
              <div class="content" id="page-${iPage}-content">
              </div>
            </div>`;
  }
}
