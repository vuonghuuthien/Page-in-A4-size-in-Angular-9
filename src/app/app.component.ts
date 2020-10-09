import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {

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
      htmlContent: null,
      full: false
    },
  ]
  currentPage = 0;
  currentChar = null;

  runAfterViewChecked = false;
  
  clickA4(i) {
    this.currentPage = i;
  }

  inputContent(char, i) {
    var element = document.getElementById('content-' + i)
    var heightContent = element.offsetHeight * 2.54 / 96; // Convert pixels to cm
    this.pages[i].htmlContent = element.innerHTML;
    console.log(this.pages);
    if (Number(heightContent.toFixed(1)) > this.sizePage.height) { 
      this.currentChar = char;
      this.pages[i].full = true;
      if (!this.pages[i + 1]) {
        this.pages.push({
          htmlContent: null,
          full: false
        })
      }
      this.currentPage = i + 1;
      this.runAfterViewChecked = true;
    }
  }

  ngAfterViewChecked() {
    document.getElementById('content-' + this.currentPage).focus();
    if (this.runAfterViewChecked) {
      if (this.currentChar) {
        var str = this.pages[this.currentPage-1].htmlContent;
        var index = str.lastIndexOf("</div>");
        if (index != -1)
          str = str.slice(0, index-1) + str.slice(index);
        else 
          str = str.slice(0, str.length - 1);
        this.pages[this.currentPage-1].htmlContent = str;

        this.pages[this.currentPage].htmlContent = this.currentChar + this.pages[this.currentPage].htmlContent;
      }

      var element = null;
      for (let i = 0; i < this.pages.length; i++) {
        element = document.getElementById('content-' + i);
        element.innerHTML = this.pages[i].htmlContent;
      }
      this.runAfterViewChecked = false;
    }
  }
}
