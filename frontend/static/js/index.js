
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

            /** @type {Clan} */
            const clan = await response.json();

            UI.clanContainer.innerHTML = (`
                <div class="card">
                    <div class="grid-2 grid-25-75">
                        <img src="${clan.badgeUrls.medium ?? ''}" alt="image_clan" width="125" height="125" />
                        <div>
                            <h2>${clan.name}</h2>
                            <small><b>${clan.tag}</b></small>
                            <p class="clan-description">"${clan.description}"</p>
                            <div class="labels">
                                ${clan.labels.map(label => (`
                                    <span>
                                        <img width="25" height="25" src="${label.iconUrls.small}" alt="label_small" />
                                        ${label.name}
                                    </span>    
                                `)).join('')}
                            </div>
                            <p>
                                Nivel del clan: <b>${clan.clanLevel}</b><br />
                                País: <b>${clan.location.name}</b><br />
                            </p>
                            <p>Cantidad de integrantes: <b>${clan.members}</b></p>
                        </div>
                    </div>
                </div>    
            `);
            

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

            /** @type {Player} */
            const player = await response.json();

            UI.playerContainer.innerHTML = (`
                <div class="card">
                    <div class="grid-2 grid-25-75">
                        <img src="${player.leagueTier.iconUrls.small ?? ''}" alt="image_league" />
                        <div>
                            <h2>${player.name}</h2>
                            <small><b>${player.tag}</b></small>
                            <div class="labels">
                                ${player.labels.map(label => (`
                                    <span>
                                        <img width="25" height="25" src="${label.iconUrls.small}" alt="label_small" />
                                        ${label.name}
                                    </span>    
                                `)).join('')}
                            </div>
                            <p>
                                Nivel de experiencia: <b>${player.expLevel}</b><br />
                                Nivel de ayuntamiento: <b>${player.townHallLevel}</b><br />
                            </p>
                            <p>
                                Nivel de liga: <b>${player.leagueTier.name}</b><br />
                            </p>
                            <p>
                                Clan del jugador: 
                                    <b>
                                        ${player.clan ? 
                                            player.clan.name 
                                            : 
                                            (`El jugador no se encuentra en ningún clan`)
                                        }
                                    </b><br />
                                ${player.clan ? (`
                                    Código del clan: <b>${player.clan.tag}</b>    
                                `) : ''}
                            </p>
                        </div>
                    </div>
                </div>
            `);

        } catch (error) {
            console.error(error);
        }

        // ...
        console.log(data);
    };

    /**
     * Obtiene las localizaciones geograficas de los clanes
     * y actualiza la interfaz
     */
    async function getLocations() {
        try {
            const response = await fetch(`${API.url}locations`);

            if (!response.ok) throw {
                ok: false,
                error: 'Revisa tu conexión a Internet',
                status: 0
            }

            if (response.status === 404) throw {
                ok: false,
                error: 'Infomación no fue encontrada',
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

            /** @type {{ items: Array<LocationGame>}} */
            let {items: locations} = await response.json();
            
            locations = locations.filter(location => location.name.length > 0);

            UI.formLocation.innerHTML = (`
                <option id="">Seleccione ...</option>
                ${locations.map(location => (`
                    <option id="${location.id}">${location.name}</option>    
                `)).join('')}    
            `);

        } catch (error) {
            console.error(error);
        }
    }

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
        errorSearchClan: document.querySelector('#error-clan-tag'),
        playerContainer: document.querySelector('#player'),
        clanContainer: document.querySelector('#clan'),
        formLocation: document.querySelector('form #clan_location')
    };

    const REGEX = {
        tag: /^\#[A-Z\d]{9}$/
    };

    UI.formSearchClan.addEventListener('submit', handleSubmitClan);
    UI.formSearchPlayer.addEventListener('submit', handleSubmitPlayer);

    getLocations();
}	


init();