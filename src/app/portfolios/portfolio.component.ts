import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService, PortfolioService} from '@app/_services';
import {ActivatedRoute, Router} from "@angular/router";

@Component({templateUrl: 'portfolio.component.html'})
export class PortfolioComponent implements OnInit {
  portfolio = null;
  users = null;
  id = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private portfolioService: PortfolioService,
              private accountService: AccountService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.portfolioService.getById(this.id)
      .pipe(first())
      .subscribe(x => this.portfolio = x);
  }
}
