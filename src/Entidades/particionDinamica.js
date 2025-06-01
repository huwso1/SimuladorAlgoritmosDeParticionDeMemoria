import particion from './particion.js';
import { config } from '../script.js';
class particionDinamica extends particion{

    constructor(htmlcomponent,tamano,direcciondeinicio,nombredeparticion){
        super(htmlcomponent,tamano,direcciondeinicio,nombredeparticion);
        this.nombredeparticion=nombredeparticion;
        this.htmlcomponent=htmlcomponent;
        this.tamano=tamano;
        this.direcciondeinicio=direcciondeinicio;
        this.direccionfinal=direcciondeinicio+tamano-1;
        this.ocupado=false;
        this.nombredeproceso="";
        this.htmlcomponent.textContent=nombredeparticion+"("+direcciondeinicio.toString(16)+"-"+this.direccionfinal.toString(16)+")"
        this.iscompacted=false;

    }
    AsignarProceso(nombredeproceso,tamanodeproceso,numerodeparticion){
        
        this.ocupado=true;
        this.descripciondeparticion.PID=nombredeproceso;
        this.descripciondeparticion.LO=1;
        this.descripciondeparticioncomponent.PID.textContent=this.descripciondeparticion.PID;
        this.descripciondeparticioncomponent.LO.textContent=this.descripciondeparticion.LO;
        //Se crea la nueva particion
        let newpartitionhtmlcomponent=document.createElement("tr");
        let newpartitionsize=parseInt(this.tamano)-parseInt(tamanodeproceso);
        newpartitionhtmlcomponent.style.height=newpartitionsize*config.memoryMapHeightUnit+"px";
        var particionNueva=new particionDinamica(newpartitionhtmlcomponent,newpartitionsize,parseInt(this.direcciondeinicio)+parseInt(tamanodeproceso),"Particion"+numerodeparticion);
        //Se actualiza la particion existente
        this.tamano=parseInt(tamanodeproceso); //Actualizamos el tamano de la particion
        this.direccionfinal=parseInt(this.direcciondeinicio)+parseInt(tamanodeproceso)-1; //Actualizamos la direccion final
        this.htmlcomponent.style.height=this.tamano*config.memoryMapHeightUnit+"px"; //Actualizamos la altura de la particion
        this.htmlcomponent.style.backgroundColor="red";
        this.htmlcomponent.textContent=this.nombredeparticion+"("+this.direcciondeinicio.toString(16)+"-"+this.direccionfinal.toString(16)+")"+nombredeproceso;
        return particionNueva;
    }
    DesasignarProceso(){
            this.ocupado=false;
            this.descripciondeparticion.PID="";
            this.descripciondeparticion.LO=0;
            this.descripciondeparticioncomponent.PID.textContent=this.descripciondeparticion.PID;
            this.descripciondeparticioncomponent.LO.textContent=this.descripciondeparticion.LO;
            this.htmlcomponent.style.backgroundColor="white";
            this.htmlcomponent.textContent=this.nombredeparticion+"("+this.direcciondeinicio.toString(16)+"-"+this.direccionfinal.toString(16)+")";
    }
    Generardescripciondeparticion(){
        if(this.ocupado!=true || this.iscompacted==true){
            //Si la particion no esta ocupada,  se genera la descripcion de la particion
            if(this.iscompacted!=true){
                //Si la particion ha sido compactada, se actualiza la direccion de inicio y final
                this.descripciondeparticion={
                    PID:"",
                    LO:0,
                    DEC:this.direcciondeinicio,
                    HEX:this.direcciondeinicio.toString(16)
                }
            }
            

        this.iscompacted=false;
        this.descripciondeparticioncomponent={
            row:document.createElement("tr"),
            PID:document.createElement("td"),
            LO:document.createElement("td"),
            DEC:document.createElement("td"),
            HEX:document.createElement("td"),
            TAMANOkb:document.createElement("td"),
        }
    }
        this.descripciondeparticioncomponent.row.appendChild( this.descripciondeparticioncomponent.PID);
        this.descripciondeparticioncomponent.row.appendChild( this.descripciondeparticioncomponent.LO);
        this.descripciondeparticioncomponent.row.appendChild( this.descripciondeparticioncomponent.DEC);
        this.descripciondeparticioncomponent.row.appendChild( this.descripciondeparticioncomponent.HEX);
        this.descripciondeparticioncomponent.row.appendChild( this.descripciondeparticioncomponent.TAMANOkb);
        this.descripciondeparticioncomponent.PID.textContent=this.descripciondeparticion.PID;
        this.descripciondeparticioncomponent.LO.textContent=this.descripciondeparticion.LO;
        this.descripciondeparticioncomponent.DEC.textContent=this.descripciondeparticion.DEC;
        this.descripciondeparticioncomponent.HEX.textContent=this.descripciondeparticion.HEX;
        this.descripciondeparticioncomponent.TAMANOkb.textContent=this.tamano/1024+" KB";
        return this.descripciondeparticioncomponent.row;
    }
    Generarcampodefragmentolibre(){
        //Este metodo genera un campo de fragmento libre para la particion dinamica
        if(this.ocupado==true && this.iscompacted==false){
            return null;
        }else{
            this.iscompacted=false;
        this.fragmentolibredesc={
            row:document.createElement("tr"),
            direcciondeinicio:document.createElement("td"),
            tamano:document.createElement("td"),
        }
        this.fragmentolibredesc.direcciondeinicio.textContent=this.direcciondeinicio.toString(16);
        this.fragmentolibredesc.tamano.textContent=this.tamano/1024+" KB";
        this.fragmentolibredesc.row.appendChild(this.fragmentolibredesc.direcciondeinicio);
        this.fragmentolibredesc.row.appendChild(this.fragmentolibredesc.tamano);
        return this.fragmentolibredesc.row;
        }
    }
    fusionarParticion(particion){
        //Fusiona la particion actual con la particion pasada como parametro
        this.tamano+=particion.tamano;
        this.direcciondeinicio=Math.min(parseInt(this.direcciondeinicio), parseInt(particion.direcciondeinicio));
        this.htmlcomponent.style.height=this.tamano*config.memoryMapHeightUnit+"px";
        this.nombredeparticion=particion.nombredeparticion;
        this.htmlcomponent.textContent=this.nombredeparticion+"("+this.direcciondeinicio.toString(16)+"-"+this.direccionfinal.toString(16)+")";
        particion.htmlcomponent.remove();
        return this;
    }
    compactarParticion(particion){
                this.iscompacted=true; //Indicamos que la particion ha sido compactada
                //Metodo para compactar la particion dinamica
                this.direcciondeinicio=parseInt(particion.direcciondeinicio);
                this.direccionfinal=parseInt(this.direcciondeinicio)+parseInt(this.tamano)-1;
                let tamanodeparticionvacia=parseInt(particion.tamano);
                let direcciondeinicioparticionvacia=parseInt(this.direccionfinal+1);
               //Se crea la nueva particion
               let newpartitionhtmlcomponent=document.createElement("tr");
               newpartitionhtmlcomponent.style.height=tamanodeparticionvacia*config.memoryMapHeightUnit+"px";
               var particionNueva=new particionDinamica(newpartitionhtmlcomponent,tamanodeparticionvacia,parseInt(direcciondeinicioparticionvacia),"ParticionD");
               //Se actualiza la particion existente
               this.htmlcomponent.style.height=this.tamano*config.memoryMapHeightUnit+"px"; //Actualizamos la altura de la particion
               this.htmlcomponent.style.backgroundColor="red";
               this.htmlcomponent.textContent=this.nombredeparticion+"("+this.direcciondeinicio.toString(16)+"-"+this.direccionfinal.toString(16)+")"+this.descripciondeparticion.PID;
               particion.htmlcomponent.remove(); //Removemos la particion pasada como parametro
               
               
               return particionNueva;
    }

}
export default particionDinamica;