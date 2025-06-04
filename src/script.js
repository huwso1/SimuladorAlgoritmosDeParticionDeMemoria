import fileUtil from './util/fileUtil.js';
import mathUtil from './util/mathUtil.js';
import particion from './Entidades/particion.js';
import AlgorithmMediator from './AlgorithmMediator.js';
import particionDinamica from './Entidades/particionDinamica.js';

const fu=new fileUtil();
const mt=new mathUtil();
//Configuracion inicial
export const config = {
    memorySize:16*1024*1024,
    osSize:1024*1024,
    osPartition:0,
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
    ],
    memoryMapHeightUnit:(1660/(16*1024)) // Unidades de altura para la visualización del mapa de memoria
}

const elements = {
  availableProcessesTable: document.getElementById('availableProcessesTable'),
  memoryProcessTable: document.querySelector('#memoryProcessTable tbody'),
  memoryMap: document.getElementById('memoryMap'),
  processOverTime: document.getElementById('ProcessOverTime'),
  memoryMapbody: document.getElementById('"memorymapTablebody"')
};
var procesosDisponibles=[]
var procesosDisponiblesSobreElTiempo=[]
var listadeparticiones=[]

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
  document.getElementById("partitionSize").setAttribute("hidden","true");
 

  
}
document.getElementById("loadButton").addEventListener("change",(event)=>{
   fu.loadProcessfromFile(document.getElementById("loadButton").files).then(procesosdearchivo=>{
    clearAvailableProcessesTable();
    procesosDisponibles=[]
    
    procesosdearchivo.forEach((proceso)=>{
          var procesovisual=[]
          
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
          procesovisual.push(iddeproceso);
          procesovisual.push(nombredeproceso);
          procesovisual.push(tamañodecodigo);
          procesovisual.push(tamañodedatosinicializados);
          procesovisual.push(tamañodedatossininicializar);
          procesovisual.push(tamañodememoriainicial);
          procesovisual.push(tamañodememoriaausar);
          procesovisual.push(tamañodeenKB);
          
          procesosDisponibles.push(procesovisual);
  
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
function clearProcessinTimeTable() {
  procesosDisponiblesSobreElTiempo=[]
   const rows = elements.processOverTime.querySelectorAll('tr');
   rows.forEach((row) => {
      if (!row.closest('thead')) {
          row.remove(); // Remove rows that are not part of the <thead>
      }
  });
}
export function clearMemoryMap() {
  const rows = document.getElementById("memorymapTable").querySelectorAll('tr');
  rows.forEach((row) => {
     if (!row.closest('thead')) {
         row.remove(); // Remove rows that are not part of the <thead>
     }
 });

}
export function clearPartitionDesc() {
  const rows = document.getElementById("partitionTable").querySelectorAll('tr');
  rows.forEach((row) => {
     if (!row.closest('thead')) {
         row.remove(); // Remove rows that are not part of the <thead>
     }
 });
}
export function cleanSreeSegmentsDesc() {
  const rows = document.getElementById("tabladedefragmentoslibres").querySelectorAll('tr');
  rows.forEach((row) => {
     if (!row.closest('thead')) {
         row.remove(); // Remove rows that are not part of the <thead>
     }
 });
}
//Listener que se activa cuando la casilla del numbero de ciclos se modifica
document.getElementById("cicleNumber").addEventListener("change",generateProcessOverTimeTable)
//Funcion que genera la tabla de procesos sobre el tiempo a partir de la lista de procesos
function generateProcessOverTimeTable(){
    var cyclesinput=document.getElementById("cicleNumber");
    var processnameheader=document.createElement("th");
    var headersrow=document.createElement("tr");
    var theader=document.getElementById("availableProcessesTableheaders");
      if(theader.innerHTML){
        theader.innerHTML='';
      }
      clearProcessinTimeTable();
    
     //Se itera tantas veces como ciclos sean.
      processnameheader.textContent="Nombre de proceso";
      headersrow.appendChild(processnameheader);
     for(let i=0; i<=cyclesinput.value;i++){
        var timeth=document.createElement("th");
        timeth.textContent=""+i;
        headersrow.appendChild(timeth);
     }
     theader.appendChild(headersrow);
     //Se anaden las casillas correspondientes a los procesos
     procesosDisponibles.forEach((proceso)=>{
      let procesoSobreElTiempo=[];
      let processrow= document.createElement("tr");
      let nombredeproceso=proceso[1].value;
      let NombredeprocesoColumna=document.createElement("td");
      
      NombredeprocesoColumna.textContent=nombredeproceso;
      procesoSobreElTiempo.push(NombredeprocesoColumna);
      processrow.appendChild(NombredeprocesoColumna);

      for(let i=0; i<=cyclesinput.value;i++){
        var timecolumn=document.createElement("td");
        //Listener que hara cambiar de color a las casillas de tiempo cuando se clickean
        timecolumn.addEventListener("click",(event)=>{
          if (event.target.style.backgroundColor === "rgb(0, 128, 0)" || event.target.style.backgroundColor === "green") {
            event.target.style.backgroundColor = "white";
        } else {
            event.target.style.backgroundColor = "green";
        }
          })
          processrow.appendChild(timecolumn);
          procesoSobreElTiempo.push(timecolumn);
        timeth.textContent=""+i;
        
      }
      
      procesosDisponiblesSobreElTiempo.push(procesoSobreElTiempo);
      elements.processOverTime.appendChild(processrow)
      
      
     })

}
//Listener para el boton de agregar particion de memoria
document.getElementById("anadirparticion").addEventListener("click",generateVariablePartitions);
//Funcion que gestiona la creacion de particiones de memoria para el algoritmo de particiones variable
function generateVariablePartitions(){
  //Se obtiene el valor de la particion variable
  
  var tamanodeparticion=document.getElementById("variablePartitionSize").value*1024;
  let tabladedescripciondeparticiones=document.getElementById("partitionTable");
  var AvailableMemory=config.memorySize;
  var test=document.createElement("tr");
  test.style.height=(config.memoryMapHeightUnit*tamanodeparticion)+"px";
  var partition=new particion(test,tamanodeparticion,listadeparticiones[0].direccionfinal+1,"Particion"+listadeparticiones.length);
   //Se anade la particion a la tabla de descripcion de particiones
  tabladedescripciondeparticiones.appendChild(partition.Generardescripciondeparticion());
  document.getElementById("memorymapTable").insertBefore(partition.htmlcomponent, document.getElementById("memorymapTable").children[2]);
  listadeparticiones.unshift(partition);

  //Se calcula la memoria disponible
  listadeparticiones.forEach((partisione)=>{
    AvailableMemory=AvailableMemory-partisione.tamano;
  })
  document.getElementById("variablePartitionSize").querySelectorAll("option").forEach((option)=>{
    if(parseInt(option.value)*1024>AvailableMemory){
      option.setAttribute("disabled","true");
      const variablePartitionSize = document.getElementById("variablePartitionSize");
      const firstEnabledOption = Array.from(variablePartitionSize.options).find(option => !option.disabled);

      if (firstEnabledOption) {
        variablePartitionSize.value = firstEnabledOption.value; // Cambiar el valor del select
      }else{
        variablePartitionSize.value = ""; // Si no hay opciones habilitadas, se limpia el select
      }
    }else{
      option.removeAttribute("disabled");
    }
  })
  // Seleccionar automáticamente una opción no deshabilitada
  

  
}
//Muestra los campos necesarios para llenar la informacion que cada algoritmo necesita
function generateElementsForManagementMethod(event){
  document.getElementById("partitionSizeGroup").setAttribute("hidden",true)
  document.getElementById("variablePartitionSizeGroup").setAttribute("hidden",true);
  document.getElementById("tabladedescripciondeparticiones").setAttribute("hidden",true)
  document.getElementById("visualizaciondememoria").setAttribute("hidden","true");
 
  if(event.target.value=="fixed"){
    var pts=document.getElementById("partitionSizeGroup")
    pts.removeAttribute("hidden");
    config.osPartition=mt.calculateOSPartitionSize(config.osSize);
    
    document.getElementById("tabladedescripciondeparticiones").removeAttribute("hidden")
    

  }
  if(event.target.value=="variable"){
    
    document.getElementById("visualizaciondememoria").removeAttribute("hidden");
    listadeparticiones=[]
    document.getElementById("variablePartitionSizeGroup").removeAttribute("hidden");
    //Se crea la particion del sistema operativo
    config.osPartition=mt.calculateOSPartitionSize(config.osSize);
    document.getElementById("tabladedescripciondeparticiones").removeAttribute("hidden")
    clearPartitionDesc();
    clearMemoryMap();
    listadeparticiones.push(createOSPartition())
    document.getElementById("memorymapTable").appendChild(listadeparticiones[0].htmlcomponent);
    //Se reestablecen las opciones del campo de particiones variables
    document.getElementById("variablePartitionSize").querySelectorAll("option").forEach((option)=>{
      option.removeAttribute("disabled");
    })
    
    
  }
  if(event.target.value=="dynamic"){
    document.getElementById("visualizaciondememoria").removeAttribute("hidden");
    document.getElementById("tabladedescripciondeparticiones").removeAttribute("hidden")
    document.getElementById("tabladedefragmentoslibresdiv").removeAttribute("hidden")
    listadeparticiones=[]
        //Se crea la particion del sistema operativo
        config.osPartition=mt.calculateOSPartitionSize(config.osSize);
        clearPartitionDesc();
        clearMemoryMap();
        cleanSreeSegmentsDesc();
        //Se reestablecen las opciones del campo de particiones variables
        listadeparticiones.push(createOSPartition())
        document.getElementById("memorymapTable").appendChild(listadeparticiones[0].htmlcomponent);
        //Se crea una particion de memoria que ocupa todo el espacio restante
        let tamanodeparticion=config.memorySize-config.osPartition;
                var test=document.createElement("tr");
        test.style.height=(config.memoryMapHeightUnit*tamanodeparticion)+"px";
        var partition=new particionDinamica(test,tamanodeparticion,listadeparticiones[0].direccionfinal+1,"Particion"+listadeparticiones.length);
        //Se anade la particion a la tabla de descripcion de particiones
        document.getElementById("memorymapTable").insertBefore(partition.htmlcomponent, document.getElementById("memorymapTable").children[2]);
        document.getElementById("partitionTable").appendChild(partition.Generardescripciondeparticion());
        document.getElementById("tabladedefragmentoslibres").appendChild(partition.Generarcampodefragmentolibre());
        listadeparticiones.unshift(partition);
  }
  if(event.target.value=="dynamic-compact"){
    document.getElementById("visualizaciondememoria").removeAttribute("hidden");
    document.getElementById("tabladedescripciondeparticiones").removeAttribute("hidden")
    document.getElementById("tabladedefragmentoslibresdiv").removeAttribute("hidden")
    listadeparticiones=[]
        //Se crea la particion del sistema operativo
        config.osPartition=mt.calculateOSPartitionSize(config.osSize);
        clearPartitionDesc();
        clearMemoryMap();
        cleanSreeSegmentsDesc();
        //Se reestablecen las opciones del campo de particiones variables
        listadeparticiones.push(createOSPartition())
        document.getElementById("memorymapTable").appendChild(listadeparticiones[0].htmlcomponent);
        //Se crea una particion de memoria que ocupa todo el espacio restante
        let tamanodeparticion=config.memorySize-config.osPartition;
                var test=document.createElement("tr");
        test.style.height=(config.memoryMapHeightUnit*tamanodeparticion)+"px";
        var partition=new particionDinamica(test,tamanodeparticion,listadeparticiones[0].direccionfinal+1,"Particion"+listadeparticiones.length);
        //Se anade la particion a la tabla de descripcion de particiones
        document.getElementById("memorymapTable").insertBefore(partition.htmlcomponent, document.getElementById("memorymapTable").children[2]);
        document.getElementById("partitionTable").appendChild(partition.Generardescripciondeparticion());
        document.getElementById("tabladedefragmentoslibres").appendChild(partition.Generarcampodefragmentolibre());
        listadeparticiones.unshift(partition);
  }
}
//Listeners del campo ManagementMethod
document.getElementById("managementMethod").addEventListener("click",generateElementsForManagementMethod)
document.getElementById("managementMethod").addEventListener("change",generateElementsForManagementMethod)
//Listener del campo partition Size
document.getElementById("partitionSize").addEventListener("change",generatePartitions)
function generatePartitions(event){
  elements.memoryMap.removeAttribute("hidden");
  document.getElementById("visualizaciondememoria").removeAttribute("hidden");
  generateStaticPartitions();
  
}
function createOSPartition(){
  let OStr= document.createElement("tr");
  let tabladedescripciondeparticiones=document.getElementById("partitionTable");
  OStr.style.height=(config.memoryMapHeightUnit*config.osSize)+"px";
  let begin=0;
  var OSpartition=new particion(OStr,config.osSize,begin,"SO");
  //Se anade la particion a la tabla de descripcion de particiones
  tabladedescripciondeparticiones.appendChild(OSpartition.Generardescripciondeparticion());
  OSpartition.AsignarProceso("SO");
  return OSpartition;
}
function generateStaticPartitions(){
  clearPartitionDesc();
  clearMemoryMap();
  let tamanodeparticion=document.getElementById("partitionSize").value*1024;
  let tabladedescripciondeparticiones=document.getElementById("partitionTable");
  var AvailableMemory=config.memorySize;
   listadeparticiones=[]
  //Crear la particion del sistema operativo
  
  let OStr=createOSPartition();
  listadeparticiones.push(OStr);
  let numerodeparticiones=(config.memorySize-config.osSize)/tamanodeparticion;

  
  let memoriausada=config.osSize;
  for(let i=0;i<numerodeparticiones;i++){
  memoriausada=memoriausada+tamanodeparticion;
  if(memoriausada>config.memorySize){
    alert("este tamano de particion dejara espacio de memoria sin aprovechar");
    break
  }
  var test=document.createElement("tr");
  test.style.height=(config.memoryMapHeightUnit*tamanodeparticion)+"px";
  var partition=new particion(test,tamanodeparticion,listadeparticiones[listadeparticiones.length-1].direccionfinal+1,"Particion"+i);
   //Se anade la particion a la tabla de descripcion de particiones
  tabladedescripciondeparticiones.appendChild(partition.Generardescripciondeparticion());
  listadeparticiones.push(partition);
}
 var listaauxiliar=[];
//Se reorganizan las particiones para que aparezcan en orden
  for(let i=listadeparticiones.length-1;i>=0;i--){
    
    document.getElementById("memorymapTable").appendChild(listadeparticiones[i].htmlcomponent);
   listaauxiliar.push(listadeparticiones[i]);
  }
  listadeparticiones=listaauxiliar;
document.getElementById("memorymapTable").appendChild(OStr.htmlcomponent);

}
document.getElementById("start").addEventListener("click",()=>{
  
  if(procesosDisponibles.length>1 && listadeparticiones.length>1 && procesosDisponiblesSobreElTiempo.length>1){
    if(document.getElementById("managementMethod").value=="fixed"){
      //Se ejecuta el algoritmo de particiones estaticas
      let mediador=new AlgorithmMediator(procesosDisponibles,procesosDisponiblesSobreElTiempo,listadeparticiones,document.getElementById("memoryProcessTable"),document.getElementById("partitionTable"),document.getElementById("metododeejecucion").value);
      mediador.ExecuteStaticPartitionAlgorithm();
      document.getElementById("procesosenmemoria").removeAttribute("hidden");
    }
    if(document.getElementById("managementMethod").value=="variable"){
      //Se ejecuta el algoritmo de particiones estaticas
      let mediador=new AlgorithmMediator(procesosDisponibles,procesosDisponiblesSobreElTiempo,listadeparticiones,document.getElementById("memoryProcessTable"),document.getElementById("partitionTable"),document.getElementById("metododeejecucion").value);
      mediador.ExecuteVariablePartitionAlgorithm(document.getElementById("allocationAlgorithm").value);
      document.getElementById("procesosenmemoria").removeAttribute("hidden");
    }
    if(document.getElementById("managementMethod").value=="dynamic"){
      //Se ejecuta el algoritmo de particiones dinamicas sin compactacion
      let mediador=new AlgorithmMediator(procesosDisponibles,procesosDisponiblesSobreElTiempo,listadeparticiones,document.getElementById("memoryProcessTable"),
      document.getElementById("partitionTable"),document.getElementById("metododeejecucion").value);
      mediador.ExecuteDynamicPartitionAlgorithm(document.getElementById("allocationAlgorithm").value,document.getElementById("tabladedefragmentoslibres"),cleanSreeSegmentsDesc);
      document.getElementById("procesosenmemoria").removeAttribute("hidden");
    }
    if(document.getElementById("managementMethod").value=="dynamic-compact"){
      //Se ejecuta el algoritmo de particiones dinamicas sin compactacion
      let mediador=new AlgorithmMediator(procesosDisponibles,procesosDisponiblesSobreElTiempo,listadeparticiones,document.getElementById("memoryProcessTable"),
      document.getElementById("partitionTable"),document.getElementById("metododeejecucion").value);
      mediador.ExecuteDynamicCompactPartitionAlgorithm(document.getElementById("allocationAlgorithm").value,document.getElementById("tabladedefragmentoslibres"),cleanSreeSegmentsDesc);
      document.getElementById("procesosenmemoria").removeAttribute("hidden");
    }
  }else{
    alert("llene todos los campos necesarios para realizar la simulacion")
  }
});

