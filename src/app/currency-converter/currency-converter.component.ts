import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

declare var google: any;

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {

  google: any;
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



  buttonBuffer() {

    (<HTMLSelectElement>document.getElementById("conv")).disabled = true;
    setTimeout(function () { (<HTMLSelectElement>document.getElementById("conv")).disabled = false; }, 60000);


  }



  getConversion() {

    var pair1 = (<HTMLSelectElement>document.getElementById('pair1')).value;
    var pair2 = (<HTMLSelectElement>document.getElementById('pair2')).value;
    var amount = (<HTMLSelectElement>document.getElementById('amount')).value;
    var access_key = 'ysXX5vLfObP0zlI0oB66nlEX8s1LBb5StLw5VRllsPlQHf';

    fetch("https://fcsapi.com/api-v2/forex/converter?pair1=" + pair1 + "&pair2=" + pair2 + "&amount=" + amount + "&access_key=" + access_key)
      .then(response => response.json())
      .then(data => {

        //to print the json value on console(to check)
        //console.log(data.response.total)

        document.getElementById("result-amount").innerHTML = '<br><h2 class="text-center">Converted Amount: <u>' + data.response.total + '</u></h2>';
      })
  }


  /*public lineChart: GoogleChartInterface={
    chartType: 'LineChart',
  }*/

  getPlot() {

    var pair1 = (<HTMLSelectElement>document.getElementById('pair1')).value;
    var pair2 = (<HTMLSelectElement>document.getElementById('pair2')).value;
    var access_key = 'ysXX5vLfObP0zlI0oB66nlEX8s1LBb5StLw5VRllsPlQHf';


    var date = new Date();
    var day = date.getDay();
    if (day == 0)
      date.setDate(date.getDate() - 10);
    else if (day == 6)
      date.setDate(date.getDate() - 9);
    else
      date.setDate(date.getDate() - 8);

    var fromDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    var date2 = new Date();
    var day = date2.getDay();
    if (day == 0)
      date2.setDate(date2.getDate() - 2);
    else if (day == 6)
      date2.setDate(date2.getDate() - 1);
    else
      date2.setDate(date2.getDate());

    var toDate = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();




    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawLineColors);

    function drawLineColors() {
      var gdata = new google.visualization.DataTable();
      gdata.addColumn('string', 'X');
      gdata.addColumn('number', 'Highs');
      gdata.addColumn('number', 'Lows');


      var highs = [];
      var lows = [];
      var dates = [];


      fetch("https://fcsapi.com/api-v2/forex/history?symbol=" + pair1 + "/" + pair2 + "&period=1d&from=" + fromDate + "T12:00&to=" + toDate + "T12:00&access_key=" + access_key)
        .then(response => response.json())
        .then(data2 => {

          //to print the json value on console(to check)
          // console.log(data2)
          // console.log(fromDate)
          // console.log(toDate)

          for (i = 0; i < data2.response.length; i++) {

            highs[i] = data2.response[i].h;
            lows[i] = data2.response[i].l;

          }

          for (i = 0; i < data2.response.length; i++) {
            var day = date.getDay();
            const monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];
            if (day == 0) {
              date.setDate(date.getDate() + 1);
              dates[i] = date.getDate() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear().toString();
            }

            else if (day == 6) {
              date.setDate(date.getDate() + 2);
              dates[i] = date.getDate() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear().toString();
            }

            else {

              dates[i] = date.getDate() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear().toString();

            }
            date.setDate(date.getDate() + 1);
          }

          for (var i = 0; i < data2.response.length; i++) {
            gdata.addRows([
              [dates[i], parseFloat($.trim(highs[i])), parseFloat($.trim(lows[i]))]
            ]);

          }

          var options = {
            hAxis: {
              title: 'Date'
            },
            vAxis: {
              title: pair1 + '/' + pair2 + '\nHighs & Lows'
            },
            colors: ['#a52714', '#097138']
          };

          var chart = new google.visualization.LineChart(document.getElementById('plot'));
          chart.draw(gdata, options);
        })
    }



  }





}
