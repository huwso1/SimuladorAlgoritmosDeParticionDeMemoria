import AlgorithmInterface from './AlgorithmInterface.js';
// Importing AlgorithmInterface from the base class
class ParticionesEstaticas extends AlgorithmInterface{

    constructor(Procesos,cronograma,mediador,particiones){
        super();
        this.Procesos=Procesos;
        this.cronograma=cronograma;
        this.mediador=mediador;
        this.particiones=particiones;
    }
    execute(clock) {
        
        this.clock=clock;
        this.mediador.ShowTime(this.clock.time);
        if(this.clock.time==this.cronograma[0].length-1){
            //Si el reloj llega al final del cronograma, se debe detener
            console.log("El reloj ha llegado al final del cronograma");
            this.clock.stop();
            return;
        }
        
        
        var processtoExecute=this.recoverProcesstoExecute();
        console.log(processtoExecute);
        //Si hay procesos a ejecutar, se debe buscar una particion para cada uno
        if(processtoExecute.length>0){
            processtoExecute.forEach((proceso)=>{
                
                
                if(!this.FindPartition(proceso)){
                    //No se encontro particion, se debe enviar mensaje al mediador
                    this.mediador.AdviseProcessCouldNotBeAssigned(proceso.nombredeproceso,this.clock.time+1);
                    console.log("Le digo al mediador que haga algo con el proceso "+proceso.nombredeproceso);
                }else{
                    //Se encontro particion, se asigna el proceso a la particion
                    console.log("no hago nada");
                }
            })
        }
        this.clock.time=this.clock.time+1;
    }
    recoverProcesstoExecute(){
        let processtoExecute=[];
        this.cronograma.forEach((processSchedule)=>{
            let processName=processSchedule[0];

            let process=this.FindProcessbyName(processName);
            
            if(processSchedule[this.clock.time+1]=="X"){
                //Si el proceso esta en ejecucion, se debe asignar a la lista de procesos a ejecutar
                if(process!=null){
                    processtoExecute.push(process);
                }
                
            }else{
                if(process!=null && process.particion!=null){
                    process.desasignarParticion();
                }
            }

        })
        return processtoExecute;
    }
    FindPartition(proceso){
        //Este algoritmo seria similar al primer ajuste
        var result=false;
        let tamano=proceso.memoriaautilizar;
        this.particiones.slice().reverse().forEach((particion)=>{
            //Si ya tiene una particion asignada retorna true
            if(proceso.particion!=null){
                result=true;
                return true;
            }
            if(!particion.ocupado && particion.tamano>=tamano && particion.nombredeparticion!="SO" && proceso.particion==null){
                console.log(proceso.nombredeproceso+" se asigna a la particion "+particion.nombredeparticion);
                //Asignar el proceso a la particion
                proceso.asignarParticion(particion);
                result=true;
                return true;
            }

        })
       
        return result;
    }
    FindProcessbyName(processName){
        
        for(let i=0;i<this.Procesos.length;i++){
            console.log(this.Procesos[i].nombredeproceso);
            if(this.Procesos[i].nombredeproceso==processName){
                console.log("se encontro el proceso"+processName)
                return this.Procesos[i];
            }
        }
        return null;
        
    }
    updateProcessTable() {
        throw new Error("Method 'updateProcessTable() ' must be implemented.");
    }
    updatePartitionsTable(){
        throw new Error("Method 'updatePartitionsTable' must be implemented.");
    }
    //Metodo para ejecutar cuando el reloj cumple un ciclo
    notify(){
        throw new Error("Method 'subscribe()' must be implemented.");
    }

}
export default ParticionesEstaticas;