import { Component, OnInit, Input, ElementRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'np-alert',
  templateUrl: './np-alert.component.html',
  styleUrls: ['./np-alert.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class NpAlertComponent implements OnInit {

  @Input() type: string;
  @Input() styleClass: string;
  @Input() showCloseButton: boolean;
  @Input() autoClose: boolean;
  @Input() autoCloseTimeout: number;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.autoClose) {
      setTimeout(() => {
        this.close();
      }, this.autoCloseTimeout ? this.autoCloseTimeout : 10000);
    }
  }

  close() {
    this.el.nativeElement.remove();
  }
}