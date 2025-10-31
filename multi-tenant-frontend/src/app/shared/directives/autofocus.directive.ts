import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // focus after view init to ensure element present
    setTimeout(() => this.elementRef.nativeElement.focus(), 50);
  }
}
