import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataServiceService } from '../data-service.service';
import * as $ from "jquery";
import { Router} from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  message: string;



  constructor(public db: AngularFireDatabase, private data: DataServiceService, private router: Router) { }

  ngOnInit() {

    var access_key = 'ysXX5vLfObP0zlI0oB66nlEX8s1LBb5StLw5VRllsPlQHf';

    this.data.currentMessage.subscribe(message => this.message = message);

    this.db.database.ref(`user_pref/${this.message.replace(".", ",")}`).once('value').then(function (snapshot) {

      var pair1 = snapshot.val().pair1;
      var pair2 = snapshot.val().pair2;

      // console.log(pair1);
      // console.log(pair2);



      if (typeof pair1 !== "undefined" && typeof pair2 !== "undefined") {
        //1. LATEST PRICE OF THE PREFERRED PAIR

        var symbol = [];
        var price = [];
        var change = [];
        var chg_per = [];
        var last_changed = [];

        fetch("https://fcsapi.com/api-v2/forex/latest?symbol=" + pair1 + "/" + pair2 + "&access_key=" + access_key)
          .then(response => response.json())
          .then(data => {

            //console.log(data)

            for (var i = 0; i < data.response.length; i++) {

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


            var display = document.getElementById("latest-results");
            var output = '';

            for (var i = 0; i < data.response.length; i++) {
              output +=
                '<div class="col-md-12">' +
                '<p><u>' + symbol[i] + '</u></p >' +
                '<ul>' +
                '<li>Price: ' + price[i] + '</li>' +
                '<li>Change: ' + change[i] + '</li>' +
                '<li>Change Percentage: ' + chg_per[i] + '</li>' +
                '<li>Last Changed Date: ' + last_changed[i] + '</li>' +
                '</ul>' +
                '</div >'
            }

            display.innerHTML = output;


          })









        //2. MARKET TREND OF PREFERRED PAIR

        fetch("https://fcsapi.com/api-v2/forex/pivot_points?symbol=" + pair1 + "/" + pair2 + "&period=1d&access_key=" + access_key)
          .then(response => response.json())
          .then(data => {

            //to check json output on console
            //console.log(data)
            //console.log(data.response.oa_summary)
            //console.log(data.response.pivot_point.classic.pp)

            document.getElementById("trend-results").innerHTML =
              '<h3 class="text-center">Overall Summary Buy/Sell based on Moving Avg and Technical Indicators: <u>'
              + data.response.oa_summary + '</u></h3><br>'
              + '<h3 class="text-center">Pivot Points: <u>' + data.response.pivot_point.classic.pp + '</u></h3>';

          })

        //3. PLOT OF THE PREFERRED PAIR


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
      else{
        this.router.navigateByUrl('/user-preferences');
      }

      });



  }

}
