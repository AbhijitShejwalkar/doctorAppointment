import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserInputComponent } from './user-input/user-input.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';

export const routes: Routes = [
    { path:'', component: LoginComponent},
    { path: 'user-input', component: UserInputComponent},
    { path: 'slot-booking', component: SlotBookingComponent},
    { path:'**', component: NotfoundComponent}
];
