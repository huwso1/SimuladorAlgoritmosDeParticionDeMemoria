import AlgorithmInterface from "./AlgorithmInterface.js";

class ParticionesDinamicas extends AlgorithmInterface{
    constructor(Procesos,cronograma,mediador,particiones,criterio){
        super();
        this.Procesos=Procesos;
        this.cronograma=cronograma;
        this.mediador=mediador;
        this.particiones=particiones;
        this.criterio=criterio; // Criterio de asignación de particiones
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
        this.mergeFreePartitions();
        console.log(processtoExecute);
        //Si hay procesos a ejecutar, se debe buscar una particion para cada uno
        if(processtoExecute.length>0){
            processtoExecute.forEach((proceso)=>{
                
                var algoritmo=this.selectcriteria(this.criterio);
                //Seleccionar el algoritmo de asignación de particiones según el criterio

                if(!algoritmo(proceso)){
                    //No se encontro particion, se debe enviar mensaje al mediador
                    this.mediador.AdviseProcessCouldNotBeAssigned(proceso.nombredeproceso,this.clock.time+1);
                    console.log("Le digo al mediador que haga algo con el proceso "+proceso.nombredeproceso);
                }else{
                    //Se encontro particion, se asigna el proceso a la particion
                    console.log("no hago nada");
                }
            })
        }
        
        //Actualizar las tablas de procesos y particiones
        this.clock.time=this.clock.time+1;
    }
    //Metodo para recuperar los procesos que deben ser ejecutados en el ciclo actual
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
        this.particiones.slice().reverse().forEach((particion,index)=>{
            //Si ya tiene una particion asignada retorna true
            if(proceso.particion!=null){
                result=true;
                return true;
            }
            if(!particion.ocupado && particion.tamano>=tamano && particion.nombredeparticion!="SO" && proceso.particion==null){
                console.log(proceso.nombredeproceso+" se asigna a la particion "+particion.nombredeparticion);
                //Asignar el proceso a la particion
                var originalindex=this.particiones.length-index-1; //Obtener el indice original de la particion
                var numerodeparticion="D"
                var NuevaParticion=proceso.asignarParticionDinamica(particion,numerodeparticion);
                console.log(NuevaParticion);
                //Si se asigno una nueva particion, se debe actualizar la lista de particiones
                this.particiones.splice(originalindex, 0, NuevaParticion);
                //Actualizar vista
                this.mediador.DrawMemoryMap();
                this.mediador.DrawPartitionDesc();
                this.mediador.DrawFreeSegmentsDesc();
                result=true;
                return true;
            }

        })
       
        return result;
    }
    FindPartitionWorst(proceso){
        //Este algoritmo seria similar al peor ajuste
        var result=false;
        let tamano=proceso.memoriaautilizar;
        var particionmasgrande=null;
        var olindex=0;
        this.particiones.slice().reverse().forEach((particion,index)=>{
            //Si ya tiene una particion asignada retorna true
            if(proceso.particion!=null){
                result=true;
                return true;
            }
            if(!particion.ocupado && particion.tamano>=tamano && particion.nombredeparticion!="SO" && proceso.particion==null){
                //Si es la primera particion o es mas grande que la anterior, se asigna
                if(particionmasgrande==null || particion.tamano>particionmasgrande.tamano){
                    olindex=index;
                    particionmasgrande=particion;
                }
                
            }

        })
        if(proceso.particion==null && particionmasgrande!=null){
            console.log(proceso.nombredeproceso+" se asigna a la particion "+particionmasgrande.nombredeparticion);
            //Asignar el proceso a la particion
            var originalindex=this.particiones.length-olindex-1; //Obtener el indice original de la particion
            var numerodeparticion="D"
            var NuevaParticion=proceso.asignarParticionDinamica(particionmasgrande,numerodeparticion);
            console.log(NuevaParticion);
            //Si se asigno una nueva particion, se debe actualizar la lista de particiones
            this.particiones.splice(originalindex, 0, NuevaParticion);
            //Actualizar vista
            this.mediador.DrawMemoryMap();
            this.mediador.DrawPartitionDesc();
            this.mediador.DrawFreeSegmentsDesc();
            result=true;
            return true;
        }
       
        return result;
    }
    FindPartitionBest(proceso){
        //Este algoritmo seria similar al Mejor ajuste
        var result=false;
        let tamano=proceso.memoriaautilizar;
        var particionmaspequena=null;
        var olindex=0;
        this.particiones.slice().reverse().forEach((particion,index)=>{
            //Si ya tiene una particion asignada retorna true
            if(proceso.particion!=null){
                result=true;
                return true;
            }
            if(!particion.ocupado && particion.tamano>=tamano && particion.nombredeparticion!="SO" && proceso.particion==null){
                //Si es la primera particion o es mas grande que la anterior, se asigna
                if(particionmaspequena==null || particion.tamano<particionmaspequena.tamano){
                     olindex=index;
                    particionmaspequena=particion;
                }
            }

        })
        if(proceso.particion==null && particionmaspequena!=null){
            console.log(proceso.nombredeproceso+" se asigna a la particion "+particionmaspequena.nombredeparticion);
            
            //Asignar el proceso a la particion
            var originalindex=this.particiones.length-olindex-1; //Obtener el indice original de la particion
            var numerodeparticion="D"
            var NuevaParticion=proceso.asignarParticionDinamica(particionmaspequena,numerodeparticion);
            console.log(NuevaParticion);
            //Si se asigno una nueva particion, se debe actualizar la lista de particiones
            this.particiones.splice(originalindex, 0, NuevaParticion);
            //Actualizar vista
            this.mediador.DrawMemoryMap();
            this.mediador.DrawPartitionDesc();
            this.mediador.DrawFreeSegmentsDesc();
            result=true;
            return true;
        }
       
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
    selectcriteria(criterio){
        switch(criterio) {
            case 'first-fit':
                return this.FindPartition.bind(this);
            case 'worst-fit':
                return this.FindPartitionWorst.bind(this);
            case 'best-fit':
                return this.FindPartitionBest.bind(this);
            default:
                throw new Error("Criterio de asignación no válido");
        }
    }
    //Fusionar particiones adyacentes libres
    mergeFreePartitions() {
        while(this.existPartitionsToMerge()) {
            
        
        this.particiones.forEach((particion, index) => {
            const siguienteParticion = this.particiones[index + 1]; // Accede al siguiente elemento
            if (siguienteParticion) {
                if( !particion.ocupado && !siguienteParticion.ocupado) {
                    //Si ambas particiones estan libres, las fusionamos
                    particion.fusionarParticion(siguienteParticion);
                    this.particiones.splice(index+1,1);
                    console.log(this.particiones);
                }
                this.mediador.DrawMemoryMap();
                this.mediador.DrawPartitionDesc();
                this.mediador.DrawFreeSegmentsDesc();
            }
        });
            }       
 
        
    }
    existPartitionsToMerge(){
        //Verifica si hay particiones adyacentes libres
        for(let i=0;i<this.particiones.length;i++){
            if(!this.particiones[i].ocupado && !this.particiones[i+1].ocupado){
                return true;
            }
        }
        return false;
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
export default ParticionesDinamicas;