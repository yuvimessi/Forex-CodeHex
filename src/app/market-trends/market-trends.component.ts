import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-trends',
  templateUrl: './market-trends.component.html',
  styleUrls: ['./market-trends.component.css']
})
export class MarketTrendsComponent implements OnInit {

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


    var pair1 = document.getElementById('pair1');
    var fragment = document.createDocumentFragment();
    currList.forEach(function (currList, index) {
      var opt = document.createElement('option');
      opt.innerHTML = currList;
      opt.value = currList;
      fragment.appendChild(opt);
    });
    pair1.appendChild(fragment);


    var pair2 = document.getElementById('pair2');
    var fragment = document.createDocumentFragment();
    currList.forEach(function (currList, index) {
      var opt = document.createElement('option');
      opt.innerHTML = currList;
      opt.value = currList;
      fragment.appendChild(opt);
    });
    pair2.appendChild(fragment);

  }


  getTrend() {

    var pair1 = (<HTMLSelectElement>document.getElementById('pair1')).value;
    var pair2 = (<HTMLSelectElement>document.getElementById('pair2')).value;
    var access_key = 'ysXX5vLfObP0zlI0oB66nlEX8s1LBb5StLw5VRllsPlQHf';


    fetch("https://fcsapi.com/api-v2/forex/pivot_points?symbol=" +pair1+ "/" +pair2+ "&period=1d&access_key=" +access_key)
      .then(response => response.json())
      .then(data => {

        //to check json output on console
        //console.log(data)
        //console.log(data.response.oa_summary)
        //console.log(data.response.pivot_point.classic.pp)


        document.getElementById("results").innerHTML =
          '<h3 class="text-center">Overall Summary Buy/Sell based on Moving Avg and Technical Indicators: <u>'
          + data.response.oa_summary + '</u></h3><br>'
          + '<h3 class="text-center">Pivot Points: <u>' + data.response.pivot_point.classic.pp + '</u></h3>';

      })

  }



}
