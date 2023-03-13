import { Component } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import {
  FormlyFormOptions,
  FormlyFieldConfig,
  FormlyField,
} from '@ngx-formly/core';
import { get } from 'lodash';

export function MatchValidator(
  value1: string,
  value2: string,
  responseFieldName: string,
  options: any
): ValidationErrors {
  console.log('V1: ', value1, 'V2: ', value2, 'RF: ', responseFieldName);
  if (!value2 || !value1) {
    return null;
  }

  if (value2 === value1) {
    return null;
  }

  const response = { message: 'Not Match' };
  // response [responseFieldName] = {message: 'NOT MATCH'};
  return response;
}

export function Match1(control: AbstractControl): ValidationErrors {  
  const options = {
    errorPath: 'passwordConfirm'
  };
  return MatchValidator(
    get(control.value, 'password'),
    get(control.value, 'passwordConfirm'),
    'passwordConfirm',
    options
  );
}

export function Match2(control: AbstractControl): ValidationErrors {
    const options = {errorPath: 'secondPasswordConfirm'}
  console.log('CONTROL: ', control, 'OPTIONS: ', options);
  return MatchValidator(
    get(control.value, 'secondPassword'),
    get(control.value, 'secondPasswordConfirm'),
    'secondPasswordConfirm',
    options
  );
}

export function MatchSomething(control: AbstractControl) {
  console.log('CTRL: ', control);
  const value1 = control.value;
  const value2 = get(control.parent.value, 'password');

  if (!value2 || !value1) {
    return true;
  }

  if (value2 === value1) {
    return true;
  }

  return false;
}

@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [Match2],
      },
      fieldGroup: [
        {
          key: 'password',
          type: 'input',
          props: {
            type: 'password',
            label: 'Password',
            placeholder: 'Must be at least 3 characters',
            required: true,
            minLength: 3,
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          props: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Please re-enter your password',
            required: true,
          },
          validators: {
            match: {
              expression: (c: AbstractControl) => {
                return MatchSomething(c);
              },
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl.value}" not match`,
            },
          },
        },
        {
          key: 'secondPassword',
          type: 'input',
          props: {
            type: 'password',
            label: 'Second Password',
            placeholder: 'Must be at least 3 characters',
            required: true,
            minLength: 3,
          },
        },
        {
          key: 'secondPasswordConfirm',
          type: 'input',
          props: {
            type: 'password',
            label: 'Second Confirm Password',
            placeholder: 'Please re-enter your password',
            required: true,
          },
        },
      ],
    },
  ];

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}

/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */
