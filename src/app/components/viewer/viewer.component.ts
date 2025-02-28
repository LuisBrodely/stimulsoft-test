import { Component } from '@angular/core';
import { StimulsoftViewerComponent } from '../../stimulsoft/stimulsoft-viewer/stimulsoft-viewer.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewer',
  standalone: true,
  template: `<div [id]="viewerId + '-viewer'"></div>`,
})
export class ViewerComponent extends StimulsoftViewerComponent {
  constructor(
    http: HttpClient
  ) {
    super(http);
    this.viewerId = `monto-cobrado-iva`;
    this.reportUrl = 'assets/distribuidores.mrt';
  }
}