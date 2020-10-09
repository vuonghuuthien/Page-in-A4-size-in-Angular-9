import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';

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
      full: false
    },
  ]
  currentPage = 0;

  heightA4WithoutPadding = this.sizePage.height - (this.paddingPage.top + this.paddingPage.bottom);
  
  clickA4(i) {
    this.currentPage = i;
  }

  inputContent(char, i) {
    var heightContent = document.getElementById('content-' + i).offsetHeight * 2.54 / 96; // Convert pixels to cm

    if (heightContent > this.heightA4WithoutPadding) {
      this.pages[i].full = true;
      if (!this.pages[i + 1]) {
        this.pages.push({
          full: false
        })
      }
      this.currentPage = i + 1;
    }
  }

  ngAfterViewChecked() {
    document.getElementById('content-' + this.currentPage).focus();
  }
}
