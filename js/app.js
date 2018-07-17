/*
* Funcionalidad de tu producto
*/
//Funcionalidade do menu hamburguer
var openSideNav = document.getElementById("openNav");
openSideNav.addEventListener("click", openNav);
function openNav() {
  document.getElementById("sideNav").style.width = "250px";
}
var closeSideNav = document.getElementById("closeNav");
closeSideNav.addEventListener("click", closeNav);
function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}

//Menu dinamico de sedes e geracoes
var dropHeadMenu = document.getElementById("selectHeads");
dropHeadMenu.addEventListener("change", loadGenerationMenu);

var dropGenerationMenu = document.getElementById("selectGeneration");
dropGenerationMenu.addEventListener ("change", loadData);

window.onload = loadHeadMenu();
//window.onload = loadGenerationMenu();

function loadHeadMenu() {
  var option = document.createElement("option");
  option.innerHTML = "Selecione a sede";
  option.value = "none";
  dropHeadMenu.appendChild(option);
  for(head in data){
    var optionItem = document.createElement("option");
    optionItem.innerHTML = head;
    optionItem.value = head;
    dropHeadMenu.appendChild(optionItem);
  }
}

function loadGenerationMenu() {
  var headSelected = dropHeadMenu.value;
  dropGenerationMenu.innerHTML = "";

  var generation = document.createElement("option");
  generation.innerHTML = "Selecione a geração";
  generation.value = "none";
  dropGenerationMenu.appendChild(generation);

  for(generation in data[headSelected]){
    var genItem = document.createElement("option");
    genItem.innerHTML = generation;
    genItem.value = generation;
    dropGenerationMenu.appendChild(genItem);
  }
}

function loadData() {
  enrollmentStudents();
  achievements();
}

function enrollmentStudents() {
  var headSelected = dropHeadMenu.value;
  var generationSelected = dropGenerationMenu.value;

  var allStudents = data[headSelected][generationSelected]["students"].length;
  document.getElementById("all-students").innerHTML = 'Total de alunas matriculadas na sede: ' + allStudents;

  var quittingStudents = 0;
  for (i in data[headSelected][generationSelected]["students"]){
    if (data[headSelected][generationSelected]["students"][i]["active"] == false) {
      quittingStudents += 1;
    }
  }
  var rateQuitStudent = (quittingStudents/allStudents)*100;
  //console.log(allStudents);
  //console.log(quittingStudents);
  //console.log(rateQuitStudent);
  document.getElementById("quitting-students").innerHTML = "Alunas desistentes: " + rateQuitStudent.toFixed(2) + "%"

}

function achievements() {

  var head = dropHeadMenu.value;
  var generation = dropGenerationMenu.value;

	var quantitySprints = data[head][generation]["ratings"].length;

	for (var j = 0; j < quantitySprints; j++) {
		console.log("SPRINT" + j+1);
		for ( i in data[head][generation]['students'] ) {
			//acessa o array de sprints de cada aluna
			console.log(data[head][generation]['students'][i]["sprints"][j]["score"]);

		}
	}

}


  /*
function netPromoScore(){

  [Promoters] = [Respostas 9 ou 10] / [Total respostas] * 100
  [Passive] = [Respostas 7 a 8] / [Total Respostas] * 100
  [Detractors] = [Respostas entre 1 e 6] / [Total Respostas] * 100

  [NPS] = [Promoters] - [Detractors]



}
*/

function loadDevs(){
  var dropHead = dropHeadMenu.value;
  var dropGeneration = dropGenerationMenu.value;
  var devsList = document.getElementById("developers");
  devList.innerHTML = "";
  for(generation in data[head]){
    for(i in data[head][generation]['students']){
      var people = document.createElement('div');
      people.classList.add('people');
      var img = document.createElement('img');
      img.classList.add('photo');
      img.src = data[head][generation]['students'][i]['photo'];
      devList.appendChild(people);
      people.appendChild(img);
    }
  }

}



/*
// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {
        var
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
*/

























/*function loadData() {

var headSelected = dropHeadMenu.value;
loadGenerationMenu(headSelected);

var allStudents = 0;
for(generation in data[headSelected]) {
var numberStudentes = data[headSelected][generation]["students"].length;
allStudents += numberStudentes;
}
document.getElementById("all-students").innerHTML = 'Total de alunas matriculadas na sede: ' + allStudents;
loadGenerationMenu(headSelected);
}*/

//Inclusão de gráficos
