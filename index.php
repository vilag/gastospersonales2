<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gastos Personales</title>
    
</head>
<body style="margin: 0px; padding: 0px;">
    <div style="width: 100%;">
        <div id="form_nuevo_registro" style="display: none; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5); position: fixed; z-index: 2;">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                <div style="width: 50%; height: 500px; border-radius: 10px; background-color: #ffffff; margin-top: 50px;">
                    <div style="width: 100%; height: 20px; text-align: right; padding-top: 10px; padding-right: 10px; box-sizing: border-box">
                        <span>X</span>
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
                            <button id="btn_guardar" style="padding: 10px;" onclick="guardar_gasto();">Guardar</button>
                            <button id="btn_cerrar" style="padding: 10px;" onclick="cerrar_form_nuevo_registro();">Cancelar</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div style="width: 100%; height: 100px; display: flex; justify-content: center; align-items: center; background-color: #fff; border: #ccc 1px solid; position: fixed; bottom: 0px; box-shadow: -5px -5px 5px rgba(8, 96, 228, 0.2);">
            <button onclick="abrir_form_nuevo_registro();" style="padding: 10px 20px; border: none; border-radius: 10px; background-color: #1e335aff; color: #fff;">Nuevo registro</button>

        </div>
        <div style="width: 100%;" id="contenedor_registros">
            <!-- <div style="width: 98%; margin: 10px; border-radius: 10px; height: 135px; box-shadow: 5px 5px 10px rgba(0,0,0,0.2); background-color: #CCC; position: relative;">
                <div style="width: 100%; padding: 10px;">
                    <div style="width: 25%; float: left; height: 40px; padding: 5px;">
                        <span>Fecha/hora:</span><br>
                        <span>16-dic-2025 11:55:52 hrs</span>
                    </div>
                    <div style="width: 25%; float: left; height: 40px; padding: 5px;">
                        <span>Lugar:</span><br>
                        <span>Walmart</span>
                    </div>
                    
                    <div style="width: 25%; float: left; height: 40px; padding: 5px;">
                        <span>Monto:</span><br>
                        <span>$1,500.00</span>
                    </div>
                    <div style="width: 20%; float: left; height: 40px; padding: 5px;">
                        <button>Eliminar</button>
                        <button>Actualizar</button>
                    </div>
                </div>
                <div style="width: 100%; padding: 10px;">
                    <div style="width: 100%; float: left; height: 80px; padding: 5px;">
                        <span>Detalle:</span>
                        <div style="width: 98%; height: 40px; overflow-y: scroll;">   
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sequi iste eveniet autem velit aperiam! Ipsam repellat dolor dolore? Porro nostrum, quisquam nihil ea ut voluptatibus odit laboriosam fugiat nemo!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sequi iste eveniet autem velit aperiam! Ipsam repellat dolor dolore? Porro nostrum, quisquam nihil ea ut voluptatibus odit laboriosam fugiat nemo!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sequi iste eveniet autem velit aperiam! Ipsam repellat dolor dolore? Porro nostrum, quisquam nihil ea ut voluptatibus odit laboriosam fugiat nemo!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sequi iste eveniet autem velit aperiam! Ipsam repellat dolor dolore? Porro nostrum, quisquam nihil ea ut voluptatibus odit laboriosam fugiat nemo!
                            </span>
                        </div>
                    </div>
                </div>      
            </div> -->
            <!-- <div style="width: 98%; margin: 10px; border-radius: 10px; height: 135px; box-shadow: 5px 5px 10px rgba(0,0,0,0.2); background-color: #CCC; position: relative;">
                <div style="width: 100%; padding: 10px;">
                    <div style="width: 25%; float: left; height: 40px; padding: 5px;">
                        <span>Fecha/hora:</span><br>
                        <span>16-dic-2025 11:55:52 hrs</span>
                    </div>
                    <div style="width: 25%; float: left; height: 40px; padding: 5px;">
                        <span>Lugar:</span><br>
                        <span>Walmart</span>
                    </div>
                    
                    <div style="width: 25%; float: left; height: 40px; padding: 5px;">
                        <span>Monto:</span><br>
                        <span>$1,500.00</span>
                    </div>
                    <div style="width: 20%; float: left; height: 40px; padding: 5px;">
                        <button>Eliminar</button>
                        <button>Actualizar</button>
                    </div>
                </div>
                <div style="width: 100%; padding: 10px;">
                    <div style="width: 100%; float: left; height: 80px; padding: 5px;">
                        <span>Detalle:</span>
                        <div style="width: 98%; height: 40px; overflow-y: scroll;">   
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sequi iste eveniet autem velit aperiam! Ipsam repellat dolor dolore? Porro nostrum, quisquam nihil ea ut voluptatibus odit laboriosam fugiat nemo!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sequi iste eveniet autem velit aperiam! Ipsam repellat dolor dolore? Porro nostrum, quisquam nihil ea ut voluptatibus odit laboriosam fugiat nemo!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sequi iste eveniet autem velit aperiam! Ipsam repellat dolor dolore? Porro nostrum, quisquam nihil ea ut voluptatibus odit laboriosam fugiat nemo!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sequi iste eveniet autem velit aperiam! Ipsam repellat dolor dolore? Porro nostrum, quisquam nihil ea ut voluptatibus odit laboriosam fugiat nemo!
                            </span>
                        </div>
                    </div>
                </div>      
            </div> -->
        </div>
        
    </div>
    
</body>
<script src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/moment.min.js"></script>
<script type="text/javascript" src="scripts/index.js?v=<?php echo(rand()); ?>"></script>

</html>