import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [],
})
export class BreadcrumsComponent implements OnInit {
  public titulo!: string;

  public tituloSub$!: Subscription;

  constructor(private router: Router) {
    this.tituloSub$ = this.getArgumentoRuta().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = `Admin -${titulo}`;
    });
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }
  getArgumentoRuta() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),
    );
  }

  ngOnInit(): void {}
}
