consulta_registros();
function consulta_registros(){
    var fecha=moment().format('YYYY-MM-DD');
    $.post("ajax/index.php?op=calculos_iniciales",{fecha:fecha},function(data, status)
	{
	    data = JSON.parse(data);
        //console.log(data);
        lista_reg_ci = data;
        calculos_iniciales_pendientes();
	});
}

function calculos_iniciales_pendientes(){
    var fecha=moment().format('YYYY-MM-DD');
    $.post("ajax/index.php?op=calculos_iniciales_pendientes",{fecha:fecha},function(data, status)
	{
	    data = JSON.parse(data);
        lista_egr_ci = data;
        //console.log(data);
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
    $("#sum_pendiente").text("$"+total);

    listar_tablas();

}

function listar_tablas(){
    var element = document.getElementById("lista_egresos");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    var suma_montos = 0;
    var suma_pagos = 0;
   
    for (var index = 0; index < lista_egr_ci.length; index++) {

        var montotofixed = Number.parseFloat(lista_egr_ci[index].monto).toFixed(2);
        var montoformat = new Intl.NumberFormat().format(montotofixed);
        var registradotofixed = Number.parseFloat(lista_egr_ci[index].registrado).toFixed(2);
        var registradoformat = new Intl.NumberFormat().format(registradotofixed);

        if (lista_egr_ci[index].estatus=="aplica") {
            suma_montos = suma_montos + parseFloat(lista_egr_ci[index].monto);
            suma_pagos = suma_pagos + parseFloat(lista_egr_ci[index].registrado);
            var fila='<div style="width: 100%; height: 45px; margin: 2px; border-bottom: #ccc 1px solid;">'+
                '<div style="width: 30%; float: left; padding: 10px;">'+
                    '<span>'+lista_egr_ci[index].nombre+'</span>'+
                '</div>'+
                '<div style="width: 30%; float: left; padding: 10px; text-align: right;">'+
                    '<span>$'+montoformat+'</span>'+
                '</div>'+
                '<div style="width: 30%; float: left; padding: 10px; text-align: right;">'+
                    '<span>$'+registradoformat+'</span>'+
                '</div>'+
            '</div>';
            $('#lista_egresos').append(fila);
        }     
        
    }

    var suma_montostf = Number.parseFloat(suma_montos).toFixed(2);
    var suma_montosf = new Intl.NumberFormat().format(suma_montostf);
    var suma_pagostf = Number.parseFloat(suma_pagos).toFixed(2);
    var suma_pagosf = new Intl.NumberFormat().format(suma_pagostf);

    $("#suma_montos_vp").text("$"+suma_montosf);
    $("#suma_pagos_vp").text("$"+suma_pagosf);
}