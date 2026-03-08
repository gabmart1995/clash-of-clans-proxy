
/** create-app-cli */
function init() {
    /**
     * captura los datos del formulario del clan
     * @param {SubmitEvent} event 
     */
    async function handleSubmitClan(event) {
        event.preventDefault();
        resetErrors();

        let formData = new FormData(event.target);
        
        /** @type {{'clan-tag': string}} */
        const data = Object.fromEntries(formData.entries());

        if (!REGEX.tag.test(data['clan-tag'])) {
            UI.errorSearchClan.innerText = 'El tag del clan no es válido';
            return;
        }
        
        // aplicamos la conversion URL
        data['clan-tag'] = encodeURIComponent(data['clan-tag']);
        
        try {
            const response = await fetch(
                `${API.url}clans/${data['clan-tag']}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log(response);

            if (!response.ok) throw { 
                ok: false, 
                error: 'Revisa la conexion a internet',
                status: 0 
            }

            // clan no encontrado
            if (response.status === 404) throw {
                ok: false,
                error: 'Clan no fue encontrado',
                status: 404
            }

            if (response.status === 400) throw {
                ok: false,
                error: 'Error por parte del usuario al enviar los datos',
                status: 400
            }

            if (response.status >= 500) throw {
                ok: false,
                error: 'Servidor en mantenimiento, espere a más tarde',
                status: response.status
            }

            const clashData = await response.json();
            console.log(clashData);

        } catch (error) {
            console.error(error);
        }
    };


    /**
     * captura los datos del formulario del jugador
     * @param {SubmitEvent} event 
     */
    async function handleSubmitPlayer(event) {
        event.preventDefault();
        resetErrors();

        let formData = new FormData(event.target);
        
        /** @type {{'player-tag': string}} */
        const data = Object.fromEntries(formData.entries());

        if (!REGEX.tag.test(data["player-tag"])) {
            UI.errorSearchPlayer.innerText = 'El tag del jugador no es válido';
            return;
        }

        
        // aplicamos la conversion URL
        data['player-tag'] = encodeURIComponent(data['player-tag']);
        
        try {
            const response = await fetch(
                `${API.url}players/${data['player-tag']}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (!response.ok) throw { 
                ok: false, 
                error: 'Revisa la conexion a internet',
                status: 0 
            }

            // clan no encontrado
            if (response.status === 404) throw {
                ok: false,
                error: 'Clan no fue encontrado',
                status: 404
            }

            if (response.status === 400) throw {
                ok: false,
                error: 'Error por parte del usuario al enviar los datos',
                status: 400
            }

            if (response.status >= 500) throw {
                ok: false,
                error: 'Servidor en mantenimiento, espere a más tarde',
                status: response.status
            }

            const clashData = await response.json();
            console.log(clashData);

        } catch (error) {
            console.error(error);
        }

        // ...
        console.log(data);
    };

    /**
     * Limpia los campos de errores
     */
    function resetErrors() {
        UI.errorSearchClan.innerText = '';
        UI.errorSearchPlayer.innerText = '';
    }

    const API = {
        url: 'http://localhost:8080/',
    }

	const UI = {
        formSearchPlayer: document.querySelector('#form-search-player'),
        formSearchClan: document.querySelector('#form-search-clan'),
        errorSearchPlayer: document.querySelector('#error-player-tag'),
        errorSearchClan: document.querySelector('#error-clan-tag')
    };

    const REGEX = {
        tag: /^\#[A-Z\d]{9}$/
    };

    UI.formSearchClan.addEventListener('submit', handleSubmitClan);
    UI.formSearchPlayer.addEventListener('submit', handleSubmitPlayer);
}	


init();