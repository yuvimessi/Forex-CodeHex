import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-market',
  templateUrl: './latest-market.component.html',
  styleUrls: ['./latest-market.component.css']
})
export class LatestMarketComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var pairList = [];
    var access_key = 'ysXX5vLfObP0zlI0oB66nlEX8s1LBb5StLw5VRllsPlQHf';

    fetch("https://fcsapi.com/api-v2/forex/list?type=forex&access_key=" + access_key)
      .then(response => response.json())
      .then(data => {

        //to print the json value on console(to check)
        //console.log(data)

        for (var i = 0; i < data.response.length; i++) {

          pairList[i] = data.response[i].symbol;

        }


        var pair1 = document.getElementById('pair1');
        var fragment = document.createDocumentFragment();
        pairList.forEach(function (pairList, index) {
          var opt = document.createElement('option');
          opt.innerHTML = pairList;
          opt.value = pairList;
          fragment.appendChild(opt);
        });
        pair1.appendChild(fragment);


        var pair2 = document.getElementById('pair2');
        var fragment = document.createDocumentFragment();
        pairList.forEach(function (pairList, index) {
          var opt = document.createElement('option');
          opt.innerHTML = pairList;
          opt.value = pairList;
          fragment.appendChild(opt);
        });
        pair2.appendChild(fragment);

        
        var pair3 = document.getElementById('pair3');
        var fragment = document.createDocumentFragment();
        pairList.forEach(function (pairList, index) {
          var opt = document.createElement('option');
          opt.innerHTML = pairList;
          opt.value = pairList;
          fragment.appendChild(opt);
        });
        pair3.appendChild(fragment);


      })

    //to check json response
    //console.log(pairList)

  }

  getLatest() {

    var pair1 = (<HTMLSelectElement>document.getElementById('pair1')).value;
    var pair2 = (<HTMLSelectElement>document.getElementById('pair2')).value;
    var pair3 = (<HTMLSelectElement>document.getElementById('pair3')).value;
    var access_key = 'ysXX5vLfObP0zlI0oB66nlEX8s1LBb5StLw5VRllsPlQHf';

    var symbol = [];
    var price = [];
    var change = [];
    var chg_per = [];
    var last_changed = [];

    fetch("https://fcsapi.com/api-v2/forex/latest?symbol=" + pair1 + "," + pair2 + "," + pair3 + "&access_key=" + access_key)
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


        var display = document.getElementById("results");
        var output = '';

        for (var i = 0; i < 3; i++) {
          output +=
            '<div class="col-sm-12 col-lg-4">' +
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

  }


}
