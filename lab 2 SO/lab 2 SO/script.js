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
  memoryMap: document.getElementById('memoryMap'),
  partitionSize: document.getElementById('partitionSize'),
  partitionCount: document.getElementById('partitionCount'),
};

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
  
  const rows = config.processes.map(process => `
    <tr>
      <td>${process.id}</td>
      <td>${process.name}</td>
      <td>${process.sizeInDisk}</td>
      <td>${process.sizeInCode}</td>
      <td>${process.initializedDataSize}</td>
      <td>${process.uninitializedDataSize}</td>
      <td>${process.initialMemory}</td>
      <td>${process.memoryToUse}</td>
      <td>${process.inKB}</td>
    </tr>
  `).join('');

  elements.availableProcessesTable.innerHTML = header + `<tbody>${rows}</tbody>`;
}


document.addEventListener('DOMContentLoaded', showAvailableProcesses);
