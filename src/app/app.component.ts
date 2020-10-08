import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  // unit cm
  sizePage = {
    width: 21,
    height: 29.7
  }
  paddingPage = {
    top: 2, 
    right: 2, 
    bottom: 2, 
    left: 2
  }
  pages = [
    {
      content: "",
      full: false
    },
  ]
  currentPage = 0;

  heightA4WithoutPadding =  this.sizePage.height - (this.paddingPage.top + this.paddingPage.bottom);
  
  clickA4(i) {
    this.currentPage = i;
    document.getElementById('content-' + i).focus();
  }

  inputContent(inputContent, i) {
    var heightContent = document.getElementById('content-' + i).offsetHeight * 2.54 / 96; // Convert pixels to cm

    if (heightContent > this.heightA4WithoutPadding) {
      this.pages[i].full = true;
      if (!this.pages[i + 1]) {
        this.pages.push({
          content: "",
          full: false
        })
        this.currentPage = i + 1;
        this.inputContent(inputContent, i + 1);
      }
    } else {
      this.pages[i].content += inputContent;
    }
  }

  ngAfterViewInit() {
    document.getElementById('content-' + this.currentPage).focus();
  }
}
