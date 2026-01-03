<?php
require_once "../modelos/Index.php";

$index=new Index();

switch ($_GET["op"])
	{
		case 'ultimo_registro':
			$rspta=$index->ultimo_registro();
	 		echo json_encode($rspta);
		break;

		case 'guardar_capital_inicial':
			$fecha = $_POST['fecha'];
			$capital_final = $_POST['capital_final'];
			$rspta=$index->guardar_capital_inicial($fecha,$capital_final);
	 		echo json_encode($rspta);
		break;

		case 'listar_ingresos':
            $fecha_ant = $_POST['fecha_ant'];
			$rspta = $index->listar_ingresos($fecha_ant);
			$pila = array();	
			while ($reg = $rspta->fetch_object())
			{
				array_push($pila, $reg);
			}
			echo json_encode($pila);
		break;

		case 'listar_ingresos_actual':
            $fecha = $_POST['fecha'];
			$rspta = $index->listar_ingresos_actual($fecha);
			$pila = array();	
			while ($reg = $rspta->fetch_object())
			{
				array_push($pila, $reg);
			}
			echo json_encode($pila);
		break;

		case 'calculos_iniciales':
            $fecha = $_POST['fecha'];
			$rspta = $index->calculos_iniciales($fecha);
			$pila = array();	
			while ($reg = $rspta->fetch_object())
			{
				array_push($pila, $reg);
			}
			echo json_encode($pila);
		break;

		case 'calculos_iniciales_pendientes':
            $fecha = $_POST['fecha'];
			$rspta = $index->calculos_iniciales_pendientes($fecha);
			$pila = array();	
			while ($reg = $rspta->fetch_object())
			{
				array_push($pila, $reg);
			}
			echo json_encode($pila);
		break;

		case 'montos_iniciales':

			$fecha = $_POST['fecha'];

			$rspta=$index->montos_iniciales($fecha);
	 		echo json_encode($rspta);
		break;

		case 'montos_iniciales_ant':

			$fecha = $_POST['fecha'];
			$fecha_ant = $_POST['fecha_ant'];

			$rspta=$index->montos_iniciales_ant($fecha,$fecha_ant);
	 		echo json_encode($rspta);
		break;

		case 'listar_tipos_ini':
            $fecha = $_POST['fecha'];
			$rspta = $index->listar_tipos_ini($fecha);
			$pila = array();	
			while ($reg = $rspta->fetch_object())
			{
				array_push($pila, $reg);
			}
			echo json_encode($pila);
		break;

		case 'listar_gastos':
            $fecha = $_POST['fecha'];
			$rspta = $index->listar_gastos($fecha);
			$pila = array();	
			while ($reg = $rspta->fetch_object())
			{
				array_push($pila, $reg);
			}
			echo json_encode($pila);
		break;

		case 'guardar_gasto':

			$lugar = $_POST['lugar'];
			$monto = $_POST['monto'];
			$tipo = $_POST['tipo'];
            $detalle = $_POST['detalle'];
            $fecha_hora = $_POST['fecha_hora'];
			$egreso = $_POST['egreso'];
			$idregistro = $_POST['idregistro'];

			$rspta=$index->guardar_gasto($lugar,$monto,$tipo,$detalle,$fecha_hora,$egreso,$idregistro);
	 		echo json_encode($rspta);
		break;

		case 'eliminar_registro':

            $idregistro = $_POST['idregistro'];

			$rspta=$index->eliminar_registro($idregistro);
	 		echo json_encode($rspta);
		break;

		case 'consulta_registro':

            $idregistro = $_POST['idregistro'];

			$rspta=$index->consulta_registro($idregistro);
	 		echo json_encode($rspta);
		break;

        case 'listar_lugares':
            $lugar = $_POST['lugar'];
			$rspta = $index->listar_lugares($lugar);
			$pila = array();	
			while ($reg = $rspta->fetch_object())
			{
				array_push($pila, $reg);
			}
			echo json_encode($pila);
		break;

		case 'listar_tipos':
            $tipos = $_POST['tipos'];
			$rspta = $index->listar_tipos($tipos);
			$pila = array();	
			while ($reg = $rspta->fetch_object())
			{
				array_push($pila, $reg);
			}
			echo json_encode($pila);
		break;

		case 'listar_egresos':
            $fecha = $_POST['fecha'];
			$rspta = $index->listar_egresos($fecha);
			$pila = array();	
			while ($reg = $rspta->fetch_object())
			{
				array_push($pila, $reg);
			}
			echo json_encode($pila);
		break;


	}

?>