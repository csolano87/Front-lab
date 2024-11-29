import { Directive, Input } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';

@Directive({
  selector: `[formGroup] [appDisabledIf],
  [formGroupName]  [appDisabledIf],
  [formArrayName] [appDisabledIf]`,
  standalone: true,
})
export class DisabledIfDirective {
  @Input('appDisabledIf') set disabledIf(condition: boolean) {
   /*  const container = this.controlContainer.control;

    condition ? container?.disable() : container?.enable(); */
    if (typeof condition !== 'boolean') {
      throw new Error('Condition must be a boolean value');
    }

    const container = this.controlContainer.control;
    if (!container) {
      throw new Error('Control container is not defined');
    }

    if (condition) {
      container.disable();
    } else {
      container.enable();
    }
  }
  
  constructor(private controlContainer: ControlContainer) {}
}
