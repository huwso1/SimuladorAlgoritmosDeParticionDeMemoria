class fileUtil{

    constructor(){

    }
    saveProcessasafile(herlberto){
        const text = herlberto; // Reemplazar con el texto que se quiere guardar
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "procesos.txt";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url); // Liberar el objeto URL
    }
    loadProcessfromFile(file){
        return new Promise((resolve, reject) => {
            const fileProcess=file[0];
            const reader=new FileReader();
            reader.readAsText(fileProcess);
            var procesos=[];
            reader.onload=(event)=>{
                event.target.result.split("\n").forEach((line)=>{
                    
                    if(line.trim()!==""){ //revisa que la linea no este vacia
                        procesos.push(line.split(" "));


                    }

                    
                })
                resolve(procesos);
            };
            
            reader.onerror=(error)=>{
                reject(error);
            }
        });
    }



}
export default fileUtil;