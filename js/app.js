/*
 * Funcionalidad de tu producto
 */
 //Funcionalidade do menu hamburguer
 function openNav() {
 	document.getElementById("sideNav").style.width = "250px";
 }

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

	var totalStudents = data[headSelected][generationSelected]["students"].length;
	document.getElementById("total-students").innerHTML = 'Total de alunas matriculadas na sede: ' + totalStudents;	

	var quittingStudents = 0;
	for (i in data[headSelected][generationSelected]["students"]){
		if (data[headSelected][generationSelected]["students"][i]["active"] == false) {
			quittingStudents += 1;
		}
	}
	var rateQuitStudent = (quittingStudents/totalStudents)*100;
	//console.log(totalStudents);
	//console.log(quittingStudents);
	//console.log(rateQuitStudent);
	document.getElementById("quitting-students").innerHTML = "Alunas desistentes: " + rateQuitStudent.toFixed(2) + "%"
}

function achievements() {

	var head = dropHeadMenu.value;
	var generation = dropGenerationMenu.value;


	var quantitySprints = data[head][generation]['ratings'].length;

	//for ( var i; i <)


}





























/*function loadData() {

	var headSelected = dropHeadMenu.value;
	loadGenerationMenu(headSelected);

	var totalStudents = 0;
	for(generation in data[headSelected]) {
		var numberStudentes = data[headSelected][generation]["students"].length;
		totalStudents += numberStudentes;
	}
	document.getElementById("total-students").innerHTML = 'Total de alunas matriculadas na sede: ' + totalStudents;	
}

function reloadData() { //mostra dados de acordo com geracao
	console.log(dropGenerationMenu.value);
}*/
				