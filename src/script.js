

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
const procesosDisponibles=[]

function showAvailableProcesses() {
    const header = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Tamaño en disco</th>
        <th>Tamaño código</th>
        <th>Tamaño datos inicializados</th>
        <th>Tamaño datos sin inicializar</th>
        <th>Memoria inicial</th>
        <th>Memoria a usar</th>
        <th>en KB</th>
      </tr>
    </thead>
  `;
  
 

  
}

document.addEventListener('DOMContentLoaded', showAvailableProcesses);
//Funcion para generar los campos de la tabla de procesos disponibles
document.getElementById("numberOfProcesses").addEventListener("change",(event)=>{
    const numberOfProcesses = parseInt(event.target.value);
    var id=0;
    let rows = "";
    var procesos=[]
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

