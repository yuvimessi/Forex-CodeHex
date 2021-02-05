import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cross-currency',
  templateUrl: './cross-currency.component.html',
  styleUrls: ['./cross-currency.component.css']
})
export class CrossCurrencyComponent implements OnInit {

  constructor() { }

  ngOnInit() {


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


    var currency = document.getElementById('currency');
    var fragment = document.createDocumentFragment();
    currList.forEach(function (currList, index) {
      var opt = document.createElement('option');
      opt.innerHTML = currList;
      opt.value = currList;
      fragment.appendChild(opt);
    });
    currency.appendChild(fragment);


  }



  getCross() {

    var currency = (<HTMLSelectElement>document.getElementById('currency')).value;
    var access_key = 'ysXX5vLfObP0zlI0oB66nlEX8s1LBb5StLw5VRllsPlQHf';

    var symbol = [];
    var price = [];
    var change = [];
    var chg_per = [];
    var last_changed = [];

    fetch("https://fcsapi.com/api-v2/forex/cross?symbol=" + currency + "&access_key=" + access_key)
      .then(response => response.json())
      .then(data => {

        //console.log(data)

        for (i = 0; i < data.response.length; i++) {

          symbol[i] = data.response[i].symbol;
          price[i] = data.response[i].price;
          change[i] = data.response[i].change;
          chg_per[i] = data.response[i].chg_per;
          last_changed[i] = data.response[i].last_changed;

        }

        //to check json results on console
        /*console.log(symbol)
        console.log(price)
        console.log(change)
        console.log(chg_per)
        console.log(last_changed)*/


        var display = document.getElementById("results");
        var output = '';

        for (var i = 0; i < data.response.length; i++) {
          output +=

            '<tr>' +
            '<td>' + symbol[i] + '</td>' +
            '<td>' + price[i] + '</td>' +
            '<td>' + change[i] + '</td>' +
            '<td>' + chg_per[i] + '</td>' +
            '<td>' + last_changed[i] + '</td>' +
            '</tr>'
        }

        display.innerHTML = output;
      })

  }








}
