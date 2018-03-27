window.onload=function () {
    var span=document.querySelector("span");
    span.onclick=function(){
        var tr=span.parentNode.parentNode;
        var table=tr.parentNode;
        table.removeChild(tr);
    }


}