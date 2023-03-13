import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { get } from 'lodash';

export function minLengthValidationMessages(
  error: any,
  field: FormlyFieldConfig
) {
  return `Should have atleast ${field.props.minLength} characters`;
}

export function fieldMatchValidator(
  control: AbstractControl,
  field: FormlyFieldConfig,
  options: any
) {
  const password = get(control.value, options.password);
  const passwordConfirm = get(control.value, options.confirm);

  // avoid displaying the message error when values are empty
  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }
  const response = {};
  response['fieldMatch-' + options.errorPath] = { message: 'Password Not Matching' };
  return response;
  //return { fieldMatch: { message: 'Password Not Matching' } };
}

import { AppComponent } from './app.component';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validators: [{ name: 'fieldMatch', validation: fieldMatchValidator }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minLength', message: minLengthValidationMessages },
      ],
    }),
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
})
export class AppModule {}

/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */
