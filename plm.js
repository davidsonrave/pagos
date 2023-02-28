// Globals
const getSelector = document.querySelector('#selector-state'); 
const citiesList = document.querySelector('#selector-city');
const getEspecialidad = document.querySelector('#especialdiad');
const getTipoNecesidad = document.querySelector('select#tipo-necesidad');
const getContentContratistas = document.querySelector('.grid-contratistas');
let getOnChange = document.querySelectorAll('.select-contratistas');
/*Buscar Especialidad */
const buscarFilters = document.querySelector('.buscar-filtros');
/** Filter */
const reloadPage = document.querySelector('.limpiar-filtro');

const tiendasID = 'https://pintuco.com.co/wp-json/wp/v2/contratistas?per_page=100&_fields[]=departamento_ciudad';

fetch(tiendasID)
    .then(respuesta => respuesta.json())
    .then(resultado => loadIdContratistas(resultado))

var arrayIdContratistas = [];

//Cargar ID contratistas   
function loadIdContratistas(datos){
	

    //Depurar valores repetidos en contratitas
    datos.forEach(item =>{
        
        for (let i = 0; i < item.departamento_ciudad.length; i++) {
            let x = item.departamento_ciudad[i];

            if(!arrayIdContratistas.includes(x)){
                arrayIdContratistas.push(x);
            }
            
        }

    })

    LoadDepartamentos(arrayIdContratistas);

}

/* Evaluar y generar departamentos con constratistas*/
function LoadDepartamentos(comparar){

    const departamentoTaxonomy = 'https://pintuco.com.co/wp-json/wp/v2/departamento_ciudad/?parent=0&per_page=100&_fields[]=id&_fields[]=name';

    fetch(departamentoTaxonomy)
        .then(respuesta => respuesta.json())
        .then(resultado => loadIdStates(resultado))

    //Doing Fragments
    const optionsFragment = document.createDocumentFragment();
    
       function loadIdStates(data){

        data.forEach(elementsState=>{

            const {id, name} = elementsState;           
            
            if(comparar.includes(id)){
                
            //to do nodes
                const options = document.createElement('OPTION');
                options.setAttribute("value", id);
                options.classList.add('states-value');

                options.textContent = name;
                optionsFragment.appendChild(options);
            }
        
        });

        //Print fragments
        getSelector.appendChild(optionsFragment);

    } 
}


/* Evaluar y generar ciudades con contratistas */
function LoadCiudades(ValueDepartamento, comparar){

    
    const departamentoTaxonomy = `https://pintuco.com.co/wp-json/wp/v2/departamento_ciudad/?parent=${ValueDepartamento}&per_page=100&_fields[]=id&_fields[]=name`;

    fetch(departamentoTaxonomy)
        .then(respuestaC => respuestaC.json())
        .then(resultadoC => loadIdCities(resultadoC))


    let htmlCity = `<option class="states-value" value="0">Seleccionar ciudad</option>`
    
       function loadIdCities(data){

        data.forEach(elementCities=>{

            const {id, name} = elementCities;           
            
            if(comparar.includes(id)){
                
                htmlCity += `
                    <option class="state-value" value="${id}">${name}</option>
                `
            }
        
        });

        citiesList.innerHTML = htmlCity;

    } 
}


/* On Chande Departamento*/    
getSelector.addEventListener('change', function(e){

    let valueDepartamento = e.target.value;   
    if(valueDepartamento != 0 ) {
        LoadCiudades(valueDepartamento, arrayIdContratistas);
    }else{
        let htmlCity = `<option class="states-value" value="0">Seleccionar ciudad</option>`;
        citiesList.innerHTML = htmlCity;
    }

})


/* On change ciudad */
citiesList.addEventListener('change', function(){
    createNeedslist()
})


/* Crear lista de necesidades */
function createNeedslist(){

    let ciudadValue = citiesList.value;
    urlAllContratistas = `https://pintuco.com.co/wp-json/wp/v2/contratistas?_fields[]=acf&per_page=200&departamento_ciudad=${ciudadValue}`;

    fetch(urlAllContratistas)
    .then(result => result.json())
    .then(necesidadesList => {
            getNeeds(necesidadesList);
        }
    )

    .catch(error => {
        return console.log(error)
    });

}


let contratistasNewList = []

   
function getNeeds(datos){
	let nArrayTipoNecesidad = [];
    let htmlNecesidades = `<option class="especialidad" value="0">Tipo de experto</option>`;

    datos.forEach(especialidades =>{

        let tipoNecesidad = especialidades.acf.directorio_de_contratistas.tipo_de_necesidad;
        contratistasNewList.push(especialidades);
        
        for (let i = 0; i < tipoNecesidad.length; i++) {

            let x = tipoNecesidad[i];
    
            if(!nArrayTipoNecesidad.includes(x)){
                nArrayTipoNecesidad.push(x);

            }  
        }
    })


    nArrayTipoNecesidad.forEach( necesidad =>{
        htmlNecesidades += `<option class="especialidad" value="${necesidad}">${necesidad}</option>`;
    })

    getTipoNecesidad.innerHTML = htmlNecesidades;
    getEspecialidad.innerHTML = `<option class="especialidad" value="0" >Seleccionar especialidad</option>`

   // console.log(nArrayTipoNecesidad);

}



/* On change tipo de necesidad - crear lista especialidades */

getTipoNecesidad.addEventListener('change', function(){
	
	let especilidadArray = [];
    contratistasNewList.forEach(e=>{
		
        let tipoNecesidad = e.acf.directorio_de_contratistas.tipo_de_necesidad;
        let especialidad = e.acf.directorio_de_contratistas.especialidad;   

        if(tipoNecesidad == getTipoNecesidad.value){
            
            for (let i = 0; i < especialidad.length; i++) {

                let x = especialidad[i];
        
                if(!especilidadArray.includes(x)){    
                    especilidadArray.push(x);
                }  
            }
        }
        
    })

   
    let htmlEspecialidades = `<option class="especialidad" value="0" >Seleccionar especialidad</option>`
	
    especilidadArray.forEach(especialidad =>{
	
        htmlEspecialidades += `
        ${especialidad == 'DEMARCACIÓN URBANA' ? `<option class="especialidad" value="${especialidad}" >Demarcación Urbana</option>` : ``}
        ${especialidad == 'EXPERTO EN OBRA' ? ` <option class="especialidad" value="${especialidad}" >Experto en obra</option>` : ` `}
 		${especialidad == 'PINTURA ELECTROSTÁTICA' ? ` <option class="especialidad" value="${especialidad}" >Pintura electrostática</option>` : ` `}
      	 ${especialidad == 'MANTENIMIENTO CONSTRUCCIÓN' ? ` <option class="especialidad" value="${especialidad}" >Mantenimiento</option>` : ` `}
        ${especialidad == 'OBRA NUEVA DE CONSTRUCCIÓN' ? ` <option class="especialidad" value="${especialidad}" >Obra nueva</option>` : ` `}
        ${especialidad == 'SEÑALIZACIÓN VIAL' ? ` <option class="especialidad" value="${especialidad}" >Señalización vial</option>` : ` `}`
    })
	
    getEspecialidad.innerHTML = htmlEspecialidades;

})




/** Imprimir información por especialidad */
function loadEspecialistas(){

    let departamentoValue = getSelector.value
    let ciudadValue = citiesList.value;


    let urlAllContratistas = 'https://pintuco.com.co/wp-json/wp/v2/contratistas?_fields[]=acf&_fields[]=title&per_page=200';
	
	
    if(departamentoValue > 0){
        urlAllContratistas = `https://pintuco.com.co/wp-json/wp/v2/contratistas?_fields[]=acf&_fields[]=title&per_page=200&departamento_ciudad=${departamentoValue}`;
    }

    if(ciudadValue > 0){
        urlAllContratistas = `https://pintuco.com.co/wp-json/wp/v2/contratistas?_fields[]=acf&_fields[]=title&per_page=200&departamento_ciudad=${ciudadValue}`;
    }


    fetch(urlAllContratistas)
    .then(result => result.json())
    .then(especialidadesContratistas => {
            findEspeciality(especialidadesContratistas);
				ratingService();
        }
    )

    .catch(error => {
        return console.log(error)
    });
      
}

/* Filtrar por tipo de experto y especialidades */
function findEspeciality(datos){

    contratista = '';

    datos.forEach(especialidades =>{
        const{
            title:{
                rendered
            }, 
            acf:{
                directorio_de_contratistas:{
                    direccion,
                    celular,
                    telefono_fijo,
                    correo,
                    hoja_de_vida:{
                        title,
                        url,
                    },
                    especialidad,
                    tipo_de_necesidad,
                }
            }
        } = especialidades;

        let includeNecesidad = tipo_de_necesidad.includes(getTipoNecesidad.value);
        let includeEspecialidad = especialidad.includes(getEspecialidad.value);
        
        if( includeNecesidad && includeEspecialidad){

            createReults(rendered, especialidad, direccion, celular, telefono_fijo, correo, url, tipo_de_necesidad);
           
        } else if( getTipoNecesidad.value == 0 && includeEspecialidad ){

            createReults(rendered, especialidad, direccion, celular, telefono_fijo, correo, url, tipo_de_necesidad);

        } else if( includeNecesidad && getEspecialidad.value == 0 ){

            createReults(rendered, especialidad, direccion, celular, telefono_fijo, correo, url, tipo_de_necesidad);

        }

        getContentContratistas.innerHTML = contratista;
    });
    
}


/* Generar resultados */
let contratista = '';
function  createReults(rendered, especialidad, direccion, celular, telefono_fijo, correo, url, tipo_de_necesidad){
	
	if(especialidad.includes('MANTENIMIENTO CONSTRUCCIÓN') || especialidad.includes('OBRA NUEVA DE CONSTRUCCIÓN')){
		
		especialidad.forEach((element, index) => {
			element == 'MANTENIMIENTO CONSTRUCCIÓN' ? especialidad[index] = 'MANTENIMIENTO' : ''
			element == 'OBRA NUEVA DE CONSTRUCCIÓN' ? especialidad[index] = 'OBRA NUEVA' : ''
		});
	}
	
	const btnSurvery = `<div class="survey-contractor">
			              <p class="survey-contractor__popup-anchor">Califica su servicio</p>
			            </div>`
	
    contratista += `
    <div class="content-card-contratista">
        <div class="left-icon-contratista">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" id="Capa_1" data-name="Capa 1" viewBox="0 0 383.13 395.85"><defs><style>.cls-1{fill:none;}</style></defs><path class="cls-1" d="M286.9,376.13c.27,2.32.51,4.34.77,6.58h25.64a68.52,68.52,0,0,1-10.47-8.6Z"></path><path class="cls-1" d="M282.6,324.3c-.18-10.67-.06-21.34-.06-32,0-3,1.51-4.74,4.42-5.13a137,137,0,0,0,18.44-3.79,55.87,55.87,0,0,0-21.24-13.77c-17.81-6.72-36-12.29-54.1-18.34-.31-.11-.72.07-1.34.15-4.6,18.4-9.21,36.81-14,55.9l-14.44-17.11c-2.15,3.18-4.21,5.83-5.77,8.74a10,10,0,0,0-1.27,5.63c2.54,19,5.26,38,8,57,1,7.09,2.1,14.17,3.17,21.32h70.31c-1.85-18.85-3.7-37.57-5.59-56.66L281.77,325c1.32,13,2.59,25.51,3.89,38.35l7.93-1a77.5,77.5,0,0,1-9.7-24.77A69.15,69.15,0,0,1,282.6,324.3Z"></path><path class="cls-1" d="M198.68,17.11V69.94H186v-57H160.46v57H147.74V17.11C118.06,25.38,94,56,91.76,82.52H255C250.7,51.27,225.2,24.38,198.68,17.11Zm-64,52.78H122.49V57.52h12.16Zm89.5,0H212V57.58h12.18Z"></path><path class="cls-1" d="M76.72,108.21a35.2,35.2,0,0,0,4.24.16H265.65a31.58,31.58,0,0,0,4.24-.17,5.77,5.77,0,0,0,5.39-6c.1-3.39-1.82-5.57-5.13-6.28a20.62,20.62,0,0,0-4.24-.19H80.84a28.49,28.49,0,0,0-4.24.14,6.09,6.09,0,0,0-5.41,6.45C71.46,105.64,73.26,107.8,76.72,108.21Z"></path><path class="cls-1" d="M131.78,307.36c-4.83-19.24-9.47-37.75-14.19-56.58C99.25,257,81.33,262.58,63.7,269c-20,7.31-32.38,21.8-36.87,42.68-1.78,8.3-3,16.72-4.39,25.1-1.17,6.95-2.29,13.9-3.51,21.34l41.88,5.26c1.33-12.94,2.62-25.54,3.94-38.38l12.64,1.29-5.6,56.48H142c.15-.74.28-1.22.35-1.72,3.46-24.09,6.46-48.25,10.62-72.22,1.44-8.3-3.16-12.69-6.89-18.6Z"></path><path class="cls-1" d="M103.59,158.78c.76,12.9,6.53,24,15.51,33.26,8.35,8.61,16.88,17,25.38,25.47a19.89,19.89,0,0,0,14.65,5.9c9.28-.06,18.55-.09,27.83,0a20.85,20.85,0,0,0,15.6-6.43c8-8,16.05-16,24-24.08,8.59-8.66,14.7-19,15.89-31.07,1.3-13.27,1-26.69,1.46-40.33H103.43C103.43,134.11,102.86,146.48,103.59,158.78Z"></path><path class="cls-1" d="M77.52,142c.85,7.93,6.48,14.84,12.64,15.67v-35C81.68,125.91,76.65,133.89,77.52,142Z"></path><path class="cls-1" d="M191.77,279.89c-4.82-5.77-9.18-11.74-14.41-16.8-1.5-1.44-6.72-1.49-8.18-.07-5.3,5.16-9.73,11.21-14.45,16.88,3.79,5.7,7.43,11,10.85,16.46a7.44,7.44,0,0,1,1.17,4.57c-2.84,20.52-5.85,41-8.79,61.52-1,6.69-1.82,13.4-2.75,20.27h35.9c-.07-1.34-.05-2.37-.19-3.38-3.7-25.85-7.46-51.7-11-77.57a9.31,9.31,0,0,1,1.2-5.67C184.35,290.72,188,285.56,191.77,279.89Z"></path><path class="cls-1" d="M256.24,122.89v35c7.15-1.69,12.65-9.08,12.82-17.19A18.31,18.31,0,0,0,256.24,122.89Z"></path><path class="cls-1" d="M14.77,382.74h44c.25-2.14.5-4.24.79-6.65l-42.77-5.3C16.09,375,15.49,378.52,14.77,382.74Z"></path><path d="M71.73,120.43c-.55.89-.81,1.33-1.09,1.76-13,19.56-3.31,43.95,19.65,49.13,2.58.58,3.3,2,4,4a64,64,0,0,0,14.56,24.33q13.31,13.76,27,27.17c5.69,5.6,12.58,9,20.7,9.12q16.8.21,33.61,0c8.28-.11,15.22-3.71,21-9.41q14-13.87,27.66-28.1a57.88,57.88,0,0,0,13.1-22.09c1-3.21,2.65-4.63,5.94-5.4,19.23-4.49,29.39-25.95,20.89-43.78-1.08-2.28-2.44-4.43-3.65-6.6a4.28,4.28,0,0,1,.71-.64c9.27-4.49,13.44-11.53,12.16-20.57-1.25-8.79-7.29-14.61-17.12-16.17-2.23-.36-2.81-1.36-3.23-3.43C260,42.32,238.15,17.37,202.3,4.49c-1.72-.62-3.06-2.31-4.58-3.51l.57-1H148.12c.2.37.41.74.62,1.11-1.54,1.16-2.91,2.79-4.63,3.41-35.28,12.61-57,37.16-64.89,73.77-.7,3.27-1.58,4.66-5.11,5.12-9.93,1.3-16.92,11-15.59,21C59.58,112.32,64.35,117.27,71.73,120.43Zm18.43,37.25C84,156.85,78.37,149.94,77.52,142c-.87-8.12,4.16-16.1,12.64-19.29Zm152.33,4.16c-1.19,12.11-7.3,22.41-15.89,31.07-8,8.05-16,16-24,24.08a20.85,20.85,0,0,1-15.6,6.43c-9.28-.1-18.55-.07-27.83,0a19.89,19.89,0,0,1-14.65-5.9c-8.5-8.44-17-16.86-25.38-25.47-9-9.26-14.75-20.36-15.51-33.26-.73-12.3-.16-24.67-.16-37.27H244C243.52,135.15,243.79,148.57,242.49,161.84Zm13.75-4V122.89a18.31,18.31,0,0,1,12.82,17.76C268.89,148.76,263.39,156.15,256.24,157.84ZM147.74,17.11V69.89h12.72v-57H186v57h12.7V17.11c26.52,7.27,52,34.16,56.36,65.41H91.76C94,56,118.06,25.38,147.74,17.11ZM76.6,95.86a28.49,28.49,0,0,1,4.24-.14H265.91a20.62,20.62,0,0,1,4.24.19c3.31.71,5.23,2.89,5.13,6.28a5.77,5.77,0,0,1-5.39,6,31.58,31.58,0,0,1-4.24.17H81a35.2,35.2,0,0,1-4.24-.16c-3.46-.41-5.26-2.57-5.53-5.9A6.09,6.09,0,0,1,76.6,95.86Z"></path><path d="M122.49,69.89h12.16V57.52H122.49Z"></path><path d="M212,69.9h12.18V57.58H212Z"></path><path d="M383.13,294.11c0-5.51-.57-6.22-6-7.09a143.06,143.06,0,0,1-42-13.35,4.89,4.89,0,0,0-4.64,0c-3.88,1.94-7.83,3.68-11.82,5.25a66.91,66.91,0,0,0-27.77-20.32c-17.12-7-35-12.17-52.5-18.12-7.27-2.47-7.28-2.43-7.9-9.78,0-.22-.25-.42-.44-.75H218.15c.71,17.36-6.45,32.86-9.6,50.09-5.89-7.07-11-13.31-16.28-19.49-3.31-3.91-6.08-9.22-10.33-11.14s-10.13-.64-15.27-.4a6.91,6.91,0,0,0-4.47,2.1c-6.33,7.3-12.45,14.78-18.64,22.2-1.7,2-3.42,4-5.74,6.78-3-17.45-10.32-33-9.5-50.08H116a11.9,11.9,0,0,0-.17,2.59c.79,4.24-1.22,5.89-5.16,7.14-16.06,5.08-32,10.47-48,15.93-28.5,9.77-44.81,29.78-49.62,59.41-2.9,17.79-6,35.54-8.9,53.32C2.72,377.55,1.4,386.71,0,395.85H346.49a12.19,12.19,0,0,0,0-1.91c-.39-2.29-.76-4.58-1.14-6.86a61.15,61.15,0,0,0,6.14-3.72c18.83-13.05,29.45-31,31.31-53.83.53-6.53.08-13.14.08-19.7h.24ZM58.78,382.74h-44c.72-4.22,1.32-7.76,2-11.95l42.77,5.3C59.28,378.5,59,380.6,58.78,382.74ZM153,308.84c-4.16,24-7.16,48.13-10.62,72.22-.07.5-.2,1-.35,1.72H71.79l5.6-56.48L64.75,325c-1.32,12.84-2.61,25.44-3.94,38.38l-41.88-5.26c1.22-7.44,2.34-14.39,3.51-21.34,1.42-8.38,2.61-16.8,4.39-25.1C31.32,290.81,43.67,276.32,63.7,269c17.63-6.43,35.55-12.06,53.89-18.23,4.72,18.83,9.36,37.34,14.19,56.58l14.34-17.12C149.85,296.15,154.45,300.54,153,308.84Zm26.86-7.07c3.59,25.87,7.35,51.72,11,77.57.14,1,.12,2,.19,3.38h-35.9c.93-6.87,1.79-13.58,2.75-20.27,2.94-20.5,5.95-41,8.79-61.52a7.44,7.44,0,0,0-1.17-4.57c-3.42-5.45-7.06-10.76-10.85-16.46,4.72-5.67,9.15-11.72,14.45-16.88,1.46-1.42,6.68-1.37,8.18.07,5.23,5.06,9.59,11,14.41,16.8-3.78,5.67-7.42,10.83-10.7,16.21A9.31,9.31,0,0,0,179.87,301.77ZM281.77,325l-12.67,1.21c1.89,19.09,3.74,37.81,5.59,56.66H204.38c-1.07-7.15-2.16-14.23-3.17-21.32-2.7-19-5.42-38-8-57a10,10,0,0,1,1.27-5.63c1.56-2.91,3.62-5.56,5.77-8.74l14.44,17.11c4.78-19.09,9.39-37.5,14-55.9.62-.08,1-.26,1.34-.15,18.06,6,36.29,11.62,54.1,18.34a55.87,55.87,0,0,1,21.24,13.77A137,137,0,0,1,287,287.17c-2.91.39-4.42,2.16-4.42,5.13,0,10.66-.12,21.33.06,32a69.15,69.15,0,0,0,1.29,13.33,77.5,77.5,0,0,0,9.7,24.77l-7.93,1C284.36,350.55,283.09,338,281.77,325Zm5.9,57.67c-.26-2.24-.5-4.26-.77-6.58l15.94-2a68.52,68.52,0,0,0,10.47,8.6ZM374,324a61.75,61.75,0,0,1-30.21,53.42,65.53,65.53,0,0,1-9.58,4.71,3.36,3.36,0,0,1-2.64,0l-.07,0a70.65,70.65,0,0,1-16.51-9.5,57.74,57.74,0,0,1-11.18-11.46,65.14,65.14,0,0,1-11.42-27.9,51.81,51.81,0,0,1-.65-8.53c-.08-9.24,0-18.48,0-27.71v-1.2a159,159,0,0,0,19.75-4.67c4.22-1.29,8.38-2.77,12.47-4.41,2.69-1.09,5.37-2.23,8-3.47a2.2,2.2,0,0,1,1.69-.05A154.84,154.84,0,0,0,374,295.76v1.5C374,306.16,374,315.07,374,324Z"></path><path d="M358.25,305.8a4.82,4.82,0,0,0-4.9,1.53q-9.09,9.15-18.21,18.24l-1.87,1.87c-1.92,1.92-3.82,3.84-5.84,5.88-.42-.38-.7-.63-1-.89l-3.64-3.65c-2.26-2.25-4.51-4.49-6.75-6.75a4.79,4.79,0,0,0-4.2-1.68,4.3,4.3,0,0,0-3.7,2.95,4.44,4.44,0,0,0,1.09,4.87q7.39,7.44,14.82,14.87a4.84,4.84,0,0,0,1.22.88,4.65,4.65,0,0,0,5.52-1l6.24-6.26,22.29-22.35a13.55,13.55,0,0,0,1.27-1.36A4.54,4.54,0,0,0,358.25,305.8Z"></path></svg>

		${(tipo_de_necesidad[0] == "Aplicadores" || tipo_de_necesidad[0]== "Contratistas")?
			'<img src="https://pintuco.com.co/wp-content/uploads/2022/10/logo-socios-de-valor.png" class="img-socios-valor" >':
			''
		}

        </div>

        <div class="rigth-content-info">
            <h3 class="empresa-contratista">${rendered}</h3>
            <p class="especialidad">Especialidades: ${especialidad}</p>
            <p class="especialidad"> Dirección: ${direccion}</p>
            <p class="especialidad"> Celular: ${celular}</p>
            <p class="especialidad"> Teléfono: ${telefono_fijo}</p>
            <p class="especialidad"> Correo:
                 <span class="especialida-email"> ${correo}</span>
             </p>

            ${url != 0 ? `
            <div class="ver-hoja-de-vida"> 
               <a target="_blank" href="${url}" class="hoja-de-vida">Más información</a>
            </div>` : ` `}
              ${tipo_de_necesidad.includes("Contratistas") ? btnSurvery : "" }
			  ${tipo_de_necesidad.includes("Aplicadores") ? btnSurvery : "" }
        </div> 
    </div> 
  `
	
	//console.log(tipo_de_necesidad);
 
}


// --------------------------- Buscar ------------------------------------------------
buscarFilters.addEventListener('click', function(){
	
    let allOptions = document.querySelectorAll('.container-selector select');
    let alert = document.querySelector('.mensaje-seleccionar');
    let saveValue = ``;

    allOptions.forEach( selector =>{

        let values = selector.value
        if(values == 0){

            selector.classList.add('error-empty');
            
        }else{
            selector.classList.remove('error-empty')
        }

        saveValue =+ values
    
    } )
	
	console.log(saveValue)

    if(isNaN(saveValue)){
        loadEspecialistas();
        alert.classList.remove('display')
    }else{
        alert.classList.add('display')
    }
    
})


reloadPage.addEventListener('click', function(){
	location.reload();
})


// CALIFICAR SERVICIO FUNCTION -------------------------------------------

function ratingService(){
	
	const btnPopUp = document.querySelectorAll('.content-card-contratista');
	
	btnPopUp.forEach( element => {
		element.addEventListener( 'click', e=>{
			
			const fieldName = document.querySelector('.wpcf7-text.nombrecontratista');
			const idcontratista = document.querySelector('.wpcf7-text.idcontratista');
			let nameContractor = element.querySelector('.empresa-contratista').innerText;
			
			fieldName.value = nameContractor;

		} )
	} )
	
	
	
}

