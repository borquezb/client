import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {User} from '@app/_models';
import {Portfolio} from '@app/_models';

@Injectable({providedIn: 'root'})
export class PortfolioService {
  private portfolioSubject: BehaviorSubject<Portfolio>;
  public portfolio: Observable<Portfolio>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.portfolioSubject = new BehaviorSubject<Portfolio>(JSON.parse(localStorage.getItem('portfolio')));
    this.portfolio = this.portfolioSubject.asObservable();
  }

  public get portfolioValue(): Portfolio {
    return this.portfolioSubject.value;
  }

  getAll() {
    return this.http.get<Portfolio[]>(`${environment.apiUrl}/portfolios`);
  }

  getById(id: string) {
    return this.http.get<Portfolio>(`${environment.apiUrl}/portfolios/${id}`);
  }

  create(portfolio: Portfolio) {
    return this.http.post(`${environment.apiUrl}/portfolios/create`, portfolio);
  }

  update(id, params) {
    return this.http.put(`${environment.apiUrl}/portfolios/${id}`, params)
      .pipe(map(x => {
        // update stored portfolio if the logged in portfolio updated their own record
        if (id == this.portfolioValue.id) {
          // update local storage
          const portfolio = {...this.portfolioValue, ...params};
          localStorage.setItem('portfolio', JSON.stringify(portfolio));

          // publish updated portfolio to subscribers
          this.portfolioSubject.next(portfolio);
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/portfolios/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }
}
