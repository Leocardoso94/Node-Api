const url = 'http://localhost:8080/topicos';

$(function () {

	hideModal();
	getTopicos();

	$('table').on('click', '.delete', function (event) {
		event.preventDefault();
		const id = $(this).val();

		if (confirm("Você tem certeza?"))
			$.ajax({
				url: url + '/' + id,
				type: 'DELETE',
				success: function () {
					$('tbody').html('');
					getTopicos();
				}
			});
	});

	$('table').on('click', '.update', function (event) {
		event.preventDefault();
		const id = $(this).val();

		$('.modal').show();
		$('.modal-wrapper').show();
		// $.ajax({
		// 	url: url + '/' + id,
		// 	type: 'DELETE',
		// 	success: function () {
		// 		$('tbody').html('');
		// 		getTopicos();
		// 	}
		// });
	});

	$('.modal-wrapper').click(function () {
		hideModal();
	});

	$('form').submit(function (event) {
		event.preventDefault();
		const id = $('#id').val();
		const descricao = $('#descricao').val();
		const nome = $('#nome').val();

		const topico = { id, nome, descricao };

		$.ajax({
			type: 'post',
			url: url,
			data: JSON.stringify(topico),
			contentType: 'application/json; charset=utf-8',
			traditional: true,
			success: function () {
				$('tbody').prepend(makeTR(topico));
			}
		});
	});
});


function makeTR(topico) {
	const template = `
	<tr>
		<td>${topico.id}</td>
		<td>${topico.nome}</td>
		<td>${topico.descricao}</td>
		<td><button value="${topico.id}" class="delete">Remover</button></td>
		<td><button value="${topico.id}" class="update">Alterar</></td>
	</tr>
	`;

	return template;
}

function getTopicos() {
	$.get(url, function (topicos) {
		topicos.forEach(function (topico) {
			$('tbody').prepend(makeTR(topico));
		});
	});
}
function hideModal() {
	$('.modal').hide();
	$('.modal-wrapper').hide();
}

