import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  add(errorMessage: {severity: string, summary: string, detail: string}) {
    console.log(errorMessage.summary);
  }
}
