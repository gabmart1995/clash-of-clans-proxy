/**
 * @typedef LegendLeagueTournamentSeasonResult
 * @type {Object}
 * @property {number} trophies
 * @property {string} id
 * @property {number} rank 
 * 
 * @typedef PlayerLeyendStadistics
 * @type {Object}
 * @property {number} legendThophies
 * @property {LegendLeagueTournamentSeasonResult} currentSeason
 * @property {LegendLeagueTournamentSeasonResult} bestSeason
 * @property {LegendLeagueTournamentSeasonResult} previousSeason
 * @property {LegendLeagueTournamentSeasonResult} previousBuilderBaseSeason
 * @property {LegendLeagueTournamentSeasonResult} bestBuilderBaseSeason
 * 
 * @typedef Player petición HTTP del jugador
 * @type {Object}
 * @property {number} attackWins
 * @property {number} defenseWins
 * @property {number} townHallLevel
 * @property {number} townHallWeaponLevel
 * @property {string} name 
 * @property {string} tag
 * @property {number} expLevel
 * @property {number} trophies
 * @property {number} bestTrophies
 * @property {number} donations
 * @property {number} donationsReceived
 * @property {number} builderHallLevel
 * @property {number} builderBaseTrophies
 * @property {number} bestBuilderBaseTrophies
 * @property {number} warStars
 * @property {number} clanCapitalContributions
 * @property {string} currentLeagueGroupTag
 * @property {string} previousLeagueGroupTag,
 * @property {'admin' | 'leader' | 'member' | 'not_member' | 'coleader'} role
 * @property {Array<'out' | 'in'>} warPreference
 * @property {Array<PlayerItemLevel>} troops
 * @property {Array<PlayerItemLevel>} heroes
 * @property {Array<PlayerItemLevel>} spells
 * @property {Array<PlayerItemLevel>} heroEquipment
 * @property {LeagueTier} leagueTier
 * @property {Array<PlayerAchievementProgress>} achievements
 * @property {PlayerClan} clan
 * @property {Array<Label>} labels
 * @property {PlayerLeyendStadistics} [legendStadistics]
 * @property {LeagueTier} [league]
 *
 * @typedef PlayerClan
 * @type {Object}
 * @property {string} tag
 * @property {number} clanLevel
 * @property {string} name
 * @property {Object} badgeUrls icono de escudo del clan
 * @property {string} [badgeUrls.small]
 * @property {string} [badgeUrls.large]
 * @property {string} [badgeUrls.medium] 
 *  
 * @typedef PlayerItemLevel
 * @type {Object}
 * @property {number} level
 * @property {number} maxLevel
 * @property {boolean} superTroopIsActive
 * @property {'home' | 'builderBase' | 'clanCapital'} village
 * @property {Object} equipement
 * 
 * @typedef LeagueTier
 * @type {Object}
 * @property {string} name
 * @property {number} id
 * @property {Object} iconUrls iconos de la liga
 * @property {string} [iconUrls.small]
 * @property {string} [iconUrls.large] 
 * @property {string} [iconUrls.meduim] 
 * 
 * @typedef PlayerAchievementProgress
 * @type {Object}
 * @property {number} stars
 * @property {number} value
 * @property {string} name
 * @property {number} target
 * @property {string} info
 * @property {string} completionInfo
 * @property {'home' | 'builderBase' | 'clanCapital'} village 
 * 
 * @typedef Clan peticion HTTP de información del clan
 * @type {Object}
 * @property {string} tag
 * @property {string} name
 * @property {number} clanLevel
 * @property {number} warWinStreak racha de guerras ganadas
 * @property {number} warWins cantidad de guerras ganadas
 * @property {number} warTies cantidad de guerras en empates
 * @property {number} warLosses cantidad de guerras perdidas
 * @property {number} clanPoints
 * @property {number} clanBuilderBasePoints
 * @property {number} clanCapitalPoints
 * @property {number} requiredTrophies
 * @property {number} requiredBuilderBaseTrophies
 * @property {number} members
 * @property {string} description
 * @property {Object} badgeUrls icono de escudo del clan
 * @property {string} [badgeUrls.small]
 * @property {string} [badgeUrls.large]
 * @property {string} [badgeUrls.medium]
 * @property {ClanCapital} clanCapital capital del clan
 * @property {LocationData} location
 * @property {'open' | 'invite_only' | 'closed'}
 * 
 * @typedef ClanCapital
 * @type {Object}
 * @property {number} capitalHallLevel
 * @property {Array<ClanDistrictData>} districts
 * 
 * @typedef ClanDistrictData
 * @type {Object}
 * @property {number} id
 * @property {string} name
 * @property {number} districtHallLevel
 * 
 * @typedef LocationData datos de localizacion del jugador o clan
 * @type {Object}
 * @property {string} localizedName
 * @property {number} id
 * @property {string} name
 * @property {string} countryCode
 * @property {boolean} isCountry
 * 
 * 
 * @typedef Label etiquetas del jugador o clan
 * @type {Object}
 * @property {string} name
 * @property {number} id
 * @property {Object} iconUrls del label
 * @property {string} [iconUrls.small]
 * @property {string} [iconUrls.large] 
 * @property {string} [iconUrls.meduim] 
 * 
 * 
 * @typedef LocationGame 
 * @type {Object}
 * @property {number} id
 * @property {string} name
 * @property {string} localizedName
 * @property {boolean} isCountry
 * @property {string} [countryCode]
 */