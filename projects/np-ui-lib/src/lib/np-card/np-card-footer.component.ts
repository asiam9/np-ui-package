import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'np-card-footer',
    template: '<div class="np-cd-footer"><ng-content></ng-content></div>',
    styleUrls: ['./np-card.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class NpCardFooterComponent {

}
