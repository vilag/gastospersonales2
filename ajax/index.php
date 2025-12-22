<?php
require_once "../modelos/Index.php";

$index=new Index();

switch ($_GET["op"])
	{
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

			$rspta=$index->guardar_gasto($lugar,$monto,$tipo,$detalle,$fecha_hora);
	 		echo json_encode($rspta);
		break;

		case 'eliminar_registro':

            $idregistro = $_POST['idregistro'];

			$rspta=$index->eliminar_registro($idregistro);
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


	}

?>