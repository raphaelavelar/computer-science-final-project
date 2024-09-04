import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login/login.component';
import { ViewComponent } from './pages/map/view/view.component';
import { CreateComponent as MapCreateComponent } from './pages/map/create/create.component';
import { CreateComponent as PostCreateComponent } from './pages/posts/create/create.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [authGuard]
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [authGuard]
    },
    {
        path: "map/view",
        component: ViewComponent,
    },
    {
        path: "map",
        component: MapCreateComponent,
        canActivate: [authGuard]
    },
    {
        path: "post",
        component: PostCreateComponent,
        canActivate: [authGuard]
    },
];
