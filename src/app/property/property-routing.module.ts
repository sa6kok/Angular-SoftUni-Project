import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ShowComponent } from './show/show.component';
import { SearchComponent } from './search/search.component';
import { PropertyResolver } from './show/property.resolver';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'property',
    children: [
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_HOST'] }
      },
      {
        path: 'show/:country',
        resolve: { propertyList: PropertyResolver },
        component: ShowComponent,
        /* canActivate: [AuthGuard],
        data: { roles: ['ROLE_GUEST', 'ROLE_HOST'] } */
      },
      {
        path: 'dates',
        resolve: { propertyList: PropertyResolver },
        component: ShowComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_GUEST'] }
      },
      { path: 'search', component: SearchComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PropertyResolver]
})
export class PropertyRoutingModule { }
