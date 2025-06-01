import ParticionesEstaticas from './algoritmos/ParticionesEstaticas.js';
import proceso from './Entidades/proceso.js';
import Clock from './algoritmos/Clock.js';
import ParticionesEstaticasVariables from './algoritmos/ParticionesEstaticasVariables.js';
import ParticionesDinamicas from './algoritmos/ParticionesDinamicas.js';
import { clearMemoryMap, clearPartitionDesc } from './script.js';
import { cleanSreeSegmentsDesc } from './script.js';
import ParticionesCompactasDinamicas from './algoritmos/ParticionesCompactasDinamicas.js';
class AlgorithmMediator{
    constructor(procesosDisponibles,ProcesosDisponiblesSobreEltiempo,listadeparticiones,
        memoryprocesstable,descripciondeparticiones,metododeejecucion
    ){
        this.procesosDisponibles=procesosDisponibles;
        this.ProcesosDisponiblesSobreEltiempo=ProcesosDisponiblesSobreEltiempo;
        this.listadeparticiones=listadeparticiones;
        this.memoryprocesstable=memoryprocesstable;
        this.descripciondeparticiones=descripciondeparticiones;
        this.metododeejecucion=metododeejecucion;

    }

    ExecuteStaticPartitionAlgorithm(){
        var procesosSimplificados=[];
        this.procesosDisponibles.forEach((element) => {
            
            let process=new proceso(element[0],element[1].value,element[6].textContent);
          
            procesosSimplificados.push(process);
        });
        var matrizdetiempos=[];
        this.ProcesosDisponiblesSobreEltiempo.forEach((element) => {
            var processtimeline=[];
            let processname=element[0].textContent;
            
            processtimeline.push(processname);
            for(let i=1;i<element.length;i++){
                
                if(element[i].style.backgroundColor==="green"){
                    processtimeline.push("X");
                }else{
                    processtimeline.push("-");
                }
            }
            matrizdetiempos.push(processtimeline);
        });
        console.log(matrizdetiempos);
        if(this.metododeejecucion=="reloj"){
            var Algoritmo=new ParticionesEstaticas(procesosSimplificados,matrizdetiempos,this,this.listadeparticiones);
            this.reloj=new Clock(3000);
            this.reloj.start(Algoritmo.execute.bind(Algoritmo));
        }else{
            var Algoritmo=new ParticionesEstaticas(procesosSimplificados,matrizdetiempos,this,this.listadeparticiones);
            this.reloj=new Clock(3000);
            this.reloj.startWithKey(Algoritmo.execute.bind(Algoritmo));
        }
       
    }
    //Metodo para ejecutar el algoritmo de particiones variables
    // Este metodo es similar al anterior, pero se adapta a las particiones variables
    ExecuteVariablePartitionAlgorithm(criterio){
        // Criterio puede ser "primer ajuste", "mejor ajuste", "peor ajuste"
        var procesosSimplificados=[];
        this.procesosDisponibles.forEach((element) => {
            
            let process=new proceso(element[0],element[1].value,element[6].textContent);
            
            procesosSimplificados.push(process);
        });
        var matrizdetiempos=[];
        this.ProcesosDisponiblesSobreEltiempo.forEach((element) => {
            var processtimeline=[];
            let processname=element[0].textContent;
            
            processtimeline.push(processname);
            for(let i=1;i<element.length;i++){
                console.log(element[i].style.backgroundColor);
                if(element[i].style.backgroundColor==="green"){
                    processtimeline.push("X");
                }else{
                    processtimeline.push("-");
                }
            }
            matrizdetiempos.push(processtimeline);
        });
        console.log(matrizdetiempos);
        if(this.metododeejecucion=="reloj"){
        var Algoritmo=new ParticionesEstaticasVariables(procesosSimplificados,matrizdetiempos,this,this.listadeparticiones,criterio);
        this.reloj=new Clock(3000);
        this.reloj.start(Algoritmo.execute.bind(Algoritmo));
        }else{
            var Algoritmo=new ParticionesEstaticasVariables(procesosSimplificados,matrizdetiempos,this,this.listadeparticiones,criterio);
            this.reloj=new Clock(3000);
            this.reloj.startWithKey(Algoritmo.execute.bind(Algoritmo));
        }
    }
    ExecuteDynamicPartitionAlgorithm(criterio,tabladefragmentoslibres,cleanFragmentosLibres){
        this.tabladefragmentoslibres=tabladefragmentoslibres;
        this.cleanFragmentosLibres=cleanFragmentosLibres;
        // Criterio puede ser "primer ajuste", "mejor ajuste", "peor ajuste"
        var procesosSimplificados=[];
        this.procesosDisponibles.forEach((element) => {
            
            let process=new proceso(element[0],element[1].value,element[6].textContent);
           
            procesosSimplificados.push(process);
        });
        var matrizdetiempos=[];
        this.ProcesosDisponiblesSobreEltiempo.forEach((element) => {
            var processtimeline=[];
            let processname=element[0].textContent;
            
            processtimeline.push(processname);
            for(let i=1;i<element.length;i++){
                console.log(element[i].style.backgroundColor);
                if(element[i].style.backgroundColor==="green"){
                    processtimeline.push("X");
                }else{
                    processtimeline.push("-");
                }
            }
            matrizdetiempos.push(processtimeline);
        });
       
        if(this.metododeejecucion=="reloj"){
        var Algoritmo=new ParticionesDinamicas(procesosSimplificados,matrizdetiempos,this,this.listadeparticiones,criterio);
        this.reloj=new Clock(2000);
        this.reloj.start(Algoritmo.execute.bind(Algoritmo));
        }else{
            var Algoritmo=new ParticionesDinamicas(procesosSimplificados,matrizdetiempos,this,this.listadeparticiones,criterio);
            this.reloj=new Clock(2000);
            this.reloj.startWithKey(Algoritmo.execute.bind(Algoritmo));
        }

    }
    ExecuteDynamicCompactPartitionAlgorithm(criterio,tabladefragmentoslibres,cleanFragmentosLibres){
        this.tabladefragmentoslibres=tabladefragmentoslibres;
        this.cleanFragmentosLibres=cleanFragmentosLibres;
        // Criterio puede ser "primer ajuste", "mejor ajuste", "peor ajuste"
        var procesosSimplificados=[];
        this.procesosDisponibles.forEach((element) => {
            
            let process=new proceso(element[0],element[1].value,element[6].textContent);
            
            procesosSimplificados.push(process);
        });
        var matrizdetiempos=[];
        this.ProcesosDisponiblesSobreEltiempo.forEach((element) => {
            var processtimeline=[];
            let processname=element[0].textContent;
            
            processtimeline.push(processname);
            for(let i=1;i<element.length;i++){
                console.log(element[i].style.backgroundColor);
                if(element[i].style.backgroundColor==="green"){
                    processtimeline.push("X");
                }else{
                    processtimeline.push("-");
                }
            }
            matrizdetiempos.push(processtimeline);
        });
       
 
       if(this.metododeejecucion=="reloj"){
        var Algoritmo=new ParticionesCompactasDinamicas(procesosSimplificados,matrizdetiempos,this,this.listadeparticiones,criterio);
        this.reloj=new Clock(2000);
        this.reloj.start(Algoritmo.execute.bind(Algoritmo));
       }else{
        var Algoritmo=new ParticionesCompactasDinamicas(procesosSimplificados,matrizdetiempos,this,this.listadeparticiones,criterio);
        this.reloj=new Clock(2000);
        this.reloj.startWithKey(Algoritmo.execute.bind(Algoritmo));
       }

    }
    AdviseProcessCouldNotBeAssigned(processName,time) {
        // Notify the user that the process could not be assigned
       
        this.ProcesosDisponiblesSobreEltiempo.forEach((element) => {
            if(element[0].textContent==processName){
                element[time].style.backgroundColor = "red"; // Mark the time slot in red
                element[time].textContent = "X"; // Indicate that the process could not be assigned
            }
        })
        // You can also update the UI or log this information as needed
    }
    ShowTime(time){
        let headersrow=document.getElementById("availableProcessesTableheaders").querySelector("tr");
        headersrow.querySelectorAll("th").forEach((element,index) => {
            if(element.textContent==time+""){
                element.style.backgroundColor = "yellow"; // Highlight the current time
            }
            else{
                element.style.backgroundColor = "gray"; // Reset other times
            }
        })
    }
    DrawMemoryMap() {
        clearMemoryMap();
       
        this.listadeparticiones.slice().reverse().forEach((particion) => {
            let particionComponent=particion.htmlcomponent;
            document.getElementById("memorymapTable").insertBefore(particionComponent, document.getElementById("memorymapTable").children[2])
        });

    }
    DrawPartitionDesc() {
        clearPartitionDesc();
        this.listadeparticiones.forEach((particion) => {
            var particiondesc=particion.Generardescripciondeparticion();
            
            this.descripciondeparticiones.insertBefore(particiondesc, this.descripciondeparticiones.children[1])
            
        });

    }
    DrawFreeSegmentsDesc() {
        cleanSreeSegmentsDesc();
        this.listadeparticiones.forEach((particion) => {
            var particiondesc=particion.Generarcampodefragmentolibre();
            if(particiondesc){
                
            this.tabladefragmentoslibres.appendChild(particiondesc);
            }
        });

    }


}
export default AlgorithmMediator;