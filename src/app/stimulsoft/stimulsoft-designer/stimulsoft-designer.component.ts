import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stimulsoft } from 'stimulsoft-dashboards-js/Scripts/stimulsoft.designer';

const STIMULSOFT_KEY = "";

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
    Stimulsoft.Base.StiLicense.key = STIMULSOFT_KEY;
  }

  protected async loadReport(): Promise<void> {
    try {
      const template = await this.http.get(this.reportUrl, { responseType: 'text' }).toPromise();
      this.report.load(template);
      this.designer.report = this.report;

      this.designer.renderHtml(`${this.designerId}-designer`);
    } catch (error) {
      console.error('Error al cargar el reporte:', error);
    }
  }
}