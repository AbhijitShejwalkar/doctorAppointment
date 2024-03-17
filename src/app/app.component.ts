import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { RouterModule, Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'doctorAppointment';

  isLoading: boolean = false;
  showButton:boolean = false;
  showSlotBookingButton:boolean = false;
  constructor(private loaderService: LoaderService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe((state: boolean) => {
      this.isLoading = state;
    });


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      this.showButton =  url.includes('slot-booking') ;
      this.showSlotBookingButton = url.includes('appointment_history') ;
    });

  }

  history() {
    this.router.navigate(['/appointment_history']);
  }

  bookAppointment() {
    this.router.navigate(['/slot-booking']);
  }
  
}

