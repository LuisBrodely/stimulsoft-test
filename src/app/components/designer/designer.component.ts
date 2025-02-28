import { Component } from '@angular/core';
import { StimulsoftDesignerComponent } from '../../stimulsoft/stimulsoft-designer/stimulsoft-designer.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-designer',
  standalone: true,
  template: `<div [id]="designerId + '-designer'"></div>`
})
export class DesignerComponent extends StimulsoftDesignerComponent {
  constructor(
    http: HttpClient,
  ) {
    super(http);
    this.designerId = `monto-cobrado-iva-desig`;
    this.reportUrl = 'assets/distribuidores.mrt';
  }
}