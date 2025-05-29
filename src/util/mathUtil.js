class mathUtil{
    constructor(){

    }
    calculateOSPartitionSize(osSize){
        document.getElementById("partitionSize").removeAttribute("hidden");
        let OSPartition= osSize ;
        OSPartition= (Math.log(osSize)/Math.log(2));
        if(Math.trunc(OSPartition)-OSPartition!=0){
          OSPartition=Math.pow(2,Math.trunc(OSPartition)+1);
        }else{
          OSPartition=Math.pow(2,OSPartition);
        }
        return OSPartition;
    }
}
export default mathUtil;