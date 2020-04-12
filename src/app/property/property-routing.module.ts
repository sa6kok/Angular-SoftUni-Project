import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ShowComponent } from './show/show.component';
import { SearchComponent } from './search/search.component';
import { PropertyResolver } from './property.resolver';
import { AuthGuard } from '../guards/auth.guard';
import { DetailsPropertyComponent } from '../shared/details-property/details-property.component';

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
      { path: 'search', component: SearchComponent },
      {
        path: 'details/:id',
        component: DetailsPropertyComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_HOST'] }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PropertyResolver]
})
export class PropertyRoutingModule { }
