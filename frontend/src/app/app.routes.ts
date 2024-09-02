import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login/login.component';
import { ViewComponent } from './pages/map/view/view.component';
import { CreateComponent } from './pages/map/create/create.component';

export const routes: Routes = [
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "map/view",
        component: ViewComponent
    },
    {
        path: "map",
        component: CreateComponent
    },
];
