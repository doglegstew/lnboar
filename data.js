       var woData = [{
           'Type': 'Strength',
           'Description': " 1 x 1 Figured with Thanksgiving coming up and to eliminate any awkward conversations, let's brag to the family about our Bench Press :) Every 4 minutes x5 (20 minutes) -REST 4 MINUTES after completion to set up for Metcon- 4 mins = 8 Bench @60% 4 mins = 6 Bench @65-70% 4 mins = 2x2 @70-80% 4 mins = 2-3 Singles @80-90% 4 mins = Hit that Heavy Single! *Included in every 4 minute interval complete the following; *10-12 = DB Bent Over Rows *10-12 = DB Bicep Curls *10-12 = DB Shoulder Shrugs *Giving more time here to simply have some fun and see what happens :) ",
           'Date': '21 Nov 23',
           'Unit': 'Lbs',
           'Workout': 'Bench Press'
         },
         {
           'Type': 'Metcon',
           'Description': ' FT: (14 minute time cap) 3rds 15 - Wall Ball, 20/14 15 - TTB Directly into; 3rds 15 - Wall Ball, 20/14 10 - Pull Ups Directly into; 3rds 15 - Wall Ball, 20/14 5 - Bar Muscle Up *TTB = Knee Raises, GHDSU and/or Ab Mat Sit Ups *Pull Up variations = Jumping Pull Ups, Jumping C2B, Strict, Banded, and/or C2B (choose an easier one for Pull Ups, then a more challenging one for BMU) ',
           'Date': '21 Nov 23',
           'Unit': 'Time',
           'Workout': '21 Nov 23 - Metcon'
         },
         {
           "Type": "Thankful",
           "Description": "Wanting to wish you all a very Happy Thanksgiving! This time of year most will be with family and we all know how that goes :) Even though it can be hectic, remember there are plenty of people out there that wish they had what we have. I ask that you take some time to appreciate the moments and express to those you love, that you are thankful for them. I am most thankful for my family, my health, and you all!",
           "Date": "23 Nov 23",
           "Unit": "No Score",
           "Workout": "(16 total minutes)"
         },
         {
           "Type": "Metcon",
           "Description": "Up to 30 minutes (you decide how long you want to go) Row = 24/20 Cal or Bike = 20/16 8 = Power Cleans, up to 165/115 8 = Box Jumps, up to 36\" *\"Up to\" means ANY weight or height up to that limit. This should not be a beatdown, rather time to move and gear up for the holiday.",
           "Date": "22 Nov 23",
           "Unit": "No Score",
           "Workout": "22 Nov 23 - Metcon"
         }
       ];
       window.addEventListener('load', exerciseFunction, false);
       window.addEventListener('load', buttonFunction, false);

       var selectedDate = '';

       function buttonFunction() {
         var dateButtons = document.getElementById('dateButtons');
         var dates = [...new Set(woData.map(item => item.Date))]; // Get unique dates
         dates.sort((a, b) => new Date(a.split(' ').reverse().join('-')) - new Date(b.split(' ').reverse().join('-'))); // Sort dates
         for (var i = 0; i < dates.length; i++) {
           var button = document.createElement('button');
           button.textContent = dates[i];
           button.className = "button";
           button.onclick = function(e) {
             selectedDate = e.target.textContent;
             updateTypeSelect();
           };
           dateButtons.appendChild(button);
         }
         var typeSelect = document.getElementById('typeSelect');
         typeSelect.addEventListener('change', displayDescription);
       }

       function updateTypeSelect() {
         var typeSelect = document.getElementById('typeSelect');
         typeSelect.options.length = 1; // Clear previous options
         for (var i = 0; i < woData.length; i++) {
           if (woData[i].Date === selectedDate) {
             var option = document.createElement('option');
             option.value = woData[i].Type;
             option.text = woData[i].Type;
             typeSelect.appendChild(option);
           }
         }
       }

       function displayDescription() {
         var typeSelect = document.getElementById('typeSelect');
         var div = document.getElementById('description');
         var dropdown = document.getElementById('type')
         var woName = document.getElementById('workoutName');
         var selectedType = typeSelect.options[typeSelect.selectedIndex].value;

         for (var i = 0; i < woData.length; i++) {
           if (woData[i].Date === selectedDate && woData[i].Type === selectedType) {
             div.textContent = div.textContent = 'Description: ' + woData[i].Description + ', Workout: ' + woData[i].Workout + ', Unit: ' + woData[i].Unit;
             dropdown.value = woData[i].Type;
             woName.value = woData[i].Workout;
             break;
           }
         }
       }

       function exerciseFunction() {
         getText("https://script.google.com/macros/s/AKfycbxDJu0NLa3GGP0Z26gQzIk72ePViiTBJDA-Mow0tTF3bPC_YoRg6SwwTCNMs_gf299GrQ/exec?task=fetch");
         async function getText(file) {
           const exercises = [];
           let myObject = await fetch(file);
           let myText = await myObject.text();
           const obj = JSON.parse(myText);
           prData = obj.list;
           for (var i = 0; i < prData.length; i++) {
             exercises.push('<option value="' + i + '">' + prData[i][0] + '</option>');
           }
           document.getElementById("exercises").innerHTML = exercises.join('');
         }
         var exerSelect = document.getElementById('exercises');
         exerSelect.addEventListener('change', displayPrs);
       }

       function displayPrs() {
         var exercise_id = this.value;
         var exercise_max = prData[exercise_id][1];
         var exercise_unit = prData[exercise_id][3];
         var exercise_date = new Date(prData[exercise_id][2]);
         PR(exercise_max, exercise_unit, exercise_date);
         Percents(exercise_max, exercise_unit, exercise_date);
         history(exercise_id)
       }

       function Percents(exercise_max, exercise_unit, exercise_date) {
         var MAXint = parseInt(exercise_max);
         var perTable = document.getElementById("percenttable");
         while (perTable.rows.length > 1) {
           perTable.deleteRow(1)
         }
         const d = new Date(exercise_max);
         const s = new Date(1899, 11, 30, 00, 36, 36, 0);
         if (exercise_unit == "Min") {
           var tdiff = (d - s) / 60000;
           var tmin = Math.trunc(tdiff);
           var tsec = (tdiff - tmin) * 60;
           tsec = Math.round(tsec);
           if (tsec < 10) {
             tsec = "0" + tsec
           }
           exercise_max = tmin + ":" + tsec;
         } else {
           for (var j = 19; j > 0; j--) {
             var row = document.createElement('tr')
             for (var k = 0; k < 2; k++) {
               var cell = document.createElement('td')
               if (k == 0) {
                 cell.textContent = (5 * j);
               } else if (k == 1) {
                 cell.textContent = (0.05 * j * MAXint).toFixed(2);
               }
               row.appendChild(cell);
             }
             perTable.appendChild(row)
           }
         }
       }

       function history(exercise_id) {
         var history = []
         var recentTable = document.getElementById("recents");
         while (recentTable.rows.length > 1) {
           recentTable.deleteRow(1)
         }
         for (var i = 6; i < 16; i++) {
           var row = document.createElement('tr')
           var cell = document.createElement('td')
           cell.textContent = prData[exercise_id][i];
           row.appendChild(cell)
           recentTable.appendChild(row)
         }
       }

       function PR(exercise_max, exercise_unit, exercise_date) {
         exercise_date = exercise_date.toLocaleDateString('en-UK', {
           year: "numeric",
           month: "short",
           day: "numeric"
         });
         var MAX = exercise_max + " " + exercise_unit + " on " + exercise_date;
         document.getElementById("PRdisplay").innerHTML = MAX;
       }
