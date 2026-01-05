<?php
require 'header.php';
?>

    <div style="width: 100%; border: #ccc 1px solid; height: 85vh;">
        <div style="width: 100%; padding: 10px 20px;">
            <button onclick="nuevo_registro_ingreso();">Nuevo ingreso</button>
        </div>
        <div style="width: 100%;  float: left; background-color: #fff;">
            <div style="width: 100%; height: 85px; margin: 2px; box-shadow: 5px 5px 5px rgba(0, 71, 202, 0.2); padding: 20px;">
                <div style="width: 20%; float: left; padding: 10px; text-align: center;">
                    <span>Nombre</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px; text-align: center;">
                    <span>Monto</span> 
                </div>
                <div style="width: 20%; float: left; padding: 10px; text-align: center;">
                    <span>Fecha</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px; text-align: center;">
                    <span>Estatus</span>
                </div>
                <div style="width: 20%; float: left; padding: 10px; text-align: center;">
                    <span>Opciones</span>
                </div>
            </div>
            <div id="lista_ingresos" style="width: 100%; height: 60vh; padding: 20px; overflow-y: scroll;">

            </div>
            <div style="width: 100%; height: 45px; margin: 2px;">
                <div style="width: 100%; float: left; padding: 10px 30px 10px 30px; text-align: right;">
                    <span>Total:</span>&nbsp;<b id="suma_ingresos">$0.00</b>
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
<script type="text/javascript" src="scripts/ingresos.js?v=<?php echo(rand()); ?>"></script>
<!-- <script type="text/javascript" src="scripts/index.js?v=<?php echo(rand()); ?>"></script> -->
<!-- <script src="js/bootbox.locales.min.js"></script> -->
<script src="js/bootbox.min.js"></script>
<script src="js/bootbox.locales.js"></script>
<script src="js/bootbox.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</html>