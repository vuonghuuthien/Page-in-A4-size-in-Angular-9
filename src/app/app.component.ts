import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
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
      title: "Name_1",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_1",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_1",
      value: "0123 456 789"
    }, {
      title: "Job_1",
      value: "Teacher"
    }, {
      title: "Name_2",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_2",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_2",
      value: "0123 456 789"
    }, {
      title: "Job_2",
      value: "Teacher"
    }, {
      title: "Name_3",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_3",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_3",
      value: "0123 456 789"
    }, {
      title: "Job_3",
      value: "Teacher"
    }, {
      title: "Name_4",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_4",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_4",
      value: "0123 456 789"
    }, {
      title: "Job_4",
      value: "Teacher"
    }, {
      title: "Name_5",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_5",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_5",
      value: "0123 456 789"
    }, {
      title: "Job_5",
      value: "Teacher"
    }, {
      title: "Name_6",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_6",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_6",
      value: "0123 456 789"
    }, {
      title: "Job_6",
      value: "Teacher"
    }, {
      title: "Name_7",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_7",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_7",
      value: "0123 456 789"
    }, {
      title: "Job_7",
      value: "Teacher"
    }, {
      title: "Name_8",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_8",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_8",
      value: "0123 456 789"
    }, {
      title: "Job_8",
      value: "Teacher"
    }, {
      title: "Name_9",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_9",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_9",
      value: "0123 456 789"
    }, {
      title: "Job_9",
      value: "Teacher"
    }, {
      title: "Name_10",
      value: "Thomas K.Wilson"
    }, {
      title: "Email_10",
      value: "thomas.k.wilson@gmail.com"
    }, {
      title: "Telephone_10",
      value: "0123 456 789"
    }, {
      title: "Job_10",
      value: "Teacher"
    }
  ]

  heightPageWithoutPadding = this.convertCmtoPx(this.sizePage.height - (this.paddingPage.top + this.paddingPage.bottom));
  elContainer;
  anchorsBlockValue;
  pageContent = [[]]; // Ex: [[0, 1, 2, 3], [4, 5]]

  constructor (private elementRef: ElementRef){

  }
  
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.elContainer = document.getElementById('container');
    this.elContainer.innerHTML += this.createHTMLPage(0);
    this.insertListData();
    this.anchorsBlockValue = this.elementRef.nativeElement.querySelectorAll('.block .value');
    this.anchorsBlockValue.forEach((anchor: HTMLAnchorElement) => {
      anchor.addEventListener('input', this.handleAnchorBlockValue)
    });
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
      iBlock += 1;
    }
    // nodes += `<button type="button" class="buttonAdd" (click)="addBlock()">Add Block</button>`;
  }

  handleAnchorBlockValue = (event: Event) => {
    // Prevent opening anchors the default way
    event.preventDefault();
    const anchor = event.target as HTMLAnchorElement;
    const id_anchorParentEl = anchor.parentElement.getAttribute('id'); // page-iPage-content-block-iBlock
    var iPage = Number(id_anchorParentEl.slice(id_anchorParentEl.indexOf("page-") + ("page-").length, id_anchorParentEl.indexOf("-content")));
    var iBlock = Number(id_anchorParentEl.slice(id_anchorParentEl.indexOf("block-") + ("block-").length, id_anchorParentEl.length));
    var elPageContent = anchor.parentElement.parentElement;
    if (elPageContent.offsetHeight > this.heightPageWithoutPadding) {
      if (!this.pageContent[iPage + 1]) {
        this.elContainer.innerHTML += this.createHTMLPage(iPage + 1);
        this.pageContent[iPage + 1] = [];
      }
      if (this.pageContent[iPage].length == 1) {
        // This is (Height Block == Height Content) > Height Page
        alert("To be continue ...");
      } else {
        while (iPage < this.pageContent.length) {

          var elPageContent = document.getElementById('page-' + iPage + '-content'); 
          var iLastBlock_PageContent = this.pageContent[iPage][this.pageContent[iPage].length - 1];
          var elLastBlock_PageContent = document.getElementById('page-' + iPage + '-content-block-' + iLastBlock_PageContent); 
          elLastBlock_PageContent.remove();
          this.pageContent[iPage].pop();
    
          if (!this.pageContent[iPage + 1]) {
            this.elContainer.innerHTML += this.createHTMLPage(iPage + 1);
            this.pageContent[iPage + 1] = [];
          }

          elLastBlock_PageContent.setAttribute('id', 'page-' + (iPage + 1) + '-content-block-' + iLastBlock_PageContent); 
          var elNextPageContent = document.getElementById('page-' + (iPage + 1) + '-content'); 
          elNextPageContent.innerHTML = elLastBlock_PageContent.outerHTML + elNextPageContent.innerHTML;
          this.pageContent[iPage + 1].unshift(iLastBlock_PageContent);
    
          if (elPageContent.offsetHeight <= this.heightPageWithoutPadding) {
            if (elNextPageContent.offsetHeight <= this.heightPageWithoutPadding) {
              break;
            } else {
              iPage += 1;
            }
          }
        }
      }
      this.anchorsBlockValue = this.elementRef.nativeElement.querySelectorAll('.block .value');
      this.anchorsBlockValue.forEach((anchor: HTMLAnchorElement) => {
        anchor.addEventListener('input', this.handleAnchorBlockValue)
      });
    }
  }

  addBlock() {
    alert("To be continue ...");
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

  ngOnDestroy() {
    // Cleanup by removing the event listeners on destroy
    this.anchorsBlockValue.forEach((anchor: HTMLAnchorElement) => {
      anchor.removeEventListener('input', this.handleAnchorBlockValue)
    })
  }
}
