import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stimulsoft } from 'stimulsoft-dashboards-js/Scripts/stimulsoft.designer';

@Component({
  template: ''
})
export abstract class StimulsoftDesignerComponent implements OnInit, OnDestroy {
  @Input() designerId: string = '';
  @Input() reportUrl: string = '';
  
  protected designer!: Stimulsoft.Designer.StiDesigner;
  protected report: Stimulsoft.Report.StiReport;
  protected options: Stimulsoft.Designer.StiDesignerOptions;

  constructor(protected http: HttpClient) {
    this.options = new Stimulsoft.Designer.StiDesignerOptions();
    this.report = new Stimulsoft.Report.StiReport();
  }

  ngOnInit(): void {
    this.initializeDesigner();
    this.loadReport();
  }

  ngOnDestroy(): void {
    if (this.designer) {
      this.designer.dispose();
    }
  }

  protected initializeDesigner(): void {
    this.options.appearance.fullScreenMode = false;
    this.options.toolbar.showAboutButton = false;
    this.designer = new Stimulsoft.Designer.StiDesigner(this.options, this.designerId, false);
    // Stimulsoft.Base.StiLicense.key = this.stimulsoftDashboardKey
  }

  protected async loadReport(): Promise<void> {
    try {
      const template = await this.http.get(this.reportUrl, { responseType: 'text' }).toPromise();
      this.report.loadDocument(template);
      this.designer.report = this.report;
      // Asegurar que el contenedor existe en el DOM antes de renderizar
      setTimeout(() => {
        this.designer.renderHtml(`${this.designerId}-designer`);
      }, 100);
    } catch (error) {
      console.error('Error al cargar el reporte:', error);
    }
  }
}