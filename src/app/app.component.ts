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
  pageContent = [[]]; // Ex: [[1, 2, 3], [4, 5]]

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
      
      html_Block = this.createHTMLBlock(iPage, iBlock, this.data[i]);
      elPageContent.innerHTML = html_ListBlock + html_Block; 

      if (elPageContent.offsetHeight > this.heightPageWithoutPadding) {
        elPageContent.innerHTML = html_ListBlock;

        iPage += 1;
        this.elContainer.innerHTML += this.createHTMLPage(iPage);
        elPageContent = document.getElementById('page-' + iPage + '-content'); 
        
        this.pageContent[iPage] = [];
        this.pageContent[iPage].push(iBlock);

        html_Block = this.createHTMLBlock(iPage, iBlock, this.data[i]);
        html_ListBlock = html_Block;
        elPageContent.innerHTML = html_ListBlock;
      } else {
        this.pageContent[iPage].push(iBlock);
        
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
    if (elPageContent.offsetHeight > this.heightPageWithoutPadding) {
      if (this.pageContent[iPage + 1] == null) {
        this.elContainer.innerHTML += this.createHTMLPage(iPage);
        // elPageContent = document.getElementById('page-' + iPage + '-content'); 
        // this.pageContent[iPage].pop();
        this.pageContent[iPage + 1] = [];
        // this.pageContent[iPage + 1].push(iBlock);

      }
      if (this.pageContent[iPage].length == 1) {
        // This is (Height Block == Height Content) > Height Page

      } else {
        var iLastBlock_PageContent = this.pageContent[iPage][this.pageContent[iPage].length - 1];
        var elLastBlock_PageContent = document.getElementById('page-' + iPage + '-content-block-' + iLastBlock_PageContent); 
        console.log('page-' + iPage + '-content-block-' + iLastBlock_PageContent);
        console.log(elLastBlock_PageContent);
        if (iLastBlock_PageContent == iBlock) {

        } else {
           
        }
      }

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
                width: ${this.sizePage.width}cm;
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
