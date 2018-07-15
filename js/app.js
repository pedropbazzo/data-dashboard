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
dropHeadMenu.addEventListener("change", loadData);

//var dropGenerationMenu = document.getElementById("selectGeneration");
//dropGenerationMenu.addEventListener ("change", );

window.onload = loadHeadMenu();
// carrega o generationMenu de acordo com a sede

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

//aqui carrega os dados e faz o generationMenu de acordo com sede
function loadData() {
	var headSelected = dropHeadMenu.value;
	var totalStudents = 0;
	for(generation in data[headSelected]) {
		var numberStudentes = data[headSelected][generation]["students"].length;
		totalStudents += numberStudentes;
	}
	document.getElementById("total-students").innerHTML = 'Total de alunas matriculadas na sede: ' + totalStudents;	
}




// Puedes hacer uso de la base de datos a través de la variable `data`
//console.log(data);


/*//Aplicacao de filtro para sede e geracao
function filter() {
	var headOptions = document.getElementById( "selectHeads");
	var headSelected = headOptions.options[headOptions.selectedIndex].value;
	
	var generationOptions = document.getElementById( "selectGeneration");
	var generationSelected = generationOptions.options[generationOptions.selectedIndex].value;

	//alert(headSelected + generationSelected);
}*/