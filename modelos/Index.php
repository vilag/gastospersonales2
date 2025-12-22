<?php

//Incluímos inicialmente la conexión a la base de datos
require "../config/conexion.php";

Class Index
{
	public function __construct()
	{

	}

	public function listar_gastos($fecha)
	{
		$sql="SELECT * FROM registros WHERE MONTH(fecha_hora) = MONTH('$fecha') ORDER BY fecha_hora DESC";
		return ejecutarConsulta($sql);		
	}

	public function eliminar_registro($idregistro)
	{

		$sql="DELETE FROM registros WHERE idregistro='$idregistro'";
		return ejecutarConsulta($sql);			
	}

	public function guardar_gasto($lugar,$monto,$tipo,$detalle,$fecha_hora)
	{

		$sql="INSERT INTO registros (fecha_hora,lugar,monto,tipo,detalle) VALUES('$fecha_hora','$lugar','$monto','$tipo','$detalle')";
		return ejecutarConsulta($sql);			
	}

    public function listar_lugares($lugar)
	{
		$sql="SELECT lugar FROM registros WHERE lugar LIKE '%".$lugar."%' GROUP BY lugar ORDER BY lugar ASC";
		return ejecutarConsulta($sql);		
	}

	public function listar_tipos($tipos)
	{
		$sql="SELECT tipo FROM registros WHERE tipo LIKE '%".$tipos."%' GROUP BY tipo ORDER BY tipo ASC";
		return ejecutarConsulta($sql);		
	}

}
?>