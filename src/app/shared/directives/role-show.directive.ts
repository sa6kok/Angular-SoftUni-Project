import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appRoleShow]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RoleShowDirective, multi: true }]
})
export class RoleShowDirective {

  allowedRoles: string[];
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: TokenStorageService) {
  }

  @Input()
  set appRoleShow(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
    if (!this.allowedRoles || this.allowedRoles.length === 0 ||
      !this.authService.getUser()) {
      this.viewContainer.clear();
      return;
    }

    const allowed: boolean = this.authService.getUser().roles.filter(
      role => this.allowedRoles.includes(role)).length > 0;
    if (allowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
