import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { DataServiceService } from '../data-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {
  ;

  message: string;


  constructor(public db: AngularFireDatabase, private data: DataServiceService, private modalService: NgbModal) { }

  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.message = message);
    //console.log(this.message);

    var currList = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'ARS', 'AUD', 'AZN', 'BAM',
      'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BYN', 'BZD',
      'CAD', 'CHF', 'CHF RTS', 'CLP', 'CNH', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF',
      'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'EUR', 'FJD', 'GBP', 'GEL', 'GHS', 'GMD', 'GNF', 'GTQ',
      'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD',
      'JPY', 'JPY RTS', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR',
      'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR',
      'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN',
      'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SCR', 'SDG', 'SDR', 'SEK', 'SGD', 'SOS', 'STD',
      'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TND', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU',
      'UZS', 'VEF', 'VND', 'VUV', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMK', 'XAU'];


    var pair1 = document.getElementById('pair1');
    var fragment = document.createDocumentFragment();
    currList.forEach(function (currList) {
      var opt = document.createElement('option');
      opt.innerHTML = currList;
      opt.value = currList;
      fragment.appendChild(opt);
    });
    pair1.appendChild(fragment);


    var pair2 = document.getElementById('pair2');
    var fragment = document.createDocumentFragment();
    currList.forEach(function (currList) {
      var opt = document.createElement('option');
      opt.innerHTML = currList;
      opt.value = currList;
      fragment.appendChild(opt);
    });
    pair2.appendChild(fragment);

  }

  //on form submit the data is stored in firebase realtime db
  onSubmit(content) {

    var pair1 = (<HTMLSelectElement>document.getElementById('pair1')).value;
    var pair2 = (<HTMLSelectElement>document.getElementById('pair2')).value;
    var email = (<HTMLSelectElement>document.getElementById('email')).value.toString();


    this.db.database.ref(`user_pref/${email.replace(".", ",")}`).set({
      pair1: pair1,
      pair2: pair2
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-reginfo' })
  }


  //to dismiss all modals at once
  dismissAll() {
    this.modalService.dismissAll();
  }


}
