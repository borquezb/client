import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService, PortfolioService} from '@app/_services';

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  portfolios = null;
  users = null;

  constructor(private portfolioService: PortfolioService,
              private accountService: AccountService) {
  }

  ngOnInit() {
    this.portfolioService.getAll()
      .pipe(first())
      .subscribe(portfolios => this.portfolios = portfolios);
  }


  deletePortfolio(id: string) {
      const portfolio = this.portfolios.find(x => x.id === id);
      portfolio.isDeleting = true;
      this.portfolioService.delete(id)
          .pipe(first())
          .subscribe(() => this.portfolios = this.portfolios.filter(x => x.id !== id));
  }
}
