$(document).ready(() => {
    let timeout;
    let spinner = $('<div class="spinner-border spinner-border-sm text-primary spinner-label" role="status"><span class="sr-only">Buscando...</span></div>');

    $('#formEditCliente input[name="cifnif"]').on('input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let action = null;
            let input = $(this);
            let cifnif = input.val().trim();

            let select = $('#formEditCliente select[name="tipoidfiscal"]');
            if (cifnif.length === 10) {
                select.val('CI');
                action = 'infoCI';
            }
            if (cifnif.length === 13) {
                select.val('RUC');
                action = 'infoRUC';
            }

            if (action === null) return;

            input.parent().append(spinner);
            let formData = new FormData();
            formData.append('action', action);
            formData.append('cifnif', cifnif);

            // Desactivar inputs y selects
            $('#formEditCliente input, #formEditCliente select').attr('disabled', true);

            fetch('\FiscalNumQuery', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(response => {
                    input.parent().find('.spinner-label').remove();
                    $('#formEditCliente input, #formEditCliente select').attr('disabled', false);

                    if (response.error) {
                        alert(response.error);
                        return;
                    }

                    if (response.no_token) {
                        alert(response.no_token);
                        return;
                    }

                    // Datos desde cédula
                    if (response.cedula) {
                        $('#formEditCliente input[name="nombre"]').val(response.nombre || '');
                        $('#formEditCliente input[name="razonsocial"]').val(response.nombre || '');
                        return;
                    }

                    // Datos desde RUC
                    if (response.numeroRuc) {
                        $('#formEditCliente input[name="nombre"]').val(response.razonSocial || '');
                        $('#formEditCliente input[name="razonsocial"]').val(response.razonSocial || '');

                        let tipoPersona = $('#formEditCliente select[name="personafisica"]');
                        tipoPersona.val(response.tipoContribuyente === 'PERSONA NATURAL' ? 1 : 0);
                        return;
                    }

                })
                .catch(error => {
                    input.parent().find('.spinner-label').remove();
                    $('#formEditCliente input, #formEditCliente select').attr('disabled', false);
                    console.error('Error:', error);
                });
        }, 800);
    });
});
