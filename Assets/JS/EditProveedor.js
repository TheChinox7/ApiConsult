$(document).ready(() => {
    let timeout;
    let spinner = $('<div class="spinner-border spinner-border-sm text-primary spinner-label" role="status"><span class="sr-only">Buscando...</span></div>')
    $('#formEditProveedor input[name="cifnif"]').on('input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let action = null
            let input = $(this)
            let cifnif = $(this).val();

            let select = $('#formEditProveedor select[name="tipoidfiscal"]');
            if (cifnif.length === 10) {
                select.val('CI');
                action = 'infoCI'
            }
            if (cifnif.length === 13) {
                select.val('RUC');
                action = 'infoRUC'
            }

            if (action === null) return;

            input.parent().append(spinner);
            let formData = new FormData();
            formData.append('action', action);
            formData.append('cifnif', cifnif);

            //Disable all inputs
            $('#formEditProveedor input').attr('disabled', true);
            $('#formEditProveedor select').attr('disabled', true);

            fetch('\FiscalNumQuery', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(response => {
                    input.parent().find('.spinner-label').remove();
                    //Enable all inputs
                    $('#formEditProveedor input').attr('disabled', false);
                    $('#formEditProveedor select').attr('disabled', false);

                    if (response.error) {
                        alert(response.error);
                        return;
                    }
					
					if (response.no_token) {
                        alert(response.no_token);
                        return;
                    }
					
                    if (response.nombreCompleto) {
                        $('#formEditProveedor input[name="nombre"]').val(response.nombreCompleto);
                        return;
                    }

                    if (response.ruc) {
                        $('#formEditProveedor input[name="nombre"]').val(response.ruc.razonSocial);
                        $('#formEditProveedor input[name="razonSocial"]').val(response.ruc.razonSocial);
                        let tipoPersona = $('#formEditProveedor select[name="personafisica"]');
                        tipoPersona.val(response.ruc.tipoContribuyente === 'PERSONA NATURAL' ? 1 : 0);
                        return;
                    }
                })
                .catch(error => {
                    input.parent().find('.spinner-label').remove();
                    //Enable all inputs
                    $('#formEditProveedor input').attr('disabled', false);
                    $('#formEditProveedor select').attr('disabled', false);

                })
        }, 800);
    })
})