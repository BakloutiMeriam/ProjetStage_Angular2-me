import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginForm: FormGroup;
  submitted = false;
  predefinedEmail = 'meriembaklouti02@gmail.com';
  predefinedPassword = 'baklouti123';
  emailIncorrect = false;
  passwordIncorrect = false;
  /*loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('meriembaklouti02@gmail.com', [Validators.required]),
    password: new FormControl('baklouti123', [Validators.required]),
    rememberMe: new FormControl(true)
  });*/


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Raccourcis pour accéder facilement aux contrôles de formulaire
  get lf() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Arrêtez ici si le formulaire n'est pas valide
    if (this.loginForm.invalid) {
      return;
    }

    // Vérifiez si les valeurs saisies correspondent aux valeurs prédéfinies
    // Vérifiez si l'email correspond à la valeur prédéfinie
  if (this.lf.email.value !== this.predefinedEmail) {
    // Affichez un message d'erreur pour l'email incorrect
    this.emailIncorrect = true;
    return; // Arrêtez ici pour éviter de vérifier le mot de passe si l'email est incorrect
  } else {
    this.emailIncorrect = false; // Réinitialiser l'état de l'erreur d'email
  }

  // Vérifiez si le mot de passe correspond à la valeur prédéfinie
  if (this.lf.password.value !== this.predefinedPassword) {
    // Affichez un message d'erreur pour le mot de passe incorrect
    this.passwordIncorrect = true;
    return; // Arrêtez ici si le mot de passe est incorrect
  } else {
    this.passwordIncorrect = false; // Réinitialiser l'état de l'erreur de mot de passe
  }
    {
      // Redirigez l'utilisateur vers la page souhaitée
      this.router.navigate(['/datatables']);
    } 
  }
  /*get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .then((res) => {
        this.spinner.hide();
        this.router.navigate(['/dashboard/dashboard1']);
      })
      .catch((err) => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: ' + err)
      }
      );
  }*/

}
