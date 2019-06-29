
document.getElementById('import').onclick = function() {


    var files = document.getElementById('selectFiles').files;

    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();
    
    fr.onload = function(e) {


        displayDiagrams();

        var mainChart = null;
        
        var result = JSON.parse(e.target.result);
        var formatted = JSON.stringify(result, null, 2);

        var dataEntries = result.sales;
        var customerIDs = Object.keys(dataEntries);

        var customers = [];
        
        getAllData();
        renderGenSales();
        renderBurgSales();
        renderSpecSales();
        renderBurgBySpec();
        renderSalesByHour();
        renderSalesByDay();
        renderDatePicker();

        function getAllData() {
            for(var i = 0; i < customerIDs.length; i++){
            var custID = dataEntries[customerIDs[i]];
            var customer = {customerNum: custID};

            var customerInfo = [];

            customerInfo.push(customerIDs[i]);
            customerInfo.push(customer.customerNum["datetime"]);
            customerInfo.push(customer.customerNum["burger"]);
            customerInfo.push(customer.customerNum["species"]);
            customers.push(customerInfo);
            }
        }


        function renderGenSales () {

            var container = document.getElementById("mainTable");

            if (!container.contains(document.getElementById('salesTable'))) {

                var div = document.createElement('div');
                div.id = 'salesTableDiv';
                div.style.padding = '10px 0px 10px 0px';
                
                var tbl = document.createElement('table');
                tbl.id = 'salesTable';
                tbl.style.width = '100%';

                container.prepend(div);
                div.append(tbl);
            }

            

            $(document).ready(function() {
                $('#salesTable').DataTable( {
                    data: customers,
                    columns: [
                        { title: "ID" },
                        { title: "Date and Time" },
                        { title: "Burger" },
                        { title: "Species" }
                    ]
                } );
            } );


        }




        function renderBurgSales () {

            var burgersales = result["burger_sales"];
            var burgersalesQty = [burgersales["Krusty Combo"], burgersales["Krusty Deluxe"], burgersales["Krabby Pattie"]];
            console.log(burgersalesQty);


            let myChart = document.getElementById('burgerSalesBar').getContext('2d'); 

            mainChart = new Chart(myChart, {
                type:'bar',
                data: {
                    labels: ['Krusty Combo', 'Krusty Deluxe', 'Krabby Pattie'],
                    datasets: [{
                        label: 'Total Sales Per Burger',
                        data: burgersalesQty
                    }]
                },
                options: {}

            });
        }


        function renderSpecSales () {


            var species_sales = result["species_sales"];
            var salesBySpecies = [species_sales["leatherback turtle"], species_sales["salmon"], species_sales["seahorse"], species_sales["coral"],
                                species_sales["giant clam"], species_sales["gray whale"], species_sales["sea lion"]];
            console.log(salesBySpecies);


            let myChart = document.getElementById('speciesSalesBar').getContext('2d');

            mainChart = new Chart(myChart, {
                type:'bar',
                data: {
                    labels: ['Leatherback Turtle', 'Salmon', 'Seahorse', 'Coral', 'Giant Clam', 'Gray Whale', 'Sea Lion'],
                    datasets: [{
                        label: 'Total Sales Per Species',
                        data: salesBySpecies
                    }]
                },
                    options: {}

            });

        }

        function renderBurgBySpec () {


            var burger_by_species = result["burger_by_species"];

            var combo_Byspecies = burger_by_species["Krusty Combo"];
            var pattie_Byspecies = burger_by_species["Krabby Pattie"];
            var deluxe_Byspecies = burger_by_species["Krusty Deluxe"];

            var combo_sales_species = [combo_Byspecies["leatherback turtle"], combo_Byspecies["salmon"], combo_Byspecies["seahorse"], combo_Byspecies["coral"],
                                        combo_Byspecies["giant clam"], combo_Byspecies["gray whale"], combo_Byspecies["sea lion"]];
            var pattie_sales_species = [pattie_Byspecies["leatherback turtle"], pattie_Byspecies["salmon"], pattie_Byspecies["seahorse"], pattie_Byspecies["coral"],
                                        pattie_Byspecies["giant clam"], pattie_Byspecies["gray whale"], pattie_Byspecies["sea lion"]];
            var deluxe_sales_species = [deluxe_Byspecies["leatherback turtle"], deluxe_Byspecies["salmon"], deluxe_Byspecies["seahorse"], deluxe_Byspecies["coral"],
                                        deluxe_Byspecies["giant clam"], deluxe_Byspecies["gray whale"], deluxe_Byspecies["sea lion"]];

            console.log(combo_sales_species);
            console.log(pattie_sales_species);
            console.log(deluxe_sales_species);



            var comboDataset = {
                        label: 'Krusty Combo Sales',
                        data: combo_sales_species,
                        backgroundColor: 'rgba(0, 99, 132, 0.6)'

            };

            var deluxeDataset = {
                        label: 'Krusty Deluxe Sales',
                        data: deluxe_sales_species,
                        backgroundColor: 'rgba(99, 132, 0, 0.6)'
            };

            var pattieDataset = {
                        label: 'Krabby Pattie Sales',
                        data: pattie_sales_species,
                        backgroundColor: 'rgba(0, 99, 0, 0.6)'
            };

            

            let myChart = document.getElementById('burgerBySpecBar').getContext('2d');

            mainChart = new Chart(myChart, {
                type:'bar',
                data: {
                    labels: ['Leatherback Turtle', 'Salmon', 'Seahorse', 'Coral', 'Giant Clam', 'Gray Whale', 'Sea Lion'],
                    datasets: [comboDataset, deluxeDataset, pattieDataset]
                },
                    options: {}

            });
        }

        function renderSalesByHour () {

            var nCusPerHour;

            var am1 = 0;
            var am2 = 0;
            var am3 = 0;
            var am4 = 0;
            var am5 = 0;
            var am6 = 0;
            var am7 = 0;
            var am8 = 0;
            var am9 = 0;
            var am10 = 0;
            var am11 = 0;
            var pm12 = 0;

            var pm1 = 0;
            var pm2 = 0;
            var pm3 = 0;
            var pm4 = 0;
            var pm5 = 0;
            var pm6 = 0;
            var pm7 = 0;
            var pm8 = 0;
            var pm9 = 0;
            var pm10 = 0;
            var pm11 = 0;
            var am12 = 0;


            for (var i = 0; i< customers.length; i++) {
                var date = new Date(customers[i][1]);

                if (date.getHours() == 0) {
                    am12++;
                }
                else if (date.getHours() == 1) {
                    am1++;
                }
                else if (date.getHours() == 2) {
                    am2++;
                }
                else if (date.getHours() == 3) {
                    am3++;
                }
                else if (date.getHours() == 4) {
                    am4++;
                }
                else if (date.getHours() == 5) {
                    am5++;
                }
                else if (date.getHours() == 6) {
                    am6++;
                }
                else if (date.getHours() == 7) {
                    am7++;
                }
                else if (date.getHours() == 8) {
                    am8++;
                }
                else if (date.getHours() == 9) {
                    am9++;
                }
                else if (date.getHours() == 10) {
                    am10++;
                }
                else if (date.getHours() == 11) {
                    am11++;
                }
                else if (date.getHours() == 12) {
                    pm12++;
                }
                else if (date.getHours() == 13) {
                    pm1++;
                }
                else if (date.getHours() == 14) {
                    pm2++;
                }
                else if (date.getHours() == 15) {
                    pm3++;
                }
                else if (date.getHours() == 16) {
                    pm4++;
                }
                else if (date.getHours() == 17) {
                    pm5++;
                }
                else if (date.getHours() == 18) {
                    pm6++;
                }
                else if (date.getHours() == 19) {
                    pm7++;
                }
                else if (date.getHours() == 20) {
                    pm8++;
                }
                else if (date.getHours() == 21) {
                    pm9++;
                }
                else if (date.getHours() == 22) {
                    pm10++;
                }
                else if (date.getHours() == 23) {
                    pm11++;
                }

                nCusPerHour = [am1, am2, am3, am4, am5, am6, am7, am8, am9, am10, am11, pm12,
                    pm1, pm2, pm3, pm4, pm5, pm6, pm7, pm8, pm9, pm10, pm11, am12];

            }


            let myChart = document.getElementById('salesByHourLine').getContext('2d'); 

            mainChart = new Chart(myChart, {
                type:'line',
                data: {
                    labels: ['1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm',
                        '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00am'],
                    datasets: [{
                        label: 'Total Sales Per Hour of the Day',
                        data: nCusPerHour
                    }]
                },
                options: {}

            });
        }

        function renderSalesByDay () {

            var nCusPerDay;

            var monCtr = 0;
            var tuesCtr = 0;
            var wedCtr = 0;
            var thursCtr = 0;
            var friCtr = 0;
            var satCtr = 0;
            var sunCtr = 0;

            for (var i = 0; i< customers.length; i++) {

                var date = new Date(customers[i][1]);

                if (date.getDay() == 0) {
                    sunCtr++;
                }
                else if (date.getDay() == 1) {
                    monCtr++;
                }
                else if (date.getDay() == 2) {
                    tuesCtr++;
                }
                else if (date.getDay() == 3) {
                    wedCtr++;
                }
                else if (date.getDay() == 4) {
                    thursCtr++;
                }
                else if (date.getDay() == 5) {
                    friCtr++;
                }
                else if (date.getDay() == 6) {
                    satCtr++;
                }
            
                nCusPerDay = [thursCtr, friCtr, satCtr, sunCtr, monCtr, tuesCtr, wedCtr];
            }

            console.log(nCusPerDay);

            let myChart = document.getElementById('salesByDayLine').getContext('2d'); 

            mainChart = new Chart(myChart, {
                type:'line',
                data: {
                    labels: ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
                    datasets: [{
                        label: 'Total Sales Per Day of the Week',
                        data: nCusPerDay
                    }]
                },
                options: {}

            });
            
        }


        var dp = null;

        function renderDatePicker () {

            var lastDate = customers[customers.length-1][1];
            dp = $('#dp').datepicker().data('datepicker');
            dp.date = new Date(lastDate);
            dp.selectDate(lastDate);

            renderSpecificDay(moment(lastDate).format("MM/DD/YYYY"));

            $("#dp").datepicker({
                onSelect: function(dateText) {

                    if(mainChart!= null) {
                        mainChart.destroy();
                    }

                    renderSpecificDay(dateText);
                }
            });

            var canvas = document.getElementById("clock");
            var ctx = canvas.getContext("2d");
            var radius = canvas.height / 2;
            ctx.translate(radius, radius);
            radius = radius * 0.90
            setInterval(drawClock, 1000);

            function drawClock() {
                drawFace(ctx, radius);
                drawNumbers(ctx, radius);
                drawTime(ctx, radius);
              }
              
              function drawFace(ctx, radius) {
                var grad;
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, 2*Math.PI);
                ctx.fillStyle = 'white';
                ctx.fill();
                grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
                grad.addColorStop(0, '#333');
                grad.addColorStop(0.5, 'white');
                grad.addColorStop(1, '#333');
                ctx.strokeStyle = grad;
                ctx.lineWidth = radius*0.1;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
                ctx.fillStyle = '#333';
                ctx.fill();
              }
              
              function drawNumbers(ctx, radius) {
                var ang;
                var num;
                ctx.font = radius*0.15 + "px arial";
                ctx.textBaseline="middle";
                ctx.textAlign="center";
                for(num = 1; num < 13; num++){
                  ang = num * Math.PI / 6;
                  ctx.rotate(ang);
                  ctx.translate(0, -radius*0.85);
                  ctx.rotate(-ang);
                  ctx.fillText(num.toString(), 0, 0);
                  ctx.rotate(ang);
                  ctx.translate(0, radius*0.85);
                  ctx.rotate(-ang);
                }
              }
              
              function drawTime(ctx, radius){
                  var now = new Date();
                  var hour = now.getHours();
                  var minute = now.getMinutes();
                  var second = now.getSeconds();
                  //hour
                  hour=hour%12;
                  hour=(hour*Math.PI/6)+
                  (minute*Math.PI/(6*60))+
                  (second*Math.PI/(360*60));
                  drawHand(ctx, hour, radius*0.5, radius*0.07);
                  //minute
                  minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
                  drawHand(ctx, minute, radius*0.8, radius*0.07);
                  // second
                  second=(second*Math.PI/30);
                  drawHand(ctx, second, radius*0.9, radius*0.02);
              }
              
              function drawHand(ctx, pos, length, width) {
                  ctx.beginPath();
                  ctx.lineWidth = width;
                  ctx.lineCap = "round";
                  ctx.moveTo(0,0);
                  ctx.rotate(pos);
                  ctx.lineTo(0, -length);
                  ctx.stroke();
                  ctx.rotate(-pos);
              }

        }

        function renderSpecificDay (selectedDate) {

            if (selectedDate != '') {
                console.log("Selected date: " + selectedDate);


                var nCusPerHour;

                var am1 = 0;
                var am2 = 0;
                var am3 = 0;
                var am4 = 0;
                var am5 = 0;
                var am6 = 0;
                var am7 = 0;
                var am8 = 0;
                var am9 = 0;
                var am10 = 0;
                var am11 = 0;
                var pm12 = 0;

                var pm1 = 0;
                var pm2 = 0;
                var pm3 = 0;
                var pm4 = 0;
                var pm5 = 0;
                var pm6 = 0;
                var pm7 = 0;
                var pm8 = 0;
                var pm9 = 0;
                var pm10 = 0;
                var pm11 = 0;
                var am12 = 0;


                for (var i = 0; i< customers.length; i++) {

                    var date = new Date(customers[i][1]);

                    if (moment(date).format("MM/DD/YYYY") === selectedDate) {

                        if (date.getHours() == 0) {
                            am12++;
                        }
                        else if (date.getHours() == 1) {
                            am1++;
                        }
                        else if (date.getHours() == 2) {
                            am2++;
                        }
                        else if (date.getHours() == 3) {
                            am3++;
                        }
                        else if (date.getHours() == 4) {
                            am4++;
                        }
                        else if (date.getHours() == 5) {
                            am5++;
                        }
                        else if (date.getHours() == 6) {
                            am6++;
                        }
                        else if (date.getHours() == 7) {
                            am7++;
                        }
                        else if (date.getHours() == 8) {
                            am8++;
                        }
                        else if (date.getHours() == 9) {
                            am9++;
                        }
                        else if (date.getHours() == 10) {
                            am10++;
                        }
                        else if (date.getHours() == 11) {
                            am11++;
                        }
                        else if (date.getHours() == 12) {
                            pm12++;
                        }
                        else if (date.getHours() == 13) {
                            pm1++;
                        }
                        else if (date.getHours() == 14) {
                            pm2++;
                        }
                        else if (date.getHours() == 15) {
                            pm3++;
                        }
                        else if (date.getHours() == 16) {
                            pm4++;
                        }
                        else if (date.getHours() == 17) {
                            pm5++;
                        }
                        else if (date.getHours() == 18) {
                            pm6++;
                        }
                        else if (date.getHours() == 19) {
                            pm7++;
                        }
                        else if (date.getHours() == 20) {
                            pm8++;
                        }
                        else if (date.getHours() == 21) {
                            pm9++;
                        }
                        else if (date.getHours() == 22) {
                            pm10++;
                        }
                        else if (date.getHours() == 23) {
                            pm11++;
                        }
                    }


                    nCusPerHour = [am1, am2, am3, am4, am5, am6, am7, am8, am9, am10, am11, pm12,
                    pm1, pm2, pm3, pm4, pm5, pm6, pm7, pm8, pm9, pm10, pm11, am12];

                }


                let myChart = document.getElementById('specificDaySalesLine').getContext('2d'); 

                mainChart = new Chart(myChart, {
                    type:'line',
                    data: {
                        labels: ['1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm',
                        '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00am'],
                        datasets: [{
                            label: 'Total Sales Per Hour of the Day on ' + selectedDate,
                            data: nCusPerHour
                        }]
                    },
                    options: {}

                });
            }



        }

        function displayDiagrams () {

            var container = document.getElementById("mainTable");
            if (container.contains(document.getElementById('salesTableDiv'))) {
                var element = document.getElementById("salesTableDiv");
                element.parentNode.removeChild(element);
            }

            var divs = document.getElementsByClassName("diagram");
            for (var i = 0; i<divs.length; i++) {
                divs[i].style.display = "block";
            }
        }

        

    };


    fr.readAsText(files.item(0));




};
