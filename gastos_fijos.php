<?php
require 'header.php';
?>

    <div style="width: 100%; border: #ccc 1px solid; height: 85vh; overflow-y: scroll;">
        <div style="width: 50%;  float: left; background-color: #ccc;">
            <div style="width: 100%; height: 45px; margin: 2px; box-shadow: 5px 5px 5px rgba(0, 71, 202, 0.2);">
                <div style="width: 30%; float: left; padding: 10px;">
                    <span>Gasto Fijo</span>
                </div>
                <div style="width: 30%; float: left; padding: 10px; text-align: right;">
                    <span>Pago Estimado</span>
                </div>
                <div style="width: 30%; float: left; padding: 10px; text-align: right;">
                    <span>Pago Real</span>
                </div>
            </div>
            <div id="lista_egresos" style="width: 100%; height: 50vh; padding: 20px; overflow-y: scroll;">

            </div>
            <div style="width: 100%; height: 45px; margin: 2px;">
                <div style="width: 30%; float: left; padding: 10px 10px 10px 30px;">
                    <span>Total</span>
                </div>
                <div style="width: 30%; float: left; padding: 10px 25px 10px 10px; text-align: right;">
                    <span id="suma_montos_vp">$0.00</span>
                </div>
                <div style="width: 30%; float: left; padding: 10px 40px 10px 10px; text-align: right;">
                    <span id="suma_pagos_vp">$0.00</span>
                </div>
            </div>
        </div>
        <div style="width: 50%; height: 75vh; float: left; background-color: #acc4e4ff;">

        </div>
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