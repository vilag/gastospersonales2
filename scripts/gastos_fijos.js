consulta_registros();
function consulta_registros(){

    var valores = window.location.search;
    
    var fecha_obtenida = valores.slice(4, 50);
    var fecha = moment(fecha_obtenida, 'YYYY-MM-DD').format('YYYY-MM-DD');
    //console.log(fecha);


    //var fecha=moment().format('YYYY-MM-DD');
    $.post("ajax/index.php?op=calculos_iniciales",{fecha:fecha},function(data, status)
	{
	    data = JSON.parse(data);
        //console.log(data);
        lista_reg_ci = data;
        console.log("Registros");
        console.log(lista_reg_ci);
        calculos_iniciales_pendientes(fecha);
	});
}

function calculos_iniciales_pendientes(fecha){
    console.log("calculos_iniciales_pendientes");
    console.log(fecha);
    ///var fecha=moment().format('YYYY-MM-DD');
    $.post("ajax/index.php?op=calculos_iniciales_pendientes",{fecha:fecha},function(data, status)
	{
	    data = JSON.parse(data);
        lista_egr_ci = data;
        console.log(lista_egr_ci);
        calculos_iniciales_match();
	});
}

function calculos_iniciales_match(){
    // console.log(lista_reg_ci);
    // console.log(lista_egr_ci);

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
    console.log("obtener montos");
    console.log(lista_egr_ci);

    var total = lista_egr_ci.reduce((suma, egreso) => {
    if (egreso.saldo>=0 && egreso.estatus=="aplica") {
        return suma + parseFloat(egreso.saldo); // Suma el precio si la condición se cumple
    }
    return suma; // Si no, devuelve el acumulador sin cambios
    }, 0);

    console.log("suma montos");
    console.log(total);
    var totalfixed = Number.parseFloat(total).toFixed(2);
    // console.log(totalfixed);
    // var totalformat = new Intl.NumberFormat().format(totalfixed);
    // console.log(totalformat);
    $("#sum_pendiente_gp").text("$"+totalfixed);

    listar_tablas();

}

function listar_tablas(){
    var element = document.getElementById("lista_egresos");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    var suma_montos = 0;
    var suma_pagos = 0;
    var suma_dif = 0;
   
    for (var index = 0; index < lista_egr_ci.length; index++) {

        var montotofixed = Number.parseFloat(lista_egr_ci[index].monto).toFixed(2);
        var montoformat = new Intl.NumberFormat().format(montotofixed);
        var registradotofixed = Number.parseFloat(lista_egr_ci[index].registrado).toFixed(2);
        var registradoformat = new Intl.NumberFormat().format(registradotofixed);
        var diferencia = lista_egr_ci[index].monto-lista_egr_ci[index].registrado;
        var diferenciatf = Number.parseFloat(diferencia).toFixed(2);

        if (lista_egr_ci[index].estatus=="aplica") {
            suma_montos = suma_montos + parseFloat(lista_egr_ci[index].monto);
            suma_pagos = suma_pagos + parseFloat(lista_egr_ci[index].registrado);
            // if (diferenciatf>=0) {
                suma_dif = suma_dif + parseFloat(diferenciatf);
            // }
            
            var diferencia = parseFloat(suma_montos-suma_pagos);
            var fila='<div style="width: 100%; height: 45px; margin: 2px; border-bottom: #ccc 1px solid;">'+
                '<div style="width: 20%; float: left; padding: 10px;">'+
                    '<span>'+lista_egr_ci[index].nombre+'</span>'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; text-align: right;">'+
                    '<span>$'+montotofixed+'</span>'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; text-align: right;">'+
                    '<span>$'+registradotofixed+'</span>'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; text-align: right;">'+
                    '<span>$'+diferenciatf+'</span>'+
                '</div>'+
                '<div style="width: 20%; float: left; padding: 10px; text-align: right;">'+
                    '<button style="border: none; border-radius: 10px; background-color: #1e2c53ff; color: #fff; padding: 5px;">Emparejar</button>'+
                '</div>'+
            '</div>';
            $('#lista_egresos').append(fila);
        }     
        
    }

    var suma_montostf = Number.parseFloat(suma_montos).toFixed(2);
    var suma_montosf = new Intl.NumberFormat().format(suma_montostf);
    var suma_pagostf = Number.parseFloat(suma_pagos).toFixed(2);
    var suma_pagosf = new Intl.NumberFormat().format(suma_pagostf);

    var suma_dif_tf = Number.parseFloat(suma_dif).toFixed(2);

    $("#suma_montos_vp").text("$"+suma_montostf);
    $("#suma_pagos_vp").text("$"+suma_pagostf);
    $("#suma_dif").text("$"+suma_dif_tf);
}

//var dialog_gf;

function nuevo_registro_gasto_fijo(){
    document.getElementById("form_registro_egresos").style.display="block";
    listar_gf_ant();
    return;
    dialog_gf = bootbox.dialog({
                message: '<div style="width: 100%; height: 350px;">'+
                    '<div style="width: 100%; text-align: center; padding: 5px;">'+
                        '<span>Lista de gastos fijos</span>'+ 
                    '</div>'+
                    '<div id="content_lista_gf" style="width: 100%; padding: 5px;">'+
                        
                    '</div>'+
                    // '<div style="width: 100%; padding: 5px; display: flex; flex-direction: column;">'+
                    //     '<label>Nombre</label>'+
                    //     '<input type="text" id="nombre_ingreso">'+ 
                    // '</div>'+
                    // '<div style="width: 100%; display: flex; flex-direction: column; padding: 5px;">'+
                    //     '<label>Monto</label>'+
                    //     '<input type="number" id="monto_ingreso">'+ 
                    // '</div>'+
                    // '<div style="width: 100%; display: flex; flex-direction: column; padding: 5px;">'+
                    //     '<label>Fecha</label>'+
                    //     '<input type="date" id="fecha_ingreso">'+ 
                    // '</div>'+
                    // '<div style="width: 100%; display: flex; flex-direction: column; padding: 5px;">'+
                    //     '<label>Estatus</label>'+
                    //     '<select name="" id="estatus_ingreso">'+
                    //         '<option value="pendiente">Pendiente</option>'+
                    //         '<option value="pagado">Pagado</option>'+
                    //     '</select>'+
                    // '</div>'+
                    // '<div style="width: 100%; text-align: center; padding: 15px;">'+
                    //     '<button style="margin: 2px;" onclick="guardar_ingreso();">Guardar</button>'+
                    //     '<button style="margin: 2px;" onclick="cerrar_reg_gf();">Cancelar</button>'+
                    // '</div>'+
                '</div>',
                closeButton: false
    });

    
}

// function cerrar_reg_gf(){
//     dialog_gf.modal('hide');
// }

// function buscar_fecha_gastos_fijos_ant(){

//     $.post("ajax/index.php?op=ultimo_registro_egreso",function(data, status)
// 	{
// 	    data = JSON.parse(data);

//         var dia = moment().format('DD');
//         var mes = data.mes;
//         var anio = data.anio;
//         var fecha_concat = anio+"-"+mes+"-"+dia;
//         var fecha_ant = moment(fecha_concat, 'YYYY-MM-DD').format('YYYY-MM-DD');
//         listar_gf_ant(fecha_ant)
// 	});

// }

function listar_gf_ant(){

    var element = document.getElementById("content_lista_gf");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    var fechaActual = moment();
    var mesAnterior = fechaActual.clone().subtract(1, 'months');
    var fecha_ant = moment(mesAnterior).format('YYYY-MM-DD');

    $.post("ajax/index.php?op=listar_gf_ant",{fecha_ant:fecha_ant},function(data, status)
	{
	    data = JSON.parse(data);

        console.log(data);

        var lista_egresos_ant = data;

        for (var index = 0; index < lista_egresos_ant.length; index++) {
            
            var fila='<div style="width: 100%; height: 80px; margin: 2px; border-bottom: #ccc 1px solid; float: left; padding: 0px 20px;">'+
                '<div style="width: 15%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<label>Nombre</label>'+
                    '<input type="text" id="nombre_egreso_ant'+lista_egresos_ant[index].idegreso+'" value="'+lista_egresos_ant[index].nombre+'">'+ 
                '</div>'+
                '<div style="width: 15%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<label>Monto</label>'+
                    '<input type="number" id="monto_egreso_ant'+lista_egresos_ant[index].idegreso+'" value="'+lista_egresos_ant[index].monto+'">'+ 
                '</div>'+
                '<div style="width: 15%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<label>Fecha</label>'+
                    '<input type="date" id="fecha_egreso_ant'+lista_egresos_ant[index].idegreso+'" value="'+lista_egresos_ant[index].fecha+'">'+ 
                '</div>'+
                '<div style="width: 15%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<label>Tipo</label>'+
                    '<input type="text" id="tipo_egreso_ant'+lista_egresos_ant[index].idegreso+'" value="'+lista_egresos_ant[index].tipo+'">'+ 
                '</div>'+
                '<div style="width: 15%; float: left; padding: 10px; display: flex; flex-direction: column;">'+
                    '<label>Estatus</label>'+
                    '<select name="" id="estatus_egreso_ant'+lista_egresos_ant[index].idegreso+'">'+
                            '<option value="aplica">Aplica</option>'+
                            '<option value="no_aplica">No aplica</option>'+
                    '</select>'+
                '</div>'+
                '<div style="width: 25%; float: left; padding: 10px; display: flex; justify-content: center; align-items: center; flex-direction: column; height: 80px;">'+
                    '<button onclick="guardar_egreso_nuevo('+lista_egresos_ant[index].idegreso+');" style="border: none; border-radius: 10px; background-color: #1e2c53ff; color: #fff; padding: 5px 10px;">Guardar</button>'+
                '</div>'+
            '</div>';
            $('#content_lista_gf').append(fila);

            $("#estatus_egreso_ant"+lista_egresos_ant[index].idegreso).val(lista_egresos_ant[index].estatus);
            
        }

            
	});
}

function ver_vista_inicial(){
    window.location.href = 'index.php';
}

function cerrar_form_registro_egresos(){
    document.getElementById("form_registro_egresos").style.display="none";
}

function guardar_egreso_nuevo(idegreso){

    var valores = window.location.search;  
    var fecha_obtenida = valores.slice(4, 50);
    var fecha = moment(fecha_obtenida, 'YYYY-MM-DD').format('YYYY-MM-DD');
    //alert(idegreso);
    var nombre_egreso_ant = $("#nombre_egreso_ant"+idegreso).val();
    var monto_egreso_ant = $("#monto_egreso_ant"+idegreso).val();
    //var fecha_egreso_ant = $("#fecha_egreso_ant"+idegreso).val();
    var tipo_egreso_ant = $("#tipo_egreso_ant"+idegreso).val();
    var estatus_egreso_ant = $("#estatus_egreso_ant"+idegreso).val();

    $.post("ajax/index.php?op=guardar_egreso_nuevo",{
        idegreso:idegreso,
        nombre_egreso_ant:nombre_egreso_ant,
        monto_egreso_ant:monto_egreso_ant,
        fecha:fecha,
        tipo_egreso_ant:tipo_egreso_ant,
        estatus_egreso_ant:estatus_egreso_ant
    },function(data, status)
	{
	    data = JSON.parse(data);

        bootbox.alert("Egreso guardado exitosamente.");
        listar_gf_ant();
        consulta_registros();
    });
}