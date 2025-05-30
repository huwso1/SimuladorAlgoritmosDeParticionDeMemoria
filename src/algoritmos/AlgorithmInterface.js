class AlgorithmInterface {
    constructor(Procesos,cronograma,mediador,particiones){
        if (new.target === AlgorithmInterface) {
            throw new Error("AlgorithmInterface is an abstract class and cannot be instantiated directly.");
        }
    }
    execute(clock) {
        throw new Error("Method 'execute()' must be implemented.");
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
export default AlgorithmInterface;