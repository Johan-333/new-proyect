console.log(campers);
/* 6. selectores */
const nombreCamper = document.querySelector("#nombre");
const edadCamper = document.querySelector("#edad");
const promedioMinCamper = document.querySelector("#minimo");
const promedioMaxCamper = document.querySelector("#maximo");
const nivelCamper = document.querySelector("#nivelCampus");
const inglesCamper = document.querySelector("#nivelIngles");
const especialidadCamper = document.querySelector("#especialidad");
const expertoTecnologiaCamper = document.querySelector("#expertoTecnologia");
const buscarCamper = document.querySelector('#buscar')

/*1. llenamos dinamicamente los valores del select nombres*/

campers.forEach((opcionCampers) => {
  const opcion = document.createElement("option");
  opcion.value = opcionCampers.nombre;
  opcion.textContent = opcionCampers.nombre;
  document.querySelector("#nombre").appendChild(opcion);
});

/*2. llenar valores en el select de edades*/

const edadMax = 45;
const edadMin = edadMax - 30;

for (let i = edadMin; i <= edadMax; i++) {
  const opcionEdad = document.createElement("option");
  opcionEdad.value = i;
  opcionEdad.textContent = i;
  document.querySelector("#edad").appendChild(opcionEdad);
}
//5. objeto con los parametros de busqueda seleccionados
const parametros = {
  nombre: "",
  edad: "",
  minPromedio: "",
  maxPromedio: "",
  nivelCAmpus: "",
  nivelIngles: "",
  especialidad: "",
  expertoTecnologia: "",
};

/* 3. event listener */

document.addEventListener("DOMContentLoaded", () => {
  showCampers(campers);
  console.log(parametros);
  selectCamper();
});

/* 7. event listeners de los filtros (selects) */

nombreCamper.addEventListener("input", (e) => {
  parametros.nombre = e.target.value;
  /* console.log(parametros); */
  filtrarCamper();
});

edadCamper.addEventListener("input", (e) => {
  parametros.edad = Number(e.target.value);
  filtrarCamper();
});

promedioMinCamper.addEventListener("input", (e) => {
  parametros.minPromedio = e.target.value;
  filtrarCamper();
});

promedioMaxCamper.addEventListener("input", (e) => {
  parametros.maxPromedio = e.target.value;
  filtrarCamper();
});

nivelCamper.addEventListener("input", (e) => {
  parametros.nivelCAmpus = e.target.value;
  filtrarCamper();
});

inglesCamper.addEventListener("input", (e) => {
  parametros.nivelIngles = e.target.value;
  filtrarCamper();
});

especialidadCamper.addEventListener("input", (e) => {
  parametros.especialidad = e.target.value;
  filtrarCamper();
});

expertoTecnologiaCamper.addEventListener("input", (e) => {
  parametros.expertoTecnologia = e.target.value;
  filtrarCamper();
});

buscarCamper.addEventListener("input", (e) => {
  parametros.camperBuscar = e.target.value;
  filtrarCamper();
});

/* 4. funcion para inyectar html cards dinamicamente */

function showCampers(campers) {
  /* seleccionar elemento padre de mis hijos cards*/
  const containerCards = document.querySelector("#tarjetas");

  //limpiar

  limpiar()

  //contruccion de cada card por cada camper

  campers.forEach((camper) => {
    // destructuring
    const { imagen, nombre, detalle, edad } = camper;
    const camperHTML = document.createElement("p");
    camperHTML.innerHTML = `
        
        <div class="card" style="width: 20rem">
            <img src="img/${imagen}" class="card-img-top" alt="..." id="imgCard" />
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">
                ${edad}
                ${detalle}
              </p>
            </div>
            <ul class="list-group list-group-flush">
            <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"imagen="${imagen}">Details</a>
            <button type="button" class="btn btn-success">Success</button>
            </ul>
          </div>

        
        `;
    containerCards.appendChild(camperHTML);
  });
}

/* 8. definicion de funcion filter de alto nivel */

function filtrarCamper() {
  const resultado = campers
    .filter(filtrarNombre)
    .filter(filtrarEdad)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarNivelCampus)
    .filter(filtrarNivelIngles)
    .filter(filtrarEspecialidad)
    .filter(filtrarExpertoTecnologia)
    .filter(buscar)
  console.log(resultado);
  if(resultado.length){
    showCampers(resultado);
  }else{
    noResultado()
  }
  

}

function noResultado() {

  limpiar();


  const noResult = document.createElement("p")
  noResult.classList.add("alerta");
  noResult.appendChild(document.createTextNode("Result not found"));
  document.querySelector('#tarjetas').appendChild(noResult);
}

function filtrarNombre(camper) {
  if (parametros.nombre) {
    return camper.nombre === parametros.nombre;
  }
  return camper;
}

function filtrarEdad(camper) {
  if (parametros.edad) {
    return camper.edad === parametros.edad;
  }
  return camper;
}

function filtrarMin(camper) {
  if (parametros.minPromedio) {
    return camper.promedio >= parametros.minPromedio;
  }
  return camper;
}

function filtrarMax(camper) {
  if (parametros.maxPromedio) {
    return camper.promedio <= parametros.maxPromedio;
  }
  return camper;
}

function filtrarNivelCampus(camper) {
  if (parametros.nivelCAmpus) {
    return camper.nivelCAmpus === parametros.nivelCAmpus;
  }
  return camper;
}

function filtrarNivelIngles(camper) {
  if (parametros.nivelIngles) {
    return camper.nivelIngles === parametros.nivelIngles;
  }
  return camper;
}

function filtrarEspecialidad(camper) {
  if (parametros.especialidad) {
    return camper.especialidad === parametros.especialidad;
  }
  return camper;
}

function filtrarExpertoTecnologia(camper) {
  if (parametros.expertoTecnologia) {
    return camper.expertoTecnologia === parametros.expertoTecnologia;
  }
  return camper;
}

function limpiar() {
  let m = document.querySelectorAll("p");
  for (let n = 0; n < m.length; n++) {
    m[n].remove();
  }
}

function buscar(camper) {
  if (camper.nombre.toLowerCase().includes(parametros.camperBuscar) || parametros.camperBuscar == undefined || camper.nombre.toLowerCase().includes(parametros.camperBuscar.toLowerCase())) {
    return camper
  }
  return camper.nombre === parametros.camperBuscar
}

/* function buscar(camper) {
  if (parametros.nombre) {
    return camper.nombre == parametros.nombre;
  }
  return camper;
}
 */



const tbody = document.querySelector('tbody');
const rowModal = document.createElement('td');



function selectCamper() {
  const camperDetails = document.querySelector('#tarjetas')
  camperDetails.addEventListener("click", loadDetail)
}



function loadDetail(e) {
  const imagen = e.target.getAttribute("imagen");
  rowModal.innerHTML = `
<td>
    <img src="img/${imagen}" width="160px">

</td>




`;
  tbody.appendChild(rowModal)
}