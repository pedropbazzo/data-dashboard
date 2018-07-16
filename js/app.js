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
dropHeadMenu.addEventListener("change", loadData);

var dropGenerationMenu = document.getElementById("selectGeneration");
//dropGenerationMenu.addEventListener ("change", loadData);

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

function loadGenerationMenu(headSelected) {
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


//aqui carrega os dados e faz o generationMenu de acordo com sede
function loadData() {
	var headSelected = dropHeadMenu.value;
	var totalStudents = 0;
	for(generation in data[headSelected]) {
		var numberStudentes = data[headSelected][generation]["students"].length;
		totalStudents += numberStudentes;
		console.log(generation);
	}
	document.getElementById("total-students").innerHTML = 'Total de alunas matriculadas na sede: ' + totalStudents;
	loadGenerationMenu(headSelected);
}

//Inclusão de gráficos
