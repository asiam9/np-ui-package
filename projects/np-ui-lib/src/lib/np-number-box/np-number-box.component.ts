import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Component({
  selector: 'np-number-box',
  templateUrl: './np-number-box.component.html',
  styleUrls: ['./np-number-box.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpNumberBoxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NpNumberBoxComponent),
      multi: true,
    }
  ]
})
export class NpNumberBoxComponent implements ControlValueAccessor, Validator {
  static controlCount = 1;
  _isDisabled: boolean = false;
  _innerValue: number;

  @Input() placeholder: string = "";
  @Input() styleClass: string;
  @Input() steps: number = 1;
  @Input() min: number;
  @Input() max: number;
  @Input() format: string;
  @Input() showControls: boolean = true;
  @Input() inputId: string = `np-number-box_${NpNumberBoxComponent.controlCount++}`;
  @Input() readonly: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  private timeout: any;
  private onChangeCallback: (_: any) => void = () => { };
  private onTouchedCallback: () => void = () => { };

  get value(): number {
    return this._innerValue != undefined ? this._innerValue : null;
  }

  set value(v: number) {
    if (v !== this._innerValue) {
      this._innerValue = v;
      this.onChangeCallback(v);
      this.onTouchedCallback();
      this.onChange.emit(v);
    }
  }

  writeValue(v: number): void {
    if (v !== this._innerValue) {
      this._innerValue = v;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  _add() {
    if (this._isDisabled || this.readonly) {
      return;
    }
    this.value = this.value + this.steps;
  }

  _minus() {
    if (this._isDisabled || this.readonly) {
      return;
    }
    this.value = this.value - this.steps;
  }

  _onMouseDownAdd() {
    var that = this;
    this._clearTimeout()
    this.timeout = setTimeout(() => {
      that._onMouseDownAdd();
    }, 100);
    that._add();
  }

  _onMouseUpAdd() {
    this._clearTimeout()
  }

  _onMouseDownMinus() {
    var that = this;
    this._clearTimeout()
    this.timeout = setTimeout(function () {
      that._onMouseDownMinus();
    }, 100);
    that._minus();
  }

  _onMouseUpMinus() {
    this._clearTimeout()
  }

  _clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  _onInputChange(event) {
    if (isNaN(parseFloat(event.target.value))) {
      this.value = null;
    } else {
      this.value = event.target.value;
    }
  }

  validate(control: FormControl) {
    if (this.min != undefined && this.value < this.min) {
      return {
        min: {
          valid: false,
        },
      };
    }
    if (this.max != undefined && this.value > this.max) {
      return {
        max: {
          valid: false,
        },
      };
    }
    if (this.format) {
      var regex = this._createValidationRegEx();
      if (this.value && !regex.test(this.value.toString())) {
        return {
          format: {
            valid: false,
          },
        };
      }
    }
  }

  _createValidationRegEx() {
    var format = this.format
      .replace(/[^#\.\,]/g, '')
      .replace(/#/g, '\\d')
      .replace(/\./g, '\\.');
    return new RegExp('^' + format + '$', 'g');
  }
}
