import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[digitOnly]'
})
export class DigitOnlyDirective implements OnInit {
  @Input() inputOptions: string;
  inputElement: HTMLElement;
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'Clear',
    'Copy',
    'Paste'
  ];
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }
  ngOnInit(): void {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    let isFloatAllow = false;
    if (this.inputOptions !== undefined) {
      const inputOptionsArray = this.inputOptions.split(',');
      if (inputOptionsArray.indexOf('float') !== -1) {
        isFloatAllow = (e.key === '.');
      }
    }
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) || // Allow: Cmd+X (Mac)
      (isFloatAllow === true)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: any) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData('text/plain')
      .replace(/\D/g, ''); // get a digit-only string
    document.execCommand('insertText', false, pastedInput);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const textData = event.dataTransfer.getData('text').replace(/\D/g, '');
    this.inputElement.focus();
    document.execCommand('insertText', false, textData);
  }
}
