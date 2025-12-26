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
</head>
<body style="margin: 0px; padding: 0px;">
    <div style="width: 100%;">
        <div id="form_nuevo_registro" style="display: none; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5); position: fixed; z-index: 2;">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                <div style="width: 80%; height: 500px; border-radius: 10px; background-color: #ffffff; margin-top: 50px;">
                    <div style="width: 100%; height: 20px; text-align: right; padding-top: 10px; padding-right: 10px; box-sizing: border-box">
                        <span style="cursor: pointer;" onclick="cerrar_form_nuevo_registro();">X</span>
                    </div>
                    <div style="width: 100%; text-align: center;">
                        <span>Nuevo Gasto</span>
                    </div>
                    <div style="width: 100%;">
                        <div style="width: 100%; display: flex; flex-direction: column; padding: 10px 20px; box-sizing: border-box">
                            <label>Lugar</label>
                            <input id="lugar_input" type="text" style="height: 30px;" onkeyup="mostrarlugares();">
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
                        <div style="width: 100%; display: flex; flex-direction: column; padding: 10px 20px; box-sizing: border-box; margin-top: 30px;">
                            <button id="btn_guardar" style="padding: 10px; cursor: pointer;" onclick="guardar_gasto();">Guardar</button>
                            <button id="btn_cerrar" style="padding: 10px; cursor: pointer;" onclick="cerrar_form_nuevo_registro();">Cancelar</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div style="width: 100%; height: 15vh; display: flex; justify-content: center; align-items: center; background-color: #fff; border: #ccc 1px solid; position: fixed; bottom: 0px; box-shadow: -5px -5px 5px rgba(8, 96, 228, 0.2); z-index: 1;">
            <button onclick="abrir_form_nuevo_registro();" style="padding: 30px 20px; border: none; border-radius: 10px; background-color: #1e335aff; color: #fff; margin: 2px;">Nuevo registro</button>
            <button onclick="ver_registros();" style="padding: 30px 20px; border: none; border-radius: 10px; background-color: #1e335aff; color: #fff; margin: 2px;">Registros</button>
            <!-- <button onclick="ver_tipos();" style="padding: 30px 20px; border: none; border-radius: 10px; background-color: #1e335aff; color: #fff; margin: 2px;">Tipos</button> -->
        </div>
        <div id="estimacion" style="width: 100%; height: 85vh;">
            <div style="width: 100%; padding: 10px; border-bottom: #ccc 1px solid; height: 60px; box-sizing: border-box;">
                <div style="width: 90%; float: left;">
                    <span>Capital:</span><br>
                    <b>$100</b>
                </div>
                <div style="width: 10%; float: left; text-align: center; padding-top: 10px;">
                   
                    <img src="img/next_prod_rel.png" alt="" style="width: 15px; transform: rotate(90deg);">
                </div>
            </div>
            <div style="width: 100%; padding: 10px; border-bottom: #ccc 1px solid; height: 60px; box-sizing: border-box;">
                <div style="width: 90%; float: left;">
                    <span>Pagos Pendientes:</span><br>
                    <b>$100</b>
                </div>
                <div style="width: 10%; float: left; text-align: center; padding-top: 10px;">
                   
                    <img src="img/next_prod_rel.png" alt="" style="width: 15px; transform: rotate(90deg);">
                </div>
            </div>
            <div style="width: 100%; padding: 10px; border-bottom: #ccc 1px solid; height: 60px; box-sizing: border-box;">
                <div style="width: 90%; float: left;">
                    <span>Capital Final:</span><br>
                    <b>$100</b>
                </div>
                <div style="width: 10%; float: left; text-align: center; padding-top: 10px;">
                   
                    <img src="img/next_prod_rel.png" alt="" style="width: 15px; transform: rotate(90deg);">
                </div>
            </div>
        </div>
        
        <div style="width: 100%; height: 85vh; overflow: hidden; display: none;" id="contenedor_registros">
            <div style="width: 100%; padding: 15px 15px 7px 10px;">
                <button onclick="ver_todos();" style="margin: 3px; border: none; border: #ccc 1px solid; border-radius: 5px; padding: 5px 10px;">Todo</button><button onclick="ver_tipos();" style="margin: 3px; border: none; border: #ccc 1px solid; border-radius: 5px; padding: 5px 10px;">Tipos</button>
            </div>
            <div style="width: 100%; height: 75vh; overflow: scroll; " id="contenedor_registros_list">
                
            </div>
            <div style="width: 100%; height: 75vh; display: block; overflow: scroll;" id="contenedor_tipos">

            </div>
        </div>
        
        
    </div>
    
</body>
<script src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/moment.min.js"></script>
<script type="text/javascript" src="scripts/index.js?v=<?php echo(rand()); ?>"></script>

</html>