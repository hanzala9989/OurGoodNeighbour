import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUmbcEmail]'
})
export class UmbcEmailDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    const inputValue: string = this.el.nativeElement.value;
    if (!inputValue.toLowerCase().endsWith('@umbc.edu')) {
      event.preventDefault();
      // You can display an error message or take any other action here
      alert('Email must end with @umbc.edu ');
    }
  }
}
