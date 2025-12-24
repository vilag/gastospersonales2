// var fecha=moment().format('YYYY-MM-DD');
// var hora=moment().format('HH:mm:ss');
// var fecha_hora = fecha+" "+hora;
listar_gastos();

function listar_gastos(){
    var fecha=moment().format('YYYY-MM-DD');
    $.post("ajax/index.php?op=listar_gastos",{fecha:fecha},function(data, status)
	{
		data = JSON.parse(data);
        //console.log(data);
        //return;
        //$("#cant_pedidos_enc").text(data.length);
        var element = document.getElementById("contenedor_registros");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        var lista_gastos = data;
        for (var index = 0; index < lista_gastos.length; index++) {
            var fila='<div style="width: 98%; margin: 10px; border-radius: 10px; height: 200px; box-shadow: 5px 5px 10px rgba(0,0,0,0.2); background-color: #ffffffff; position: relative;">'+
                '<div style="width: 100%; padding: 10px; height: 140px; border: #CCC 1px solid;  box-sizing: border-box">'+
                    '<div style="width: 32%; float: left; height: 40px; padding: 5px;">'+
                        '<span>Fecha/hora:</span><br>'+
                        '<span>'+lista_gastos[index].fecha_hora+'</span>'+
                    '</div>'+
                    '<div style="width: 32%; float: left; height: 40px; padding: 5px;">'+
                        '<span>Lugar:</span><br>'+
                        '<span>'+lista_gastos[index].lugar+'</span>'+
                    '</div>'+
                    '<div style="width: 32%; float: left; height: 40px; padding: 5px;">'+
                        '<span>Tipo:</span><br>'+
                        '<span>'+lista_gastos[index].tipo+'</span>'+
                    '</div>'+
                    
                    '<div style="width: 45%; float: left; height: 40px; padding: 5px;">'+
                        '<span>Monto:</span><br>'+
                        '<span>$'+lista_gastos[index].monto+'</span>'+
                    '</div>'+
                    '<div style="width: 45%; float: left; height: 40px; padding: 5px;">'+
                        '<div style="width: 100%; float: left; height: 80px; padding: 5px;">'+
                            '<span>Detalle:</span>'+
                            '<div style="width: 98%; height: 40px; overflow-y: scroll;">'+
                                '<span>'+lista_gastos[index].detalle+'</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                
                '<div style="width: 100%; padding: 10px; box-sizing: border-box; display: flex; justify-content: center; align-items: center;">'+
                    // '<div style="width: 100%; float: left; height: 80px; padding: 5px;">'+
                        '<button style="width: 100%; padding: 5px 20px; margin: 5px;" onclick="eliminar_registro('+lista_gastos[index].idregistro+');">Eliminar</button>'+
                        '<button style="width: 100%; padding: 5px 20px; margin: 5px;">Actualizar</button>'+
                    // '</div>'+
                '</div>'+
            '</div>';
            $('#contenedor_registros').append(fila);
        }
        
	});
}

function eliminar_registro(idregistro){
    $.post("ajax/index.php?op=eliminar_registro",{idregistro:idregistro},function(data, status)
	{
	    data = JSON.parse(data);

        alert("Registro borrado exitosamente!!");
        listar_gastos();
	});
}

function abrir_form_nuevo_registro(){
    document.getElementById("form_nuevo_registro").style.display="block";
}

function cerrar_form_nuevo_registro(){
    document.getElementById("form_nuevo_registro").style.display="none";
}

function mostrarlugares(){
    var lugar = document.getElementById('lugar_input').value;
    listar_lugares(lugar);  
    // if (lugar=="") {
    //     document.getElementById("content_lugares_list").style.display="none";
    // }
}

function guardar_gasto(){
    var lugar = document.getElementById('lugar_input').value;
    var monto = document.getElementById('monto_input').value;
    var tipo = document.getElementById('tipo_input').value;
    var detalle = document.getElementById('detalle_input').value;

    var fecha=moment().format('YYYY-MM-DD');
    var hora=moment().format('HH:mm:ss');
    var fecha_hora = fecha+" "+hora;

   // console.log(fecha_hora);
   // return;

    $.post("ajax/index.php?op=guardar_gasto",{lugar:lugar,monto:monto,tipo:tipo,detalle:detalle,fecha_hora:fecha_hora},function(data, status)
	{
	    data = JSON.parse(data);

        $("#lugar_input").val("");
        $("#monto_input").val("");
        $("#tipo_input").val("");
        $("#detalle_input").val("");
        document.getElementById("form_nuevo_registro").style.display="none";
        alert("Registro guardado exitosamente!!");
        listar_gastos();
	});
}

function listar_lugares(lugar){
    $.post("ajax/index.php?op=listar_lugares",{lugar:lugar},function(data, status)
	{
		data = JSON.parse(data);
        console.log(data);
        //return;
        //$("#cant_pedidos_enc").text(data.length);
        var element = document.getElementById("content_lugares_list");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        var lugares_lista = data;
        for (var index = 0; index < lugares_lista.length; index++) {
            var fila='<div onclick="seleccionar_lugar('+index+');" style="width: 100%; height: 30px; padding: 5px; border-bottom: #ccc 1px solid; box-sizing: border-box">'+
                    '<span id="span_lugar'+index+'">'+lugares_lista[index].lugar+'</span>'+              
                '</div>';
            $('#content_lugares_list').append(fila);
        }

        var lugar = document.getElementById('lugar_input').value;

        if (lugares_lista.length>0 && lugar!="") {
            document.getElementById("content_lugares_list").style.display="block"; 
        }else{
            document.getElementById("content_lugares_list").style.display="none";
        }
        
	});
}

function seleccionar_lugar(index){
    var lugar_select = $("#span_lugar"+index).text();
    $("#lugar_input").val(lugar_select);
    document.getElementById("content_lugares_list").style.display="none";
}

function mostrartipos(){
    var tipos = document.getElementById('tipo_input').value;
    console.log(tipos);
    listar_tipos(tipos);  
}

function listar_tipos(tipos){
    $.post("ajax/index.php?op=listar_tipos",{tipos:tipos},function(data, status)
	{
		data = JSON.parse(data)
        console.log(data);
        //return;
        //$("#cant_pedidos_enc").text(data.length);
        var element = document.getElementById("content_tipos_list");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        var tipos_lista = data;
        for (var index = 0; index < tipos_lista.length; index++) {
            var fila='<div onclick="seleccionar_tipo('+index+');" style="width: 100%; height: 30px; padding: 5px; border-bottom: #ccc 1px solid; box-sizing: border-box">'+
                    '<span id="span_tipo'+index+'">'+tipos_lista[index].tipo+'</span>'+              
                '</div>';
            $('#content_tipos_list').append(fila);
        }

        var lugar = document.getElementById('tipo_input').value;

        if (tipos_lista.length>0 && lugar!="") {
            document.getElementById("content_tipos_list").style.display="block"; 
        }else{
            document.getElementById("content_tipos_list").style.display="none";
        }
        
	});
}

function seleccionar_tipo(index){
    var lugar_select = $("#span_tipo"+index).text();
    $("#tipo_input").val(lugar_select);
    document.getElementById("content_tipos_list").style.display="none";
}