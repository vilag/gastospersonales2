<?php

//Incluímos inicialmente la conexión a la base de datos
require "../config/Conexion.php";

Class Index
{
	public function __construct()
	{

	}

	public function calculos_iniciales($fecha)
	{
		$sql="SELECT * FROM registros WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha')";
		return ejecutarConsulta($sql);		
	}

	public function calculos_iniciales_pendientes($fecha)
	{
		$sql="SELECT * FROM egreso WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha')";
		return ejecutarConsulta($sql);		
	}

	public function montos_iniciales($fecha)
	{
		$sql="SELECT tipo,SUM(monto) as suma_ingreso, 
		(SELECT sum(monto) FROM registros WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha')) as suma_egreso
		FROM ingreso WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha') AND estatus='pagado'";
		return ejecutarConsultaSimpleFila($sql);		
	}

	public function montos_iniciales_ant($fecha,$fecha_ant)
	{
		$sql="SELECT tipo,SUM(monto) as suma_ingreso, 
		(SELECT sum(monto) FROM registros WHERE MONTH(fecha_hora) = MONTH('$fecha_ant') AND YEAR(fecha_hora)=YEAR('$fecha_ant')) as suma_egreso,
		(SELECT tipo FROM ingreso WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha') AND tipo='Capital') as existe_capital
		FROM ingreso WHERE MONTH(fecha_hora) = MONTH('$fecha_ant') AND YEAR(fecha_hora)=YEAR('$fecha_ant') AND estatus='pagado'";
		return ejecutarConsultaSimpleFila($sql);		
	}

	public function consulta_registro($idregistro)
	{
		$sql="SELECT * FROM registros WHERE idregistro='$idregistro'";
		return ejecutarConsultaSimpleFila($sql);		
	}

	public function listar_tipos_ini($fecha)
	{
		$sql="SELECT tipo,SUM(monto) as suma_tipo FROM registros WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha') GROUP BY tipo ORDER BY tipo ASC";
		return ejecutarConsulta($sql);		
	}

	public function listar_gastos($fecha)
	{
		$sql="SELECT

		a.idregistro,
		a.fecha_hora,
		a.lugar,
		a.monto,
		a.tipo,
		a.detalle,
		(SELECT nombre FROM egreso WHERE idegreso = a.idegreso) as nombre_egreso
		
		FROM registros a WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha') ORDER BY fecha_hora DESC";
		return ejecutarConsulta($sql);		
	}

	public function eliminar_registro($idregistro)
	{

		$sql="DELETE FROM registros WHERE idregistro='$idregistro'";
		return ejecutarConsulta($sql);			
	}

	public function guardar_gasto($lugar,$monto,$tipo,$detalle,$fecha_hora,$egreso,$idregistro)
	{
		if ($idregistro==0) {
			$sql="INSERT INTO registros (fecha_hora,lugar,monto,tipo,detalle,idegreso) VALUES('$fecha_hora','$lugar','$monto','$tipo','$detalle','$egreso')";
			return ejecutarConsulta($sql);	
		}else {
			$sql="UPDATE registros SET lugar='$lugar', monto='$monto', tipo='$tipo', detalle='$detalle', idegreso='$egreso' WHERE idregistro = '$idregistro'";
			return ejecutarConsulta($sql);
		}
				
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

	public function listar_egresos($fecha)
	{
		$sql="SELECT * FROM egreso WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha') AND estatus<>'no_aplica'";
		return ejecutarConsulta($sql);		
	}

	public function ultimo_registro()
	{
		$sql="SELECT MONTH(fecha_hora) as mes, YEAR(fecha_hora) as anio FROM ingreso ORDER BY fecha_hora DESC limit 1";
		return ejecutarConsultaSimpleFila($sql);		
	}

	public function listar_ingresos($fecha_ant)
	{
		$sql="SELECT tipo, monto, DATE(fecha_hora) as fecha FROM ingreso WHERE MONTH(fecha_hora) = MONTH('$fecha_ant') AND YEAR(fecha_hora)=YEAR('$fecha_ant')";
		return ejecutarConsulta($sql);		
	}

	public function listar_ingresos_actual($fecha)
	{
		$sql="SELECT tipo, monto, DATE(fecha_hora) as fecha FROM ingreso WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha')";
		return ejecutarConsulta($sql);		
	}

	public function guardar_capital_inicial($fecha,$capital_final)
	{
		$sql="INSERT INTO ingreso (tipo, monto, fecha_hora, estatus) VALUES('Capital', '$capital_final', '$fecha', 'pagado')";
		return ejecutarConsulta($sql);		
	}

	public function consulta_ingresos($fecha)
	{
		$sql="SELECT
		idcapital,
		tipo,
		monto,
		DATE(fecha_hora) as fecha,
		estatus 
		
		FROM ingreso WHERE MONTH(fecha_hora) = MONTH('$fecha') AND YEAR(fecha_hora)=YEAR('$fecha') ORDER BY fecha_hora ASC";
		return ejecutarConsulta($sql);		
	}

	public function guardar_ingreso($nombre_ingreso,$monto_ingreso,$fecha_ingreso,$estatus_ingreso)
	{
		$sql="INSERT INTO ingreso (tipo, monto, fecha_hora, estatus) VALUES('$nombre_ingreso', '$monto_ingreso', '$fecha_ingreso', '$estatus_ingreso')";
		return ejecutarConsulta($sql);		
	}

	public function guardar_ingreso_update($idcapital,$nombre_ingreso,$monto_ingreso,$fecha_ingreso,$estatus_ingreso)
	{
		$sql="UPDATE ingreso SET tipo='$nombre_ingreso', monto='$monto_ingreso', fecha_hora='$fecha_ingreso', estatus='$estatus_ingreso' WHERE idcapital='$idcapital'";
		return ejecutarConsulta($sql);		
	}

}
?>