import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  text: string;
  classname: string;   // for styling
  delay: number;      // auto-hide after some ms
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts$ = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this._toasts$.asObservable();

  show(text: string, classname = '', delay = 3000) {
    const newToast: ToastMessage = { text, classname, delay };
    const currentToasts = this._toasts$.getValue();
    this._toasts$.next([...currentToasts, newToast]);
  }

  remove(toast: ToastMessage) {
    const currentToasts = this._toasts$.getValue();
    this._toasts$.next(currentToasts.filter(t => t !== toast));
  }
}
