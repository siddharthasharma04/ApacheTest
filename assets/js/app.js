var config = {
    api:{
        url:"data/mainData.json",
        type:"json"
    },
    app_root:"#main-root"
}
$(function(){
    // var cb = function(data){
    //     var a= data.map(d=>d.class).filter((v,i,arr)=>arr.indexOf(v) === i).sort((a,b)=>(a-b));
    //     var b = a.map(d=>{
    //         return {
    //             name:"Class "+d,
    //             data:data.filter(dt=>dt.class===d)
    //             .map(s=>s.section).filter((v,i,arr)=>arr.indexOf(v) === i).sort()
    //             .map((dt,ii,array)=>{
    //                 return {
    //                         name:"Section " + dt,
    //                         data: data.filter(stt=>stt.section === dt && stt.class===d)
    //                     }
                    
    //             })
    //         }
    //     });
    // }

    var renderUI = function(data){
        Shell.renderApp(data,$(config.app_root));
    }
    Shell.getApiData(config.api.url,renderUI);
    
})