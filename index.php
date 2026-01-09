<?php
require 'header.php';
?>
        <div style="width: 100%; height: 15vh; display: flex; justify-content: center; align-items: center; background-color: #fff; border: #ccc 1px solid; position: fixed; bottom: 0px; box-shadow: -5px -5px 5px rgba(8, 96, 228, 0.2); z-index: 1;">
            <button onclick="ver_vista_inicial();" style="width: 80px; height: 80px; display: flex; justify-content: center; align-items: center; flex-direction: column; border: none; border-radius: 10px; background-color: #ffffffff; color: #0334b0ff; margin: 2px; font-size: 13px;"><img src="img/home-agreement.png" alt="" style="width: 20px; height: 20px;">Inicio</button>
            <button onclick="abrir_form_nuevo_registro(0);" style="width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; border: none; border-radius: 50%; background-color: #1e335aff; color: #fff; margin: 2px;"><img src="img/plus_white.png" alt="" style="width: 15px; height: 15px;"></button>
            <button onclick="ver_registros();" style="width: 80px; height: 80px; display: flex; justify-content: center; align-items: center; flex-direction: column; border: none; border-radius: 10px; background-color: #ffffffff; color: #0334b0ff; margin: 2px; font-size: 13px;"><img src="img/lists.png" alt="" style="width: 20px; height: 20px;">Registros</button>
            <!-- <button onclick="ver_tipos();" style="padding: 30px 20px; border: none; border-radius: 10px; background-color: #1e335aff; color: #fff; margin: 2px;">Tipos</button> -->
        </div>
        <div style="width: 100%; height: 40px; ">
            <div style="width: 50%; float: left; padding: 5px;">
                <select onchange="calcular_por_mes_anio();" id="select_mes" name="" style="width: 100%; padding: 5px;">
                    <option value="01">Enero</option>
                    <option value="02">Febrero</option>
                    <option value="03">Marzo</option>
                    <option value="04">Abril</option>
                    <option value="05">Mayo</option>
                    <option value="06">Junio</option>
                    <option value="07">Julio</option>
                    <option value="08">Agosto</option>
                    <option value="09">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>
            </div>
            <div style="width: 50%; float: left; padding: 5px;">
                <select onchange="calcular_por_mes_anio();" id="select_anio" name="" style="width: 100%; padding: 5px;">
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                </select>
            </div>
        </div>
      
        <div id="estimacion" style="width: 100%; height: 85vh;">
            <div style="width: 100%; padding: 10px; border-bottom: #ccc 1px solid; height: 80px; box-sizing: border-box;">
                <a id="a_ingresos" onclick="ver_detalle_ingresos();" href="">
                    <div style="width: 90%; float: left;">
                        <span>Capital:</span><br>
                        <b id="suma_ingreso">$0</b>
                    </div>
                    <div style="width: 10%; float: left; text-align: center; padding-top: 10px;">
                    
                        <img src="img/next_prod_rel.png" alt="" style="width: 15px; transform: rotate(90deg);">
                    </div>
                </a>   
            </div>
            <div style="width: 100%; padding: 10px; border-bottom: #ccc 1px solid; height: 80px; box-sizing: border-box;">
                <a id="a_pendientes" onclick="ver_detalle_pendientes();" href="">
                    <div style="width: 90%; float: left;">
                        <span>Pagos Pendientes:</span><br>
                        <b id="sum_pendiente">$0</b>
                    </div>
                    <div style="width: 10%; float: left; text-align: center; padding-top: 10px;">
                    
                        <img src="img/next_prod_rel.png" alt="" style="width: 15px; transform: rotate(90deg);">
                    </div>
                </a>              
            </div>
            <div style="width: 100%; padding: 10px; border-bottom: #ccc 1px solid; height: 80px; box-sizing: border-box;">
                <div style="width: 90%; float: left;">
                    <span>Capital Final:</span><br>
                    <b id="capital_final">$0</b>
                </div>
                <div style="width: 10%; float: left; text-align: center; padding-top: 10px;">
                   
                    <img src="img/next_prod_rel.png" alt="" style="width: 15px; transform: rotate(90deg);">
                </div>
            </div>
        </div>
        
        <div style="width: 100%; height: 85vh; overflow: hidden; display: none;" id="contenedor_registros">
            <div style="width: 100%; padding: 15px 15px 7px 10px;">
                <button onclick="ver_registros();" style="margin: 3px; border: none; border: #ccc 1px solid; border-radius: 5px; padding: 5px 10px;">Todo</button><button onclick="ver_tipos();" style="margin: 3px; border: none; border: #ccc 1px solid; border-radius: 5px; padding: 5px 10px;">Tipos</button>
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
<!-- <script src="js/bootbox.locales.min.js"></script> -->
<script src="js/bootbox.min.js"></script>
<script src="js/bootbox.locales.js"></script>
<script src="js/bootbox.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</html>