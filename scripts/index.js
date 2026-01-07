var mes_actual = moment().format('MM');
var anio_actual = moment().format('YYYY');
$("#select_mes").val(mes_actual);
$("#select_anio").val(anio_actual);
var fecha = "";
var lista_reg_ci = [];
var lista_egr_ci = [];
set_fecha_actual();

function set_fecha_actual(){

    var dia = moment().format('DD');
    var mes = $("#select_mes").val();
    var anio = $("#select_anio").val();
    var fecha_concat = anio+"-"+mes+"-"+dia;
    fecha = moment(fecha_concat, 'YYYY-MM-DD').format('YYYY-MM-DD');

    ver_vista_inicial();

}

function ver_vista_inicial(){

    //window.location.href = 'index.php';

    var dia = moment().format('DD');
    var mes = $("#select_mes").val();
    var anio = $("#select_anio").val();
    var fecha_concat = anio+"-"+mes+"-"+dia;
    fecha = moment(fecha_concat, 'YYYY-MM-DD').format('YYYY-MM-DD');

    document.getElementById("contenedor_tipos").style.display="none";
    document.getElementById("contenedor_registros").style.display="none";
    document.getElementById("estimacion").style.display="block";
    buscar_montos_iniciales();
    
}

function buscar_montos_iniciales(){
    console.log("buscar_montos_iniciales");
    console.log(fecha);
    calculos_iniciales();
    $.post("ajax/index.php?op=montos_iniciales",{fecha:fecha},function(data, status)
	{
	    data = JSON.parse(data);
        
       
        var capital_final = data.suma_ingreso-data.suma_egreso;
        var capital_final_tf = Number.parseFloat(capital_final).toFixed(2);
        
        $("#suma_ingreso").text("$"+data.suma_ingreso);
        $("#capital_final").text("$"+capital_final_tf);

        if (data.suma_ingreso==null) {
            document.getElementById("form_registro_ingresos").style.display="block";
            buscar_ultimo_registro();
        }
        
	});
}

var dialog;

function agregar_linea_ingreso_capital(fecha_ant){

    $.post("ajax/index.php?op=montos_iniciales_ant",{fecha:fecha,fecha_ant:fecha_ant},function(data, status)
	{
	    data = JSON.parse(data);
        console.log("data.existe_capital");
        console.log(data.existe_capital);
       
        var capital_final = data.suma_ingreso-data.suma_egreso;
        // $("#b_capital_inicial").text("$"+capital_final);

        if (data.existe_capital==null) {
            dialog = bootbox.dialog({
                message: '<div style="width: 100%; height: 200px;">'+
                    '<div style="width: 100%; text-align: center; padding: 15px;">'+
                        '<span>Se encontro el siguiente capital final del mes anterior: </span><b>$'+capital_final+'</b><br><br>'+
                        '<b>¿Desea guardarlo como capital inicial del mes actual?</b>'+
                    '</div>'+
                    '<div style="width: 100%; text-align: center; padding: 15px;">'+
                        '<button onclick="guardar_capital_inicial('+capital_final+');" style="margin: 2px;">Guardar</button>'+
                        '<button style="margin: 2px;" onclick="cerrar_reg_capital();">Cancelar</button>'+
                    '</div>'+
                '</div>',
                closeButton: false
            });
        }
        
	});

}

function guardar_capital_inicial(capital_final){
    // console.log(capital_final);
    // console.log(fecha);
   // return;
    $.post("ajax/index.php?op=guardar_capital_inicial",{fecha:fecha,capital_final:capital_final},function(data, status)
	{
	    data = JSON.parse(data);       
        cerrar_reg_capital();
        listar_ingresos_actual();
        buscar_montos_iniciales();
        setTimeout(() => {
            bootbox.alert("Capital inicial guardado exitosamente.");
        }, 1000);
        
	});
}

function cerrar_reg_capital(){
    dialog.modal('hide');
}

function agregar_linea_ingreso(){


            var fila='<div style="width: 100%; height: 80px; margin: 2px; border-bottom: #ccc 1px solid; display: flex; background-color: #fff;">'+
                '<div style="width: 20%; float: left; padding: 10px 10px 10px 20px; display: flex; flex-direction: column;">'+
                    '<label>Nombre:</label>'+
                    '<input type="text" value="">'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<label>Monto:</label>'+
                    '<input type="number" value="">'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<label>Fecha:</label>'+
                    '<input type="date" value="">'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; display: flex;">'+
                    '<button style="margin: 2px;">Guardar</button>'+
                    '<button style="margin: 2px;">Editar</button>'+
                    '<button style="margin: 2px;">Eliminar</button>'+
                '</div>'+
            '</div>';
            $('#content_ingresos_estimados').append(fila);
        

}

function buscar_ultimo_registro(){

    $.post("ajax/index.php?op=ultimo_registro",function(data, status)
	{
	    data = JSON.parse(data);

        var dia = data.dia;
        var mes = data.mes;
        var anio = data.anio;
        var fecha_concat = anio+"-"+mes+"-"+dia;
        var fecha_ant = moment(fecha_concat, 'YYYY-MM-DD').format('YYYY-MM-DD');
        listar_ingresos_actual();
        listar_ingresos(fecha_ant);
        agregar_linea_ingreso_capital(fecha_ant);
	});
}

function listar_ingresos_actual(){
    // console.log("fecha_ant");
    // console.log(fecha_ant);
    $.post("ajax/index.php?op=listar_ingresos_actual",{fecha:fecha},function(data, status)
	{
	    data = JSON.parse(data);
        //console.log(data);
        var lista_ingresos_ant = data;

        var element = document.getElementById("content_ingresos_estimados");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        
        for (var index = 0; index < lista_ingresos_ant.length; index++) {
           
            var fila='<div style="width: 100%; height: 90px; margin: 2px; border-bottom: #ccc 1px solid; display: flex;">'+
                '<div style="width: 30%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<span style="font-size: 13px;">Nombre:</span>'+
                    '<b style="font-size: 13px;">'+lista_ingresos_ant[index].tipo+'</b>'+
                '</div>'+
                '<div style="width: 30%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<span style="font-size: 13px;">Monto:</span>'+
                    '<b style="font-size: 13px;">$'+lista_ingresos_ant[index].monto+'</b>'+
                '</div>'+
                '<div style="width: 30%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<span style="font-size: 13px;">Fecha:</span>'+
                    '<b style="font-size: 13px;">'+lista_ingresos_ant[index].fecha+'</b>'+
                '</div>'+

            '</div>';
            $('#content_ingresos_estimados').append(fila);
            
        }
        
	});
}

function listar_ingresos(fecha_ant){
    // console.log("fecha_ant");
    // console.log(fecha_ant);
    $.post("ajax/index.php?op=listar_ingresos",{fecha_ant:fecha_ant},function(data, status)
	{
	    data = JSON.parse(data);
        //console.log(data);
        var lista_ingresos_ant = data;

        var element = document.getElementById("content_ingresos_estimados_ant");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        
        for (var index = 0; index < lista_ingresos_ant.length; index++) {
           
            var fila='<div style="width: 100%; height: 90px; margin: 2px; border-bottom: #ccc 1px solid; display: flex;">'+
                '<div style="width: 30%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<span style="font-size: 13px;">Nombre:</span>'+
                    '<b style="font-size: 13px;">'+lista_ingresos_ant[index].tipo+'</b>'+
                '</div>'+
                '<div style="width: 30%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<span style="font-size: 13px;">Monto:</span>'+
                    '<b style="font-size: 13px;">$'+lista_ingresos_ant[index].monto+'</b>'+
                '</div>'+
                '<div style="width: 30%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<span style="font-size: 13px;">Fecha:</span>'+
                    '<b style="font-size: 13px;">'+lista_ingresos_ant[index].fecha+'</b>'+
                '</div>'+

            '</div>';
            $('#content_ingresos_estimados_ant').append(fila);
            
        }
        
	});
}

function calculos_iniciales(){
    console.log("fecha en calculos_iniciales");
    console.log(fecha);

    $.post("ajax/index.php?op=calculos_iniciales",{fecha:fecha},function(data, status)
	{
	    data = JSON.parse(data);
        lista_reg_ci = data;

        //console.log(lista_reg_ci);

        var fecha_ci = moment(lista_reg_ci[0].fecha_hora, 'YYYY-MM-DD 00:00:00').format('YYYY-MM-DD');
        calculos_iniciales_pendientes(fecha_ci);
	});
}

function calculos_iniciales_pendientes(fecha){

    console.log("fecha en calculos_iniciales_pendientes");
    console.log(fecha);

    $.post("ajax/index.php?op=calculos_iniciales_pendientes",{fecha:fecha},function(data, status)
	{
	    data = JSON.parse(data);
        lista_egr_ci = data;

        //console.log(lista_egr_ci);

        calculos_iniciales_match();
	});
}

function calculos_iniciales_match(){
 
    $("#sum_pendiente").text("$0.00");

    for (var index = 0; index < lista_egr_ci.length; index++) {
        
        var total = lista_reg_ci.reduce((suma, registro) => {
        if (parseInt(registro.idegreso) == parseInt(lista_egr_ci[index].idegreso)) {
            return suma + parseFloat(registro.monto); // Suma el precio si la condición se cumple
        }
        return suma; // Si no, devuelve el acumulador sin cambios
        }, 0); // 0 es el valor inicial del acumulador

        // console.log(lista_egr_ci[index].nombre);
        // console.log(total);
        lista_egr_ci[index].registrado = total;
        lista_egr_ci[index].saldo = lista_egr_ci[index].monto-total;
        //console.log(lista_egr_ci);
        if (index==(parseInt(lista_egr_ci.length)-1)) {
            obtener_montos();
        }
    }

}

function obtener_montos(){
    // console.log("obtener montos");
    // console.log(lista_egr_ci);

    var total = lista_egr_ci.reduce((suma, egreso) => {
    if (egreso.saldo>=0 && egreso.estatus=="aplica") {
        return suma + parseFloat(egreso.saldo); // Suma el precio si la condición se cumple
    }
    return suma; // Si no, devuelve el acumulador sin cambios
    }, 0);

    // console.log("suma montos");
    // console.log(total);
    $("#sum_pendiente").text("$"+total);

}


function ver_tipos(){
    document.getElementById("contenedor_tipos").style.display="block";
    document.getElementById("contenedor_registros_list").style.display="none";
    // document.getElementById("estimacion").style.display="none";
    listar_tipos_ini();
}

function ver_registros(){
    document.getElementById("contenedor_tipos").style.display="none";
    document.getElementById("contenedor_registros").style.display="block";
    document.getElementById("contenedor_registros_list").style.display="block";
    document.getElementById("estimacion").style.display="none";
    listar_gastos();
}

function listar_tipos_ini(){

    console.log("fecha listar_tipos_ini");
    console.log(fecha);

    $.post("ajax/index.php?op=listar_tipos_ini",{fecha:fecha},function(data, status)
	{
		data = JSON.parse(data);
        console.log(data);
        var element = document.getElementById("contenedor_tipos");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        var lista_tipos_ini = data;
        for (var index = 0; index < lista_tipos_ini.length; index++) {
           
            var fila='<div style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 200px; height: 100px; margin: 10px; padding: 15px; border-radius: 10px; box-shadow: 5px 5px 10px rgba(9, 72, 207, 0.2); background-color: #ffffff; position: relative; float: left;">'+
                '<div style="text-align: center;">'+
                    '<b style="font-size: 18px;">'+lista_tipos_ini[index].tipo+'</b>'+
                '</div>'+
                '<div style="text-align: center; margin-top: 10px;">'+
                    '<span>$'+lista_tipos_ini[index].suma_tipo+'</span>'+
                '</div>'+
            '</div>';
            $('#contenedor_tipos').append(fila);
            
        }
    });
}

function listar_gastos(){
    console.log("fecha listar_gastos");
    console.log(fecha);
    $.post("ajax/index.php?op=listar_gastos",{fecha:fecha},function(data, status)
	{
		data = JSON.parse(data);

        var element = document.getElementById("contenedor_registros_list");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        var lista_gastos = data;
        var nom_egreso = "";
        for (var index = 0; index < lista_gastos.length; index++) {

            if (lista_gastos[index].nombre_egreso==null) {
                nom_egreso = "";
            }else{
                nom_egreso = lista_gastos[index].nombre_egreso;
            }

            var fila='<div class="caja_registro">'+
                '<div class="caja_detalle_registro">'+
                    '<div class="caja_detalle_registro_sup">'+
                        '<span>Fecha/hora:</span><br>'+
                        '<span id="span_fecha_hora_reg'+lista_gastos[index].idregistro+'">'+lista_gastos[index].fecha_hora+'</span>'+
                    '</div>'+
                    '<div class="caja_detalle_registro_sup">'+
                        '<span>Lugar:</span><br>'+
                        '<span id="span_lugar_reg'+lista_gastos[index].idregistro+'">'+lista_gastos[index].lugar+'</span>'+
                    '</div>'+
                    '<div class="caja_detalle_registro_sup">'+
                        '<span>Tipo:</span><br>'+
                        '<span id="span_tipo_reg'+lista_gastos[index].idregistro+'">'+lista_gastos[index].tipo+'</span>'+
                    '</div>'+
                    
                    '<div class="caja_detalle_registro_sup">'+
                        '<span>Monto:</span><br>'+
                        '<span id="span_monto_reg'+lista_gastos[index].idregistro+'">$'+lista_gastos[index].monto+'</span>'+
                    '</div>'+
                    '<div class="caja_detalle_registro_sup">'+
                        '<div style="width: 100%; float: left; height: 80px; padding: 5px 5px 5px 0px;">'+
                            '<span>Detalle:</span>'+
                            '<div style="width: 98%; height: 40px; overflow-y: scroll;">'+
                                '<span id="span_detalle_reg'+lista_gastos[index].idregistro+'">'+lista_gastos[index].detalle+'</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="caja_detalle_registro_sup" style="line-height: 35px;">'+
                        '<span>Aplica a:</span><br>'+
                        '<span style="padding: 5px 15px; background-color: #054599ff; color: #fff; border-radius: 5px;">'+nom_egreso+'</span>'+
                    '</div>'+
                '</div>'+
                
                '<div style="width: 100%; padding: 10px; box-sizing: border-box; display: flex; justify-content: center; align-items: center;">'+
                    // '<div style="width: 100%; float: left; height: 80px; padding: 5px;">'+
                        '<button style="width: 100%; padding: 5px 20px; margin: 5px;" onclick="eliminar_registro('+lista_gastos[index].idregistro+');">Eliminar</button>'+
                        '<button style="width: 100%; padding: 5px 20px; margin: 5px;" onclick="actualizar_registro('+lista_gastos[index].idregistro+');">Actualizar</button>'+
                    // '</div>'+
                '</div>'+
            '</div>';
            $('#contenedor_registros_list').append(fila);
        }
        
	});
}

function actualizar_registro(idregistro){

    $.post("ajax/index.php?op=consulta_registro",{idregistro:idregistro},function(data, status)
	{
	    data = JSON.parse(data);

        var lugar_update = data.lugar;
        var monto_update = data.monto;
        var tipo_update = data.tipo;
        var detalle_update = data.detalle;
        var aplicar_update = data.idegreso;

        $("#lugar_input").val(lugar_update);
        $("#monto_input").val(monto_update);
        $("#tipo_input").val(tipo_update);
        $("#detalle_input").val(detalle_update);
       
        abrir_form_nuevo_registro(idregistro);

        setTimeout(() => {
             $("#list_egreso").val(aplicar_update);
        }, 1000);
        
	});   
    
}

function eliminar_registro(idregistro){

    bootbox.confirm({
        message: '¿Esta seguro que desea eliminar este registro?',
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            
            if (result==true) {
                $.post("ajax/index.php?op=eliminar_registro",{idregistro:idregistro},function(data, status)
                {
                    data = JSON.parse(data);

                    bootbox.alert("Registro borrado exitosamente!!");
                    listar_gastos();
                });
            }
        }
    });

   
    
}

function abrir_form_nuevo_registro(idregistro){
    //console.log(marca);
    $("#input_update").val(idregistro);
    if (idregistro==0) {
        $("#span_titulo_modal").text("Nuevo registro");
        $("#lugar_input").val("");
        $("#monto_input").val("");
        $("#tipo_input").val("");
        $("#detalle_input").val("");
    }else{
        $("#span_titulo_modal").text("Actualizar registro");
    }
    //span_titulo_modal
    document.getElementById("form_nuevo_registro").style.display="block";
    listar_egresos();
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
    var egreso = document.getElementById('list_egreso').value;
    var idregistro = document.getElementById('input_update').value;

    var fecha=moment().format('YYYY-MM-DD');
    var hora=moment().format('HH:mm:ss');
    var fecha_hora = fecha+" "+hora;

   // console.log(fecha_hora);
   // return;

    $.post("ajax/index.php?op=guardar_gasto",{lugar:lugar,monto:monto,tipo:tipo,detalle:detalle,fecha_hora:fecha_hora,egreso:egreso,idregistro:idregistro},function(data, status)
	{
	    data = JSON.parse(data);

        $("#lugar_input").val("");
        $("#monto_input").val("");
        $("#tipo_input").val("");
        $("#detalle_input").val("");
        document.getElementById("form_nuevo_registro").style.display="none";
        bootbox.alert("Registro guardado exitosamente!!");
        ver_registros();
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

function listar_egresos(){

    $.post("ajax/index.php?op=listar_egresos",{fecha:fecha},function(data, status)
	{
		data = JSON.parse(data);
        console.log(data);
        //return;
        //$("#cant_pedidos_enc").text(data.length);
        var element = document.getElementById("list_egreso");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        var fila_ini='<option value="">Seleccionar</option>';
        $('#list_egreso').append(fila_ini);

        var egresos_lista = data;
        for (var index = 0; index < egresos_lista.length; index++) {
            var fila='<option value="'+egresos_lista[index].idegreso+'">'+egresos_lista[index].nombre+'</option>';
            $('#list_egreso').append(fila);
        }

       
        
	});
}

function ver_detalle_pendientes(){
    var dia = moment().format('DD');
    var mes = $("#select_mes").val();
    var anio = $("#select_anio").val();
    var fecha_concat = anio+"-"+mes+"-"+dia;
    var fecha_consul = moment(fecha_concat, 'YYYY-MM-DD').format('YYYY-MM-DD');

    // $("#a_pendientes").attr("href","gastos_fijos.php?id="+id_ped_tem);
    $("#a_pendientes").attr("href","gastos_fijos.php?id="+fecha_consul);
}

function validar_capital_inicial(){

    var cant_dias_max = 31;
    var fechahoy = moment(); 
    var fechahf = fechahoy.format('DD-MM-YYYY');
    var mesactual = moment().format('MM');
    console.log(fechahf);
    console.log(mesactual);

    for (var index = 1; index < cant_dias_max; index++) {
        var fechaActual = moment();
        var fechaManana = fechaActual.add(index, 'days');
        var fechamf = fechaManana.format('DD-MM-YYYY');
        console.log(fechamf);     
    }

}

function calcular_por_mes_anio(){
    set_fecha_actual();
}

function cerrar_form_registro_ingresos(){
    document.getElementById("form_registro_ingresos").style.display = "none";
}

function ver_detalle_ingresos(){
    var dia = moment().format('DD');
    var mes = $("#select_mes").val();
    var anio = $("#select_anio").val();
    var fecha_concat = anio+"-"+mes+"-"+dia;
    var fecha_consul = moment(fecha_concat, 'YYYY-MM-DD').format('YYYY-MM-DD');

    $("#a_ingresos").attr("href","ingresos.php?id="+fecha_consul);
}