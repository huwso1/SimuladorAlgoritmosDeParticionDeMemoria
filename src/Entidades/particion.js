class particion{

    constructor(htmlcomponent,tamano,direcciondeinicio,nombredeparticion){
        this.nombredeparticion=nombredeparticion;
        this.htmlcomponent=htmlcomponent;
        this.tamano=tamano;
        this.direcciondeinicio=direcciondeinicio;
        this.direccionfinal=direcciondeinicio+tamano-1;
        this.ocupado=false;
        this.nombredeproceso="";
        this.htmlcomponent.textContent=nombredeparticion+"("+direcciondeinicio.toString(16)+"-"+this.direccionfinal.toString(16)+")"

    }
    AsignarProceso(nombredeproceso){
        this.ocupado=true;
        this.descripciondeparticion.PID=nombredeproceso;
        this.descripciondeparticion.LO=1;
        this.descripciondeparticioncomponent.PID.textContent=this.descripciondeparticion.PID;
        this.descripciondeparticioncomponent.LO.textContent=this.descripciondeparticion.LO;
        this.htmlcomponent.style.backgroundColor="red";
        this.htmlcomponent.textContent=this.nombredeparticion+"("+this.direcciondeinicio.toString(16)+"-"+this.direccionfinal.toString(16)+")"+nombredeproceso;
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
        if(this.ocupado!=true){
        this.descripciondeparticion={
            PID:"",
            LO:0,
            DEC:this.direcciondeinicio,
            HEX:this.direcciondeinicio.toString(16)
        }
        }
        this.descripciondeparticioncomponent={
            row:document.createElement("tr"),
            PID:document.createElement("td"),
            LO:document.createElement("td"),
            DEC:document.createElement("td"),
            HEX:document.createElement("td"),
            TAMANOkb:document.createElement("td"),
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
        if(this.ocupado==true){
            return null;
        }else{
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


}
export default particion;