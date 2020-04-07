import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ShowComponent } from './show/show.component';
import { SearchComponent } from './search/search.component';
import { PropertyResolver } from './show/property.resolver';

const routes: Routes = [
    {
      path: 'property',
    children: [
      {path: 'create', component: CreateComponent},
      {path: 'show/:country', resolve: {propertyList: PropertyResolver} , component: ShowComponent },
      {path: 'dates', resolve: {propertyList: PropertyResolver} , component: ShowComponent },
      {path: 'search', component: SearchComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PropertyResolver]
})
export class PropertyRoutingModule { }
