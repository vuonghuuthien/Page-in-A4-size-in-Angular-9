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
      node = `<div class="block" [id]="page-${iPage}-content-block-${iBlock}"
        (input)="inputBlock(${iPage}, ${iBlock})">
        <div class="title">${this.data[i].title}</div>
        <div class="value" contenteditable>${this.data[i].value}</div>
      </div>`
      elPageContent.innerHTML = nodes + node;
      if (elPageContent.offsetHeight > this.heightPageWithoutPadding) {
        
      } else {
        nodes += node;
        elPageContent.innerHTML = nodes;
      }
      console.log(elPageContent.offsetHeight);
    }
    // nodes += `<button type="button" class="buttonAdd" (click)="addBlock()">Add Block</button>`;
    

  }

  clickA4(iPage) {
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
}
