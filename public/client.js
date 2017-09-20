const url = 'http://localhost:8080/topicos';

$(function () {

	hideModal();
	getTopicos();

	$('table').on('click', '.delete', function (event) {
		event.preventDefault();
		const id = $(this).val();

		if (confirm('Você tem certeza?'))
			$.ajax({
				url: url + '/' + id,
				type: 'DELETE',
				success: function () {
					resetarTabela();
				}
			});
	});

	$('table').on('click', '.update', function (event) {
		event.preventDefault();
		const id = $(this).val();

		$('.modal').show();
		$('.modal-wrapper').show();

		$.get(url + '/' + id, function (topico) {
			$('#idUpdate').val(topico.id);
			$('#idAnterior').val(topico.id);
			$('#descricaoUpdate').val(topico.descricao);
			$('#nomeUpdate').val(topico.nome);
		});
		// $.
	});

	$('#formUpdate').submit(function (event) {
		event.preventDefault();
		const id = $('#idUpdate').val();
		const idAnterior = $('#idAnterior').val();
		const descricao = $('#descricaoUpdate').val();
		const nome = $('#nomeUpdate').val();

		const topico = { id, nome, descricao };

		$.ajax({
			type: 'put',
			url: url + '/' + idAnterior,
			data: JSON.stringify(topico),
			contentType: 'application/json; charset=utf-8',
			traditional: true,
			success: function () {
				resetarTabela();
				hideModal();
			}
		});
	});

	$('.modal-wrapper').click(function () {
		hideModal();
	});

	$('#formAdd').submit(function (event) {
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
				$('#id').val('');
				$('#descricao').val('');
				$('#nome').val('');

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

function resetarTabela() {
	$('tbody').html('');
	getTopicos();
}

