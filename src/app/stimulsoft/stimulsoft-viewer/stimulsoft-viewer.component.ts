import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stimulsoft } from 'stimulsoft-dashboards-js/Scripts/stimulsoft.viewer';

const STIMULSOFT_KEY = "";

@Component({
  template: ''
})
export abstract class StimulsoftViewerComponent implements OnInit, OnDestroy {
  @Input() viewerId: string = '';
  @Input() reportUrl: string = '';
  
  protected viewer!: Stimulsoft.Viewer.StiViewer;
  protected report: Stimulsoft.Report.StiReport;
  protected options: Stimulsoft.Viewer.StiViewerOptions;

  constructor(protected http: HttpClient) {
    this.options = new Stimulsoft.Viewer.StiViewerOptions();
    this.report = new Stimulsoft.Report.StiReport();
  }

  ngOnInit(): void {
    this.initializeViewer();
    this.loadReport();
  }

  ngOnDestroy(): void {
    if (this.viewer) {
      this.viewer.dispose();
    }
  }

  protected initializeViewer(): void {
    this.options.appearance.scrollbarsMode = true;
    this.options.appearance.fullScreenMode = false;
    this.options.appearance.allowMobileMode = false;
    this.options.toolbar.showAboutButton = false;
    this.options.toolbar.showOpenButton = false;
    this.viewer = new Stimulsoft.Viewer.StiViewer(this.options, this.viewerId, false);
    Stimulsoft.Base.StiLicense.key = STIMULSOFT_KEY;
  }

  protected async loadReport(): Promise<void> {
    try {
        const template = await this.http.get(this.reportUrl, { responseType: 'text' }).toPromise();
        this.report.load(template);          
        this.viewer.report = this.report;
        
        const container = document.getElementById(`${this.viewerId}-viewer`);
        if (container) {
            this.viewer.renderHtml(container);
        }
    } catch (error) {
        console.error('Error al cargar el reporte:', error);
    }
}
}