
import particion from "./particion.js";
class proceso{
    constructor(id,nombredeproceso,memoriaautilizar){
        this.id=id;
        this.nombredeproceso=nombredeproceso;
        this.memoriaautilizar=memoriaautilizar;
    }
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    // Getter and Setter for nombredeproceso
    getNombreDeProceso() {
        return this.nombredeproceso;
    }

    setNombreDeProceso(nombredeproceso) {
        this.nombredeproceso = nombredeproceso;
    }

    // Getter and Setter for memoriaautilizar
    getMemoriaAUtilizar() {
        return this.memoriaautilizar;
    }
    asignarParticion(particion){
        this.particion=particion;
         this.particion.AsignarProceso(this.nombredeproceso);

    }
    asignarParticionDinamica(particion,numerodeparticion){
        this.particion=particion;
        
        return this.particion.AsignarProceso(this.nombredeproceso,this.memoriaautilizar,numerodeparticion);


    }
    desasignarParticion(){
        this.particion.DesasignarProceso();
        this.particion=null;
    }

    setMemoriaAUtilizar(memoriaautilizar) {
        this.memoriaautilizar = memoriaautilizar;
    }
    
}
export default proceso;