<?php
require 'header.php';
?>

        <div id="form_registro_egresos" style="display: none; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5); position: fixed; z-index: 2;">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                <div style="width: 80%; height: 600px; border-radius: 10px; background-color: #ffffff; margin-top: 30px;">
                    <div style="width: 100%; height: 20px; text-align: right; padding-top: 10px; padding-right: 10px; box-sizing: border-box">
                        <span style="cursor: pointer;" onclick="cerrar_form_registro_egresos();">X</span>
                    </div>
                    <div style="width: 100%; text-align: center; padding: 15px;">
                        <span>Lista de gastos fijos</span>
                    </div>
                    <div id="content_lista_gf" style="width: 100%; height: 500px; overflow: scroll;">
                        
                    </div>
                    
                </div>
            </div>
        </div>

    <div style="width: 100%; border: #ccc 1px solid; height: 85vh; overflow-y: scroll;">
        <div style="width: 100%; padding: 10px 20px;">
            <button onclick="nuevo_registro_gasto_fijo();">Cargar gastos mensuales</button>
        </div>
        <div style="width: 100%;  float: left; background-color: #ccc;">
            <div style="width: 100%; height: 45px; margin: 2px; box-shadow: 5px 5px 5px rgba(0, 71, 202, 0.2);">
                <div style="width: 20%; float: left; padding: 10px;">
                    <span>Gasto Fijo</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px; text-align: right;">
                    <span>Pago Estimado</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px; text-align: right;">
                    <span>Pago Real</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px; text-align: right;">
                    <span>Diferencia</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px; text-align: right;">
                    <span>Opciones</span>
                </div>
            </div>
            <div id="lista_egresos" style="width: 100%; height: 50vh; padding: 20px; overflow-y: scroll;">

            </div>
            <div style="width: 100%; height: 45px; margin: 2px;">
                <div style="width: 20%; float: left; padding: 10px 10px 10px 30px;">
                    <span>Total</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px 25px 10px 10px; text-align: right;">
                    <span id="suma_montos_vp">$0.00</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px 20px 10px 10px; text-align: right;">
                    <span id="suma_pagos_vp">$0.00</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px 20px 10px 10px; text-align: right;">
                    <span id="suma_dif">$0.00</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px 10px 10px 10px; text-align: right;">
                    
                </div>
                <div style="width: 100%; float: left; padding: 10px 40px 10px 10px; text-align: right;">
                    <span>Pago pendiente:</span>&nbsp;<b id="sum_pendiente_gp"></b>
                </div>
            </div>
        </div>
        <!-- <div style="width: 50%; height: 75vh; float: left; background-color: #acc4e4ff;">

        </div> -->
    </div>

 </div> 
</body>
<script src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/moment.min.js"></script>
<script type="text/javascript" src="scripts/gastos_fijos.js?v=<?php echo(rand()); ?>"></script>
<!-- <script src="js/bootbox.locales.min.js"></script> -->
<script src="js/bootbox.min.js"></script>
<script src="js/bootbox.locales.js"></script>
<script src="js/bootbox.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</html>