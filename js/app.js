/*
* Funcionalidad de tu producto
*/

var techMaxPoints = 1800;
var hseMaxPoints = 1200;

//Funcionalidade do menu hamburguer
var openSideNav = document.getElementById("openNav");
openSideNav.addEventListener("click", openNav);
function openNav() {
  document.getElementById("sideNav").style.width = "250px";
  document.getElementById("sideNav").style.display = "block";
}
var closeSideNav = document.getElementById("closeNav");
closeSideNav.addEventListener("click", closeNav);
function closeNav() {
  document.getElementById("sideNav").style.display = "none";
}

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

google.charts.load('current', {packages: ['corechart', 'bar']});
//google.charts.setOnLoadCallback(drawBasic);




//Menu dinamico de sedes e geracoes
var dropHeadMenu = document.getElementById("select-heads");
dropHeadMenu.addEventListener("change", loadGenerationMenu);

var dropGenerationMenu = document.getElementById("select-generation");
dropGenerationMenu.addEventListener ("change", loadData);

var dropSprintMenu = document.getElementById("select-sprint-skills");
dropSprintMenu.addEventListener("change", studentsPoints);


window.onload = loadHeadMenu();

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

function loadSprintMenu() {
  var head = dropHeadMenu.value;
  var generation = dropGenerationMenu.value;
  dropSprintMenu.innerHTML = "";

  var sprint = document.createElement("option");
  sprint.innerHTML = "Selecione o sprint";
  sprint.value = "none";
  dropSprintMenu.appendChild(sprint);
  var totalSprints = data[head][generation]['ratings'].length;

  for(var i = 0; i < totalSprints; i++){
    var sprintItem = document.createElement("option");
    sprintItem.innerHTML = "Sprint " + (i+1);
    sprintItem.value = i;
    dropSprintMenu.appendChild(sprintItem);
  }
}

function loadData() {
  enrollmentStudents();
  achievements();
  loadSprintMenu();
  netPromoScore();
  mentorRating();
  jedisRating();
}

function drawChart(activeStudents, quittingStudents) {
  // var chart = new google.visualization.DataTable(document.getElementById("drawChart"));
  var data = google.visualization.arrayToDataTable([
    ['Status','Total'],
    ['Ativas', activeStudents],
    ['Inativas', quittingStudents]
  ]);

 /* var options = {
    title: 'Grafico 1'
  };*/
  var chart = new google.visualization.PieChart(document.getElementById('drawChart'));

  //chart.draw(data, options);
  chart.draw(data);
}

function techSkillsChart(aboveTechPoints, belowAverageTechPoints) {
  var data = google.visualization.arrayToDataTable([
    ['Status','Total'],
    ['Atingiram a meta', aboveTechPoints],
    ['Nao atingiram', belowAverageTechPoints]
  ]);

 /* var options = {
    title: 'Grafico 1'
  };*/
  var chart = new google.visualization.PieChart(document.getElementById('techSkillsChart'));
  chart.draw(data);
}

function hseSkillsChart(aboveHsePoints, belowAverageHsePoints) {
  var data = google.visualization.arrayToDataTable([
    ['Status','Total'],
    ['Atingiram a meta', aboveHsePoints],
    ['Nao atingiram', belowAverageHsePoints]
  ]);

 /* var options = {
    title: 'Grafico 1'
  };*/
  var chart = new google.visualization.PieChart(document.getElementById('hseSkillsChart'));
  chart.draw(data);
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
  document.getElementById("quitting-students").innerHTML = "Alunas desistentes: " + rateQuitStudent.toFixed(2) + "%";
  var activeStudents = allStudents - quittingStudents;

	drawChart(activeStudents, quittingStudents);

  //grafico para alunas ativas e alunas desistentes
}

//tentativa grafico de colunas
/*function drawBasic(array) {
				var dataArray = [];
				dataArray = array;

        var data = google.visualization.arrayToDataTable([
        	[]
        	]);

        //var googleChartData = google.visualization.arrayToDataTable($.parseJSON(chartData));
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, {width: 400, height: 240, title: 'Company Performance'});
}
*/
function achievements() {
  var head = dropHeadMenu.value;
  var generation = dropGenerationMenu.value;
  var allStudents = data[head][generation]["students"].length;
	var quantitySprints = data[head][generation]["ratings"].length;
	var techAveragePoints = 0.7*techMaxPoints;
	var hseAveragePoints = 0.7*hseMaxPoints;
	var sumTechPoints = 0;
	var sumHsePoints = 0;
	var averageTechStud = 0;
	var averageHseStud = 0;
	var dataArray = [];

	for(var j = 0; j < quantitySprints; j++){
		sumTechPoints = 0;
		sumHsePoints = 0;

		for( i in data[head][generation]["students"] ){
			//acessa o array de sprints de cada aluna
			if (data[head][generation]['students'][i]["sprints"] != undefined){
				if (data[head][generation]["students"][i]["sprints"].length != 0){
					if( data[head][generation]["students"][i]["sprints"][j]["score"]["tech"] >= techAveragePoints){
						sumTechPoints += 1;
					}
					if(data[head][generation]["students"][i]["sprints"][j]["score"]["hse"] >= hseAveragePoints){
						sumHsePoints += 1;
					}
				}
			}
		}
		averageTechStud += sumTechPoints;
		averageHseStud += sumHsePoints;

		document.getElementById("tech-skill-sp" + (j + 1)).innerHTML = "Sprint " + (j + 1) + ": " + sumTechPoints + " - " + ((sumTechPoints/allStudents)*100).toFixed(2) + "%";
		document.getElementById("hse-skill-sp" + (j + 1)).innerHTML = "Sprint " + (j + 1) + ": " + sumHsePoints+ " - " + ((sumHsePoints/allStudents)*100).toFixed(2) + "%";

		//Cria o array para fazer o gráfico:
		dataArray[0] = [];
		dataArray[0][0] = "Sprint";
		dataArray[0][1] = "Alunas";

		dataArray[j+1] = [];
		for (i = 0; i < dataArray[0].length; i++) {
			if(i == 0) {
				dataArray[j+1][i] = "Sprint" + (j+1);
			}else {
				dataArray[j+1][i] = sumTechPoints;
			}
		}


	}
	//console.log(dataArray);
	averageTechStud = (averageTechStud/quantitySprints).toFixed(2);
	averageHseStud = (averageHseStud/quantitySprints).toFixed(2);
	document.getElementById("average-tech-stud").innerHTML = "Média: " + (averageTechStud) + " - " +((averageTechStud/allStudents)*100).toFixed(2) + "%";
	document.getElementById("average-hse-stud").innerHTML = "Média: " + (averageHseStud) + " - " + ((averageHseStud/allStudents)*100).toFixed(2) + "%";
	//drawBasic(dataArray);
}

function studentsPoints() {
	var head = dropHeadMenu.value;
  var generation = dropGenerationMenu.value;
  var sprint = dropSprintMenu.value;
  var allStudents = data[head][generation]["students"].length;
	var quantitySprints = data[head][generation]["ratings"].length;
	var techAveragePoints = 0.7*techMaxPoints;
	var hseAveragePoints = 0.7*hseMaxPoints;
	var aboveTechPoints = 0;
	var aboveHsePoints = 0;
	var averageTechStud = 0;
	var averageHseStud = 0;

	for( i in data[head][generation]["students"] ){
		//acessa o array de sprints de cada aluna
		if (data[head][generation]['students'][i]["sprints"] != undefined){
			if (data[head][generation]["students"][i]["sprints"].length != 0){
					if( data[head][generation]["students"][i]["sprints"][sprint]["score"]["tech"] >= techAveragePoints){
						aboveTechPoints += 1;
					}
					if(data[head][generation]["students"][i]["sprints"][sprint]["score"]["hse"] >= hseAveragePoints){
						aboveHsePoints += 1;
					}
				}
			}
	}

	var belowAverageTechPoints = allStudents - aboveTechPoints;
	var belowAverageHsePoints = allStudents - aboveHsePoints;

	document.getElementById("tech-skills-std-number").innerHTML = "TECH " + aboveTechPoints + " " + ((aboveTechPoints/allStudents)*100).toFixed(2) + "%";
	document.getElementById("hse-skills-std-number").innerHTML = "HSE  "  + aboveHsePoints+ " " + ((aboveHsePoints/allStudents)*100).toFixed(2) + "%";

	techSkillsChart(aboveTechPoints, belowAverageTechPoints);
	hseSkillsChart(aboveHsePoints, belowAverageHsePoints);

}

function netPromoScore(){
  var head = dropHeadMenu.value;
  var generation = dropGenerationMenu.value;
	var ratingsLength = data[head][generation]['ratings'].length;
	var sumNPS = 0;
	for(var i = 0; i < ratingsLength; i++){
		var promoters = data[head][generation]['ratings'][i]['nps']['promoters'];
		var detractors = data[head][generation]['ratings'][i]['nps']['detractors'];
		var nps = promoters - detractors;
		sumNPS += nps;
		document.getElementById("nps-sp" + (i + 1)).innerHTML = "NPS sprint "+ (i + 1) + " : " + nps.toFixed(2);
	}
	var averageNPS = (sumNPS / ratingsLength);
	document.getElementById("average-nps").innerHTML = "média NPS: " + averageNPS;

}

function mentorRating(){
  var head = dropHeadMenu.value;
  var generation = dropGenerationMenu.value;
  var sum = 0;
  for(var i in data[head][generation]['ratings']){
    var mentorScore = parseFloat(data[head][generation]['ratings'][i]["teacher"]);
    sum = sum + mentorScore;
    document.getElementById("score-mentor-sp" + (parseInt(i)+1)).innerHTML = "Sprint " + (parseInt(i)+1) + ": " + mentorScore;
  }
  var average = sum / (parseInt(i) + 1);
  var averagePercent = (average/5) * 100;
  document.getElementById("score-average").innerHTML = "A pontuação média é: " + average.toFixed(2);
}

function jedisRating(){
  var head = dropHeadMenu.value;
  var generation = dropGenerationMenu.value;
  var sum = 0;
  for(var i in data[head][generation]['ratings']){
    var jediScore = parseFloat(data[head][generation]['ratings'][i]['jedi']);
    sum = sum + jediScore;
    document.getElementById("score-jedi-sp" + (parseInt(i)+1)).innerHTML = "Sprint " + (parseInt(i)+1) + ": " + jediScore;
  }
  var average = sum / (parseInt(i) + 1);
  var averagePercent = (average/5) * 100;
  document.getElementById("jedi-average").innerHTML = "A pontuação média é: " + average.toFixed(2);
}
//chamada da função ao clicar na aba estudantes.
var tabStudents = document.getElementById("tabStudents");
tabStudents.addEventListener("click", loadDevs);

//função que monta os cards com as infos das estudantes.
function loadDevs(){
  //fazer um laço para pegar o nome das estudantes de cada sede e turma no data.js
  var studentsInfo = [];
  for(var head in data){
    for (var generation in data[head]){
      for (var students in data[head][generation]) {
        var devsList = document.getElementById("developers");
        devsList.innerHTML = "";
        for(var i in data[head][generation]['students']){
          var people = document.createElement('div');
          people.classList.add('people');
          var img = document.createElement('img');
          img.classList.add('photo');
          img.src = data[head][generation]['students'][i]['photo'];
          if(data[head][generation]['students'][i]['photo'] == undefined ||data[head][generation]['students'][i]['photo'] == "" ){
            img.src = 'assets/images/sem-photo.jpg';
          }
          var devInfo = document.createElement('div');
          devInfo.classList.add('dev-info');
          var name = document.createElement('h4');
          name.innerHTML = data[head][generation]['students'][i]['name'];
          var position = document.createElement('h5');
          position.innerHTML = "Frontend Developer";
          people.appendChild(img);
          people.appendChild(devInfo);
          devInfo.appendChild(name);
          devInfo.appendChild(position);
          devsList.appendChild(people);
        }
      }
    }
  }

}
