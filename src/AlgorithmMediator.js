import ParticionesEstaticas from './algoritmos/ParticionesEstaticas.js';
import proceso from './Entidades/proceso.js';
import Clock from './algoritmos/Clock.js';
class AlgorithmMediator{
    constructor(procesosDisponibles,ProcesosDisponiblesSobreEltiempo,listadeparticiones,
        memoryprocesstable,descripciondeparticiones
    ){
        this.procesosDisponibles=procesosDisponibles;
        this.ProcesosDisponiblesSobreEltiempo=ProcesosDisponiblesSobreEltiempo;
        this.listadeparticiones=listadeparticiones;
        this.memoryprocesstable=memoryprocesstable;
        this.descripciondeparticiones=descripciondeparticiones;

    }

    ExecuteStaticPartitionAlgorithm(){
        var procesosSimplificados=[];
        this.procesosDisponibles.forEach((element) => {
            let process=new proceso(element[0],element[1],element[6]);
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
        var Algoritmo=new ParticionesEstaticas(procesosSimplificados,matrizdetiempos,this,this.listadeparticiones);
        this.reloj=new Clock(3000);
        this.reloj.start(Algoritmo.execute.bind(Algoritmo));
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

}
export default AlgorithmMediator;