import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserInputComponent } from './user-input/user-input.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';

export const routes: Routes = [
    { path:'', component: LoginComponent},
    { path: 'user-input', component: UserInputComponent},
    { path: 'slot-booking', component: SlotBookingComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'doctor', component: DoctorComponent},
    { path: 'appointment_history', component: AppointmentHistoryComponent},
    { path:'**', component: NotfoundComponent}
];
