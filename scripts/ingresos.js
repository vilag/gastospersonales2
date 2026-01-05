var lista_ingresos = [];
consulta_registros();
function consulta_registros(){

    var valores = window.location.search;
    
    var fecha_obtenida = valores.slice(4, 50);
    var fecha = moment(fecha_obtenida, 'YYYY-MM-DD').format('YYYY-MM-DD');
    //console.log(fecha);


    //var fecha=moment().format('YYYY-MM-DD');
    $.post("ajax/index.php?op=consulta_ingresos",{fecha:fecha},function(data, status)
	{
	    data = JSON.parse(data);
        //console.log(data);
        lista_ingresos = data;
        // console.log("Registros ingresos");
        // console.log(lista_ingresos);

        var element = document.getElementById("lista_ingresos");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        

        for (var index = 0; index < lista_ingresos.length; index++) {

            var monto = Number.parseFloat(lista_ingresos[index].monto).toFixed(2);
           
            var fila='<div style="width: 100%; height: 55px; margin: 2px; border-bottom: #ccc 1px solid;">'+
                '<div style="width: 20%; float: left; padding: 10px; text-align: center;">'+
                    '<span id="span_tipo'+lista_ingresos[index].idcapital+'">'+lista_ingresos[index].tipo+'</span>'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; text-align: center;">'+
                    '$<span id="span_monto'+lista_ingresos[index].idcapital+'">'+monto+'</span>'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; text-align: center;">'+
                    '<span id="span_fecha'+lista_ingresos[index].idcapital+'">'+lista_ingresos[index].fecha+'</span>'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; text-align: center;">'+
                    '<span id="span_estatus'+lista_ingresos[index].idcapital+'">'+lista_ingresos[index].estatus+'</span>'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; text-align: center;">'+
                    '<button onclick="actualizar_ingreso('+lista_ingresos[index].idcapital+');" style="border: none; border-radius: 5px; background-color: #0446aaff; color: #fff; padding: 5px 10px;">Actualizar</button>'+
                '</div>'+
            '</div>';
            $('#lista_ingresos').append(fila);
            
        }

	});
}

var dialog_ingreso;

function nuevo_registro_ingreso(){
     dialog_ingreso = bootbox.dialog({
                message: '<div style="width: 100%; height: 350px;">'+
                    '<div style="width: 100%; text-align: center; padding: 5px;">'+
                        '<span>Nuevo ingreso</span>'+ 
                    '</div>'+
                    '<div style="width: 100%; padding: 5px; display: flex; flex-direction: column;">'+
                        '<label>Nombre</label>'+
                        '<input type="text" id="nombre_ingreso">'+ 
                    '</div>'+
                    '<div style="width: 100%; display: flex; flex-direction: column; padding: 5px;">'+
                        '<label>Monto</label>'+
                        '<input type="number" id="monto_ingreso">'+ 
                    '</div>'+
                    '<div style="width: 100%; display: flex; flex-direction: column; padding: 5px;">'+
                        '<label>Fecha</label>'+
                        '<input type="date" id="fecha_ingreso">'+ 
                    '</div>'+
                    '<div style="width: 100%; display: flex; flex-direction: column; padding: 5px;">'+
                        '<label>Estatus</label>'+
                        '<select name="" id="estatus_ingreso">'+
                            '<option value="pendiente">Pendiente</option>'+
                            '<option value="pagado">Pagado</option>'+
                        '</select>'+
                    '</div>'+
                    '<div style="width: 100%; text-align: center; padding: 15px;">'+
                        '<button style="margin: 2px;" onclick="guardar_ingreso();">Guardar</button>'+
                        '<button style="margin: 2px;" onclick="cerrar_reg_ingreso();">Cancelar</button>'+
                    '</div>'+
                '</div>',
                closeButton: false
    });
}

function cerrar_reg_ingreso(){
    dialog_ingreso.modal('hide');
}

function guardar_ingreso(){
    //var fecha = moment().format('YYYY-MM-DD');
    var nombre_ingreso = $("#nombre_ingreso").val();
    var monto_ingreso = $("#monto_ingreso").val();
    var fecha_ingreso = $("#fecha_ingreso").val();
    var estatus_ingreso = $("#estatus_ingreso").val();

    $.post("ajax/index.php?op=guardar_ingreso",{
        nombre_ingreso:nombre_ingreso,
        monto_ingreso:monto_ingreso,
        fecha_ingreso:fecha_ingreso,
        estatus_ingreso:estatus_ingreso
    },function(data, status)
	{
	    data = JSON.parse(data);

        bootbox.alert("Ingreso registrado exitosamente.");
        cerrar_reg_ingreso();
        consulta_registros();
    });
}

var dialog_ingreso_update;
function actualizar_ingreso(idcapital){
    //alert(idcapital);
    var span_nombre = $("#span_tipo"+idcapital).text();
    var span_monto = $("#span_monto"+idcapital).text();
    var span_fecha = $("#span_fecha"+idcapital).text();
    var span_estatus = $("#span_estatus"+idcapital).text();

    dialog_ingreso_update = bootbox.dialog({
                message: '<div style="width: 100%; height: 350px;">'+
                    '<div style="width: 100%; text-align: center; padding: 5px;">'+
                        '<span>Editar ingreso</span>'+ 
                    '</div>'+
                    '<div style="width: 100%; padding: 5px; display: flex; flex-direction: column;">'+
                        '<label>Nombre</label>'+
                        '<input type="text" id="nombre_ingreso_u" value="'+span_nombre+'">'+ 
                    '</div>'+
                    '<div style="width: 100%; display: flex; flex-direction: column; padding: 5px;">'+
                        '<label>Monto</label>'+
                        '<input type="number" id="monto_ingreso_u" value="'+span_monto+'">'+ 
                    '</div>'+
                    '<div style="width: 100%; display: flex; flex-direction: column; padding: 5px;">'+
                        '<label>Fecha</label>'+
                        '<input type="date" id="fecha_ingreso_u" value="'+span_fecha+'">'+ 
                    '</div>'+
                    '<div style="width: 100%; display: flex; flex-direction: column; padding: 5px;">'+
                        '<label>Estatus</label>'+
                        '<select name="" id="estatus_ingreso_u">'+
                            '<option value="pendiente">Pendiente</option>'+
                            '<option value="pagado">Pagado</option>'+
                        '</select>'+
                    '</div>'+
                    '<div style="width: 100%; text-align: center; padding: 15px;">'+
                        '<button style="margin: 2px;" onclick="guardar_ingreso_update('+idcapital+');">Guardar</button>'+
                        '<button style="margin: 2px;" onclick="cerrar_reg_ingreso_update();">Cancelar</button>'+
                    '</div>'+
                '</div>',
                closeButton: false
    });

    $("#estatus_ingreso_u").val(span_estatus);
}

function guardar_ingreso_update(idcapital){
    //alert(idcapital);
    var nombre_ingreso = $("#nombre_ingreso_u").val();
    var monto_ingreso = $("#monto_ingreso_u").val();
    var fecha_ingreso = $("#fecha_ingreso_u").val();
    var estatus_ingreso = $("#estatus_ingreso_u").val();

    $.post("ajax/index.php?op=guardar_ingreso_update",{
        idcapital:idcapital,
        nombre_ingreso:nombre_ingreso,
        monto_ingreso:monto_ingreso,
        fecha_ingreso:fecha_ingreso,
        estatus_ingreso:estatus_ingreso
    },function(data, status)
	{
	    data = JSON.parse(data);

        bootbox.alert("Ingreso actualizado exitosamente.");
        cerrar_reg_ingreso_update();
        consulta_registros();
    });
}

function cerrar_reg_ingreso_update(){
    dialog_ingreso_update.modal('hide');
}

function ver_vista_inicial(){
    window.location.href = 'index.php';
}