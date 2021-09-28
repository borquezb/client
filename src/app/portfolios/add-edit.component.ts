import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {PortfolioService, AlertService, AccountService} from '@app/_services';
import {BehaviorSubject} from 'rxjs';
import {User} from '../_models';

@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  private userSubject: BehaviorSubject<User>;
  users = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService,
    private alertService: AlertService,
    private accountService: AccountService
  ) {
  }

  ngOnInit() {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      balance: ['', Validators.required],
      user: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.portfolioService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createPortfolio();
    } else {
      this.updatePortfolio();
    }
  }

  private createPortfolio() {
    this.portfolioService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Portfolio added successfully', {keepAfterRouteChange: true});
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updatePortfolio() {
    this.portfolioService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', {keepAfterRouteChange: true});
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
