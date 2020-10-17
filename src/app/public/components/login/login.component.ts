import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services';
import { RequiredValidator, EmailValidator } from '@app/infrastructure/validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: [null, [EmailValidator.validate, RequiredValidator.validate]],
      password: [null, [RequiredValidator.validate]]
    });
  }

  public onSubmit() {
    this.loading = true;
    this.authService.login(this.form.value)
      .subscribe(
        res => { this.router.navigate(['']); this.loading = false; },
        err => { this.toastrService.error('Invalid Credentials'); this.loading = false; }
      );
  }

}
