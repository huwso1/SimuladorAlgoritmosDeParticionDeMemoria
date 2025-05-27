import fileUtil from './util/fileUtil.js';

const fu=new fileUtil();
//Configuracion inicial
const config = {
    memorySize:16*1024*1024,
    osSize:1024*1024,
    headerEXE:767,
    processes:[
        {id:"p1", name: "Proceso 1", sizeInDisk: "", sizeInCode:"", initializedDataSize:"", uninitializedDataSize:"", initialMemory:"", memoryToUse:"", inKB:""},
        {id:"p2", name: "Proceso 2", sizeInDisk: "", sizeInCode:"", initializedDataSize:"", uninitializedDataSize:"", initialMemory:"", memoryToUse:"", inKB:""},
        {id:"p3", name: "Proceso 3", sizeInDisk: "", sizeInCode:"", initializedDataSize:"", uninitializedDataSize:"", initialMemory:"", memoryToUse:"", inKB:""},
        {id:"p4", name: "Proceso 4", sizeInDisk: "", sizeInCode:"", initializedDataSize:"", uninitializedDataSize:"", initialMemory:"", memoryToUse:"", inKB:""},
        {id:"p5", name: "Proceso 5", sizeInDisk: "", sizeInCode:"", initializedDataSize:"", uninitializedDataSize:"", initialMemory:"", memoryToUse:"", inKB:""},
        {id:"p6", name: "Proceso 6", sizeInDisk: "", sizeInCode:"", initializedDataSize:"", uninitializedDataSize:"", initialMemory:"", memoryToUse:"", inKB:""},
        {id:"p7", name: "Proceso 7", sizeInDisk: "", sizeInCode:"", initializedDataSize:"", uninitializedDataSize:"", initialMemory:"", memoryToUse:"", inKB:""},
        {id:"p8", name: "Proceso 8", sizeInDisk: "", sizeInCode:"", initializedDataSize:"", uninitializedDataSize:"", initialMemory:"", memoryToUse:"", inKB:""},
    ]
}

const elements = {
  availableProcessesTable: document.getElementById('availableProcessesTable'),
  memoryProcessTable: document.querySelector('#memoryProcessTable tbody'),
  memoryMap: document.getElementById('memoryMap')
};
var procesosDisponibles=[]

function showAvailableProcesses() {
    const header = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Tamaño código</th>
        <th>Tamaño datos inicializados</th>
        <th>Tamaño datos sin inicializar</th>
        <th>Memoria inicial</th>
        <th>Memoria a usar</th>
        <th>en KB</th>
      </tr>
    </thead>
  `;
  document.getElementById("procesosenmemoria").setAttribute("hidden","true");
  document.getElementById("tabladedescripciondeparticiones").setAttribute("hidden","true");
  document.getElementById("visualizaciondememoria").setAttribute("hidden","true");
 

  
}
document.getElementById("loadButton").addEventListener("change",(event)=>{
   fu.loadProcessfromFile(document.getElementById("loadButton").files).then(procesosdearchivo=>{
    clearAvailableProcessesTable();
    procesosDisponibles=[]
    
    procesosdearchivo.forEach((proceso)=>{
          console.log(proceso)
          let tr = document.createElement("tr");
          var iddeproceso = proceso[0];
          let nombredeproceso = document.createElement("input");
          let tamañodecodigo = document.createElement("input");
          let tamañodedatosinicializados = document.createElement("input");
          let tamañodedatossininicializar = document.createElement("input");
          let tamañodememoriainicial = document.createElement("label");
          let tamañodememoriaausar = document.createElement("label");
          let tamañodeenKB = document.createElement("label");
          //Asignar valores recuperados del archivo
          nombredeproceso.value=proceso[1];
          tamañodecodigo.value=proceso[2];
          tamañodedatosinicializados.value=proceso[3];
          tamañodedatossininicializar.value=proceso[4];
          tamañodememoriainicial.textContent=proceso[5];
          tamañodememoriaausar.textContent=proceso[6];
          tamañodeenKB.textContent=proceso[7];
          //Se le añaden las restricciones a los campos numericos, esto no permite introducir letras o numeros negativos.
          addRestrictions(tamañodecodigo)
          addRestrictions(tamañodedatosinicializados)
          addRestrictions(tamañodedatossininicializar)
          //Se añaden los handlers para calcular el tamaño de datos incializados, tamañodedatossininicializar, tamaño de memoriainicial y tamaño de memoriaausar, y tamaño en KB
          function CalculateSize(){
            if(nombredeproceso.value!="" && tamañodecodigo.value!="" && tamañodedatosinicializados.value!="" && tamañodedatossininicializar.value!=""){
              var memoriainicial=parseInt(tamañodecodigo.value)+parseInt(tamañodedatosinicializados.value)
              var memoriaausar=parseInt(tamañodedatossininicializar.value)+memoriainicial
              tamañodememoriainicial.textContent=memoriainicial
              tamañodememoriaausar.textContent=memoriaausar
              tamañodeenKB.textContent=memoriaausar/1024
            }
          }
          nombredeproceso.addEventListener("change",CalculateSize)
            tamañodecodigo.addEventListener("change",CalculateSize)
            tamañodedatosinicializados.addEventListener("change",CalculateSize)
            tamañodedatossininicializar.addEventListener("change",CalculateSize)
          // Se guardan los campos modificables como un arreglo en un array de procesos disponibles
          proceso.push(iddeproceso);
          proceso.push(nombredeproceso);
          proceso.push(tamañodecodigo);
          proceso.push(tamañodedatosinicializados);
          proceso.push(tamañodedatossininicializar);
          proceso.push(tamañodememoriainicial);
          proceso.push(tamañodememoriaausar);
          proceso.push(tamañodeenKB);
          
          procesosDisponibles.push(proceso);
  
          var idtd = document.createElement("td");
          idtd.appendChild(document.createTextNode(iddeproceso));
          
          var nmp = document.createElement("td");
          nmp.appendChild(nombredeproceso);
          
          var tmctd = document.createElement("td");
          tmctd.appendChild(tamañodecodigo);
          
          var tmditd = document.createElement("td");
          tmditd.appendChild(tamañodedatosinicializados);
          
          var tmdsintd = document.createElement("td");
          tmdsintd.appendChild(tamañodedatossininicializar);
          
          var tmminitialtd = document.createElement("td");
          tmminitialtd.appendChild(tamañodememoriainicial);
          
          var tmmemorytd = document.createElement("td");
          tmmemorytd.appendChild(tamañodememoriaausar);
          
          var tmenkbtd = document.createElement("td");
          tmenkbtd.appendChild(tamañodeenKB);
          
          tr.appendChild(idtd);
          tr.appendChild(nmp);
          tr.appendChild(tmctd);
          tr.appendChild(tmditd);
          tr.appendChild(tmdsintd);
          tr.appendChild(tmminitialtd);
          tr.appendChild(tmmemorytd);
          tr.appendChild(tmenkbtd);
          
          elements.availableProcessesTable.appendChild(tr);
  
    })
  });
  
})
document.getElementById("saveButton").addEventListener("click",(event)=>{
      var listadeprocesos="";
      var saltodelinea="\n";
      procesosDisponibles.forEach((proceso)=>{
        listadeprocesos+=proceso[0]+" ";
        listadeprocesos+=proceso[1].value+" ";
        listadeprocesos+=proceso[2].value+" ";
        listadeprocesos+=proceso[3].value+" ";
        listadeprocesos+=proceso[4].value+" ";
        listadeprocesos+=proceso[5].textContent+" ";
        listadeprocesos+=proceso[6].textContent+" ";
        listadeprocesos+=proceso[7].textContent+" ";
        listadeprocesos+="\n"
      })
      fu.saveProcessasafile(listadeprocesos);
      alert("Procesos guardados correctamente en el archivo.");
})
document.addEventListener('DOMContentLoaded', showAvailableProcesses);
//Funcion para generar los campos de la tabla de procesos disponibles
document.getElementById("numberOfProcesses").addEventListener("change",(event)=>{
    const numberOfProcesses = parseInt(event.target.value);
    var id=0;
    clearAvailableProcessesTable(); // Limpiar la tabla antes de agregar nuevos procesos
    procesosDisponibles=[]
    for (let i = 0; i <= numberOfProcesses; i++) {
        let proceso = [];
        let tr = document.createElement("tr");
        var iddeproceso = id;
        let nombredeproceso = document.createElement("input");
        let tamañodecodigo = document.createElement("input");
        let tamañodedatosinicializados = document.createElement("input");
        let tamañodedatossininicializar = document.createElement("input");
        let tamañodememoriainicial = document.createElement("label");
        let tamañodememoriaausar = document.createElement("label");
        let tamañodeenKB = document.createElement("label");
        //Se le añaden las restricciones a los campos numericos, esto no permite introducir letras o numeros negativos.
        addRestrictions(tamañodecodigo)
        addRestrictions(tamañodedatosinicializados)
        addRestrictions(tamañodedatossininicializar)
        //Se añaden los handlers para calcular el tamaño de datos incializados, tamañodedatossininicializar, tamaño de memoriainicial y tamaño de memoriaausar, y tamaño en KB
          function CalculateSize(){
            if(nombredeproceso.value!="" && tamañodecodigo.value!="" && tamañodedatosinicializados.value!="" && tamañodedatossininicializar.value!=""){
              var memoriainicial=parseInt(tamañodecodigo.value)+parseInt(tamañodedatosinicializados.value)
              var memoriaausar=parseInt(tamañodedatossininicializar.value)+memoriainicial
              tamañodememoriainicial.textContent=memoriainicial
              tamañodememoriaausar.textContent=memoriaausar
              tamañodeenKB.textContent=memoriaausar/1024
            }
          }
          nombredeproceso.addEventListener("change",CalculateSize)
          tamañodecodigo.addEventListener("change",CalculateSize)
          tamañodedatosinicializados.addEventListener("change",CalculateSize)
          tamañodedatossininicializar.addEventListener("change",CalculateSize)
        // Se guardan los campos modificables como un arreglo en un array de procesos disponibles
        proceso.push(iddeproceso);
        proceso.push(nombredeproceso);
        proceso.push(tamañodecodigo);
        proceso.push(tamañodedatosinicializados);
        proceso.push(tamañodedatossininicializar);
        proceso.push(tamañodememoriainicial);
        proceso.push(tamañodememoriaausar);
        proceso.push(tamañodeenKB);
        
        procesosDisponibles.push(proceso);
        
        id++;
        
        var idtd = document.createElement("td");
        idtd.appendChild(document.createTextNode(iddeproceso));
        
        var nmp = document.createElement("td");
        nmp.appendChild(nombredeproceso);
        
        var tmctd = document.createElement("td");
        tmctd.appendChild(tamañodecodigo);
        
        var tmditd = document.createElement("td");
        tmditd.appendChild(tamañodedatosinicializados);
        
        var tmdsintd = document.createElement("td");
        tmdsintd.appendChild(tamañodedatossininicializar);
        
        var tmminitialtd = document.createElement("td");
        tmminitialtd.appendChild(tamañodememoriainicial);
        
        var tmmemorytd = document.createElement("td");
        tmmemorytd.appendChild(tamañodememoriaausar);
        
        var tmenkbtd = document.createElement("td");
        tmenkbtd.appendChild(tamañodeenKB);
        
        tr.appendChild(idtd);
        tr.appendChild(nmp);
        tr.appendChild(tmctd);
        tr.appendChild(tmditd);
        tr.appendChild(tmdsintd);
        tr.appendChild(tmminitialtd);
        tr.appendChild(tmmemorytd);
        tr.appendChild(tmenkbtd);
        
        elements.availableProcessesTable.appendChild(tr);
    }
  })
  function addRestrictions(inputElement){
    inputElement.setAttribute("type","number")
    inputElement.setAttribute("min","0")
  }
  function clearAvailableProcessesTable() {
    const rows = elements.availableProcessesTable.querySelectorAll('tr');
    rows.forEach((row) => {
        if (!row.closest('thead')) {
            row.remove(); // Remove rows that are not part of the <thead>
        }
    });
}

