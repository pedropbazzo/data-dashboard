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

function filter() {
	var headOptions = document.getElementById( "selectHeads");
	var headSelected = headOptions.options[headOptions.selectedIndex].value;
	
	var generationOptions = document.getElementById( "selectGeneration");
	var generationSelected = generationOptions.options[generationOptions.selectedIndex].value;

	//alert(headSelected + generationSelected);
}

// Puedes hacer uso de la base de datos a través de la variable `data`
//console.log(data);
