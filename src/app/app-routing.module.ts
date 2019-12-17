import {NgModule} from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

const appRoutes:Routes = [
    {path :  '', component : HomeComponent},
    {path : 'about', component : AboutComponent}
]

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule {}