export var Global = {
	dt: {
		language: {
			loadingRecords: `
				Cargando información... 
				<div id="spinner" class="spinner-border spinner-border-sm text-primary ml-3" role="status">
					<span class="sr-only">Loading...</span>
				</div>`,
			lengthMenu: 'Mostrar _MENU_ registros',
			zeroRecords: 'No se encontraron resultados',
			info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
			infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
			infoFiltered: '(filtrado de un total de _MAX_ registros)',
			search: 'Buscar:',
			paginate: {
				first: 'Primero',
				last: 'Último',
				next: 'Siguiente',
				previous: 'Anterior'
			},
			processing: 'Procesando...',
		},
		languageWithLoader: {
			loadingRecords: `
				Cargando información... 
				`,
			lengthMenu: 'Mostrar _MENU_ registros',
			zeroRecords: 'No se encontraron resultados',
			info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
			infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
			infoFiltered: '(filtrado de un total de _MAX_ registros)',
			search: 'Buscar:',
			paginate: {
				first: 'Primero',
				last: 'Último',
				next: 'Siguiente',
				previous: 'Anterior'
			},
			processing: `
				<div id="spinner" class="spinner-border spinner-border-sm text-primary ml-3" role="status">
					<span class="sr-only">Loading...</span>
				</div>
			`,
		},
		excel: {
			extend:    'excelHtml5',
			text:      '<i class="fas fa-file-excel"></i> ',
			titleAttr: 'Exportar a Excel',
			className: 'btn btn-success'
		},
		pdf: {
			extend:    'pdfHtml5',
			text:      '<i class="fas fa-file-pdf"></i> ',
			titleAttr: 'Exportar a PDF',
			className: 'btn btn-danger'
		},
		print: {
			extend:    'print',
			text:      '<i class="fa fa-print"></i> ',
			titleAttr: 'Imprimir',
			className: 'btn btn-info'
		}
	}
};