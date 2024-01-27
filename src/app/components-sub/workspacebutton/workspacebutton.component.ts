import { Component } from '@angular/core';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

enum MenuStatus {
  Close = 'Menü-Schließen',
  Open = 'Menü-Öffnen',
  AlreadyOpen = 'Menü-Bereits geöffnet',
}

@Component({
  selector: 'app-workspacebutton',
  templateUrl: './workspacebutton.component.html',
  styleUrls: ['./workspacebutton.component.scss']
})
export class WorkspacebuttonComponent {
  value: string = MenuStatus.Close;

  constructor(public respService: ResponsiveService, public ws: WorkspaceService) {
    this.currentStatus();
  }

  currentStatus() {
    setInterval(() => {
      if (this.respService.sideLeftVisible && this.respService.routerIsVisible && this.respService.sideRightVisible) {
        this.value = MenuStatus.Close;
      } else if (!this.respService.sideLeftVisible && !this.respService.routerIsVisible && this.respService.sideRightVisible) {
        this.value = MenuStatus.Open;
      } else if (this.respService.sideLeftVisible && this.respService.routerIsVisible && !this.respService.sideRightVisible) {
        this.value = MenuStatus.Close;
      } else if (!this.respService.sideLeftVisible && this.respService.routerIsVisible && !this.respService.sideRightVisible) {
        this.value = MenuStatus.Open;
      } else if (this.respService.sideLeftVisible && !this.respService.routerIsVisible && !this.respService.sideRightVisible) {
        this.value = MenuStatus.AlreadyOpen;
      }
    });
  }
}

