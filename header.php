<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Last-Modified" content="0">
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <title>Gastos Personales</title>
    <link rel="stylesheet" href="css/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
   
</head>
<body style="margin: 0px; padding: 0px;">
    <div style="width: 100%;">
        <div id="form_nuevo_registro" style="display: none; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5); position: fixed; z-index: 2;">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                <div style="width: 80%; height: 600px; border-radius: 10px; background-color: #ffffff; margin-top: 30px;">
                    <div style="width: 100%; height: 20px; text-align: right; padding-top: 10px; padding-right: 10px; box-sizing: border-box">
                        <span style="cursor: pointer;" onclick="cerrar_form_nuevo_registro();">X</span>
                    </div>
                    <div style="width: 100%; text-align: center;">
                        <span id="span_titulo_modal">Nuevo Gasto</span>
                    </div>
                    <div style="width: 100%;">
                        <div style="width: 100%; display: flex; flex-direction: column; padding: 10px 20px; box-sizing: border-box">
                            <label>Lugar</label>
                            <input id="lugar_input" type="text" style="height: 30px;" onkeyup="mostrarlugares();">
                            <input type="hidden" value="0" id="input_update">
                            <div id="content_lugares_list" style="display: none; width: 300px; height: 200px; position: absolute; background-color: #ffffff; box-sizing: border-box; margin-top: 53px; box-shadow: 5px 5px 10px rgba(0,0,0,0.2);">
                            </div>
                        </div>
                        <div style="width: 100%; display: flex; flex-direction: column; padding: 10px 20px; box-sizing: border-box">
                            <label>Monto</label>
                            <input id="monto_input" type="text" style="height: 30px;">
                        </div>
                        <div style="width: 100%; display: flex; flex-direction: column; padding: 10px 20px; box-sizing: border-box">
                            <label>Tipo</label>
                            <input id="tipo_input" type="text" style="height: 30px;" onkeyup="mostrartipos();">
                            <div id="content_tipos_list" style="display: none; width: 300px; height: 200px; position: absolute; background-color: #ffffff; box-sizing: border-box; margin-top: 53px; box-shadow: 5px 5px 10px rgba(0,0,0,0.2);">
                            </div>
                        </div>
                        <div style="width: 100%; display: flex; flex-direction: column; padding: 10px 20px; box-sizing: border-box">
                            <label>Detalle</label>
                            <input id="detalle_input" type="text" style="height: 30px;">
                        </div>
                        <div style="width: 100%; display: flex; flex-direction: column; padding: 10px 20px; box-sizing: border-box">
                            <label>Aplicar a:</label>
                            <Select id="list_egreso" style="height: 30px;">
                                
                            </Select>
                        </div>
                        <div style="width: 100%; display: flex; flex-direction: column; padding: 10px 20px; box-sizing: border-box; margin-top: 20px;">
                            <button id="btn_guardar" style="padding: 10px; cursor: pointer; margin: 5px 0px;" onclick="guardar_gasto();">Guardar</button>
                            <button id="btn_cerrar" style="padding: 10px; cursor: pointer; margin: 5px 0px;" onclick="cerrar_form_nuevo_registro();">Cancelar</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div id="form_registro_ingresos" style="display: none; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5); position: fixed; z-index: 2;">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                <div style="width: 80%; height: 600px; border-radius: 10px; background-color: #ffffff; margin-top: 30px;">
                    <div style="width: 100%; height: 20px; text-align: right; padding-top: 10px; padding-right: 10px; box-sizing: border-box">
                        <span style="cursor: pointer;" onclick="cerrar_form_registro_ingresos();">X</span>
                    </div>
                    <div style="width: 100%; text-align: center;">
                        <span id="span_titulo_modal">Ingreso estimado</span>
                    </div>
                    <div style="width: 100%;">
                        <div style="width: 100%; padding: 10px 10px 10px 20px;">
                            <button onclick="agregar_linea_ingreso();">Nuevo</button>
                        </div>
                        <div style="width: 60%; float: left; background-color: #f3f3f3ff;">
                            <div style="width: 100%; padding: 20px;">
                                <span>Mes actual</span>
                                <!-- <br><span>Capital Inicial:</span>&nbsp;<b id="b_capital_inicial"></b> -->
                            </div>
                            <div style="width: 100%; overflow-y: scroll; height: 50vh;" id="content_ingresos_estimados">

                            </div>
                        </div>
                        <div style="width: 40%; float: left; background-color: #f3f3f3ff;">
                            <div style="width: 100%; padding: 12px;">
                                <span>Mes anterior</span>
                            </div>
                            <div style="width: 100%; overflow-y: scroll; height: 60vh;" id="content_ingresos_estimados_ant">

                            </div>

                        </div>
                        <!-- <div style="width: 100%; display: flex; flex-direction: column; padding: 10px 20px; box-sizing: border-box; margin-top: 20px;">
                            <button id="btn_guardar" style="padding: 10px; cursor: pointer; margin: 5px 0px;" onclick="guardar_gasto();">Guardar</button>
                            <button id="btn_cerrar" style="padding: 10px; cursor: pointer; margin: 5px 0px;" onclick="cerrar_form_nuevo_registro();">Cancelar</button>
                        </div> -->
                    </div>
                    
                </div>
            </div>
        </div>
        