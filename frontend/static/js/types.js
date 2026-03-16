/**
 * player types
 * 
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
 * @typedef Player
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
 * @property {PlayerLeyendStadistics} [legendStadistics]
 * @property {LeagueTier} [league]
 *
 * @typedef PlayerClan
 * @type {Object}
 * @property {string} tag
 * @property {number} clanLevel
 * @property {string} name
 * @property {Object} badgeUrls
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
 * @property {Object} iconUrls
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
 */