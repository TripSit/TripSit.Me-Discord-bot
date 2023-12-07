/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

export const env = {
  NODE_ENV: isProd ? 'production' : 'development',
  // DEBUG_LEVEL: isProd ? 'info' : 'debug',
  DEBUG_LEVEL: 'debug',
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_OWNER_ID: process.env.DISCORD_OWNER_ID,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
  DISCORD_BL_ID: '867876356304666635',
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  DISCORD_CLIENT_REDIRECT_URI: process.env.DISCORD_CLIENT_REDIRECT_URI,
  DISCORD_CLIENT_TOKEN: process.env.DISCORD_CLIENT_TOKEN,
  DISCORD_EMOJI_GUILD_RPG: '1052632098646798476',
  DISCORD_EMOJI_GUILD_MAIN: '1047246735216480296',

  API_USERNAME: process.env.API_USERNAME,
  API_PASSWORD: process.env.API_PASSWORD,

  OPENAI_API_ORG: process.env.OPENAI_API_ORG ?? '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',

  IRC_USERNAME: 'TripBot',
  IRC_PASSWORD: process.env.IRC_PASSWORD,

  MOODLE_TOKEN: process.env.MOODLE_TOKEN,
  MOODLE_URL: isProd ? 'https://learn.tripsit.me' : 'https://learn.tripsit.io',

  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,

  // ROLLBAR_TOKEN: process.env.ROLLBAR_TOKEN,
  SENTRY_TOKEN: process.env.SENTRY_TOKEN,

  VUE_APP_PASSWORD: process.env.VUE_APP_PASSWORD,
  VUE_APP_USERNAME: process.env.VUE_APP_USERNAME,

  MATRIX_HOMESERVER_URL: 'https://matrix.tripsit.me',
  MATRIX_ACCESS_TOKEN: process.env.MATRIX_ACCESS_TOKEN,

  KEYCLOAK_BASE_URL: process.env.KEYCLOAK_BASE_URL,
  KEYCLOAK_REALM_NAME: process.env.KEYCLOAK_REALM_NAME,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  RAPID_TOKEN: process.env.RAPID_TOKEN,
  WOLFRAM_TOKEN: process.env.WOLFRAM_TOKEN,
  IMGUR_ID: process.env.IMGUR_ID,
  IMGUR_SECRET: process.env.IMGUR_SECRET,
  YOUTUBE_TOKEN: process.env.YOUTUBE_TOKEN,
  IMDB_TOKEN: process.env.IMDB_TOKEN,
  LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN,

  POSTGRES_DB_URL: process.env.POSTGRES_DB_URL,

  SONAR_URL: process.env.SONAR_URL,
  SONAR_TOKEN: process.env.SONAR_TOKEN,

  HTTP_PORT: '8080',

  TS_ICON_URL: 'https://i.gyazo.com/b48b08a853fefaafb6393837eec1a501.png',
  FLAME_ICON_URL: 'https://i.gyazo.com/19276c297cca0761dc9689ac7c320b8e.png',
  DISCLAIMER: 'Dose responsibly!',

  CHANNEL_TICKETBOOTH: isProd ? '1014889750206881792' : '1052634079960518778',
  CHANNEL_WELCOME: isProd ? '1021385869262864464' : '1052634082263187456',

  CATEGORY_STATS: isProd ? '994027890364645496' : '1052634078924521522',
  CHANNEL_STATS_TOTAL: isProd ? '1046785093085175829' : '1052634102467133560',
  CHANNEL_STATS_ONLINE: isProd ? '1046785132171902976' : '1052634108746006538',
  CHANNEL_STATS_MAX: isProd ? '1046785189818400778' : '1052634106166509598',
  CHANNEL_STATS_VERIFIED: isProd ? '1047870589777477652' : '1052634103578640535',

  CATEGORY_GATEWAY: isProd ? '538811485158244373' : '1052634081051037716',
  CHANNEL_START: isProd ? '955482136075436043' : '1052634104681734194',
  CHANNEL_ANNOUNCEMENTS: isProd ? '834959455111348244' : '1052634107605172224',
  CHANNEL_FAQ: isProd ? '1037341998664921168' : '1052634111157743666',
  CHANNEL_RULES: isProd ? '834959422627381279' : '1052634112881610834',
  CHANNEL_BOTSPAM: isProd ? '955809644524216390' : '1052634115750506547',
  CHANNEL_HELPDESK: isProd ? '970695525693288498' : '1052634118309040228',
  CHANNEL_KUDOS: isProd ? '1001229603911782410' : '1052634125544202432',
  CHANNEL_BESTOF: isProd ? '991811665484071003' : '1052634127301607504',
  CHANNEL_SUGGESTIONS: isProd ? '955495651200872549' : '1052634120846573568',

  CATEGORY_HARMREDUCTIONCENTRE: isProd ? '848555446394552370' : '1052634083760554035',
  CHANNEL_HOW_TO_VOLUNTEER: isProd ? '1132170908673523783' : '1100939318404595853',
  CHANNEL_TRIPSITMETA: isProd ? '1022851085884477471' : '1052634134738120795',
  CHANNEL_TRIPSIT: isProd ? '955834628881653791' : '1116369196943679580',
  CHANNEL_OPENTRIPSIT1: isProd ? '979179104903524394' : '1052634142405296219',
  CHANNEL_OPENTRIPSIT2: isProd ? '988161015680225350' : '1052634143684562985',
  CHANNEL_WEBTRIPSIT1: isProd ? '1021398463059083274' : '1052634145425199184',
  CHANNEL_WEBTRIPSIT2: isProd ? '1021398501915119757' : '1052634146758983751',
  CHANNEL_CLOSEDTRIPSIT: isProd ? '986717482368782366' : '1052634147874680963',
  CHANNEL_RTRIPSIT: isProd ? '997485248503885894' : '1052634149279764530',
  CHANNEL_HRRESOURCES: isProd ? '1020172722304729088' : '1052634151989297304',
  CHANNEL_DRUGQUESTIONS: isProd ? '1019792079498530867' : '1052634153746698270',

  CATEGORY_BACKSTAGE: isProd ? '848731346959335445' : '1052634085803180062',
  CHANNEL_PETS: isProd ? '978686531852189747' : '1052634157899067463',
  CHANNEL_FOOD: isProd ? '981920414898991104' : '1052634159262208050',
  CHANNEL_OCCULT: isProd ? '1034628607294853130' : '1052634162101768313',
  CHANNEL_MUSIC: isProd ? '954887822786048001' : '1052634160726032384',
  CHANNEL_MEMES: isProd ? '1005232942269857843' : '1052634163330699375',
  CHANNEL_MOVIES: isProd ? '992136601767514162' : '1052634165264257035',
  CHANNEL_GAMING: isProd ? '873385311613382677' : '1052634167764070490',
  CHANNEL_SCIENCE: isProd ? '975037860644261939' : '1052634166639984680',
  CHANNEL_CREATIVE: isProd ? '958727922699628564' : '1052634169341136926',
  CHANNEL_COMPSCI: isProd ? '1025919891011797112' : '1052634171429892120',
  CHANNEL_REPLICATIONS: isProd ? '1047967867867504640' : '1052634172713345085',
  CHANNEL_PHOTOGRAPHY: isProd ? '1049785900013461534' : '1052634174055522355',
  CHANNEL_RECOVERY: isProd ? '1052630672646344794' : '1052634286085390537',

  CATEGORY_CAMPGROUND: isProd ? '992484502909747230' : '1052634087753519154',
  CHANNEL_LOUNGE: isProd ? '851192630469722133' : '1052634176161054782',
  CHANNEL_VIPLOUNGE: isProd ? '848826318308507658' : '1052634179285831742',
  CHANNEL_GOLDLOUNGE: isProd ? '974304894037155880' : '1052634181311672332',
  // CHANNEL_REALTALK: isProd ? '993562308355833947' : '1020770403364388875',
  CHANNEL_SANCTUARY: isProd ? '851141955080421396' : '1052634177373212692',
  CHANNEL_TREES: isProd ? '1006911613690970142' : '1052634183534661692',
  CHANNEL_OPIATES: isProd ? '1027238663463112844' : '1052634185149456394',
  CHANNEL_STIMULANTS: isProd ? '988161828825743400' : '1052634186420322315',
  CHANNEL_DEPRESSANTS: isProd ? '848826987048075294' : '1052634187615711282',
  CHANNEL_DISSOCIATIVES: isProd ? '978051567989178388' : '1052634188823658496',
  CHANNEL_PSYCHEDELICS: isProd ? '996096935805063188' : '1052634190203596850',

  CATEGORY_VOICE: isProd ? '1108008906095067187' : '1052634087753519154',
  CHANNEL_CAMPFIRE: isProd ? '1000559873232207902' : '1111013026603204728',

  CATEGORY_ARCADE: isProd ? '1025976352723185726' : '1052634089238311002',
  CHANNEL_TRIPTOWN: isProd ? '1071245245934751764' : '1075858181760233543',
  CHANNEL_TRIVIA: isProd ? '1007725155981733970' : '1052634191973593118',
  CHANNEL_GAMES: isProd ? '1024259114056036402' : '1052634193655513169',
  CHANNEL_MIDJOURNEY: isProd ? '1024348745770471484' : '1052634195186425866',

  CATEGORY_COLLABORATION: isProd ? '991688510325133362' : '1052634092425982023',
  CHANNEL_COLLABVC: isProd ? '' : '1052634128757043220',
  CHANNEL_GROUPCOLLAB: isProd ? '' : '1052634196352442408',

  CATEGORY_TEAMTRIPSIT: isProd ? '1002624862151512124' : '1052634096397983764',
  CHANNEL_INTRODUCTIONS: isProd ? '' : '1052634216464126083',
  CHANNEL_APPLICATIONS: isProd ? '1022849531974529104' : '1052634218351562842',
  CHANNEL_INTANNOUNCE: isProd ? '' : '1052634220167700591',
  CHANNEL_TALKTOTS: isProd ? '' : '1052634222206124053',
  CHANNEL_MODHAVEN: isProd ? '946466454142877747' : '1052634224273916004',
  CHANNEL_TEAMTRIPSIT: isProd ? '327616683248189440' : '1052634226454954044',
  CHANNEL_MODERATORS: isProd ? '332618867970932737' : '1052634231391649862',
  CHANNEL_TRIPSITTERS: isProd ? '1029798258735857784' : '1052634228191400016',
  CHANNEL_DEVELOPERS: isProd ? '1143239076426813502' : '1052634229781045268',
  CHANNEL_MODLOG: isProd ? '943552707564830760' : '1052634232817733662',
  CHANNEL_BOTLOG: isProd ? '992492502131150848' : '1052634233711108169',
  CHANNEL_MSGLOG: isProd ? '1047870195722620958' : '1052634236760375337',
  CHANNEL_AUDITLOG: isProd ? '1047871153127047168' : '1052634238404534292',
  CHANNEL_TEAMMEETING: isProd ? '851117188815126568' : '1052634238404534292',

  CATEGORY_DEVELOPMENT: isProd ? '961979608553640046' : '1052634097631113287',
  CHANNEL_DEVANNCOUNCE: isProd ? '978752443007520898' : '1052634240572993567',
  CHANNEL_DEVOFFTOPIC: isProd ? '975038983245545472' : '1052634242221342751',
  CHANNEL_DEVELOPMENT: isProd ? '834965529239355424' : '1052634243509002360',
  CHANNEL_DISCORD: isProd ? '973734296835739708' : '1052634245039919154',
  CHANNEL_TRIPBOT: isProd ? '960158893957345311' : '1052634246747005058',
  CHANNEL_DBAPI: isProd ? '' : '1052634248571527251',
  CHANNEL_WEBSITE: isProd ? '' : '1052634250131808276',
  CHANNEL_CONTENT: isProd ? '946833118269145109' : '1052634251490762802',
  CHANNEL_DESIGN: isProd ? '991398683444781206' : '1052634253294317608',
  CHANNEL_IRC: isProd ? '983801414897791067' : '1052634255269826622',
  CHANNEL_MATRIX: isProd ? '1022542674055671861' : '1052634256674926622',
  CHANNEL_TRIPMOBILE: isProd ? '961979713713238106' : '1052634258080026675',
  CHANNEL_SANDBOX: isProd ? '943599582921756732' : '1052634261531926538',
  CHANNEL_TECHHELP: isProd ? '' : '1052634262635020319',
  CHANNEL_BOTERRORS: isProd ? '1081018048858824835' : '1081018727992152185',
  CHANNEL_DEVELOPMENTVOICE: isProd ? '970848692158464021' : '1052634132729036820',
  CHANNEL_AILOG: isProd ? '1137781426444574801' : '1137747287607623800',
  CHANNEL_AIIMAGELOG: isProd ? '1175554418414989504' : '1175521105054810214',
  CHANNEL_AIMOD_LOG: isProd ? '1169746977811091577' : '1169747347165687838',

  CATEGORY_RADIO: isProd ? '981069604665327646' : '1052634090819551436',
  CHANNEL_SYNTHWAVERADIO: isProd ? '1050099921811939359' : '1052634114693541898',
  CHANNEL_LOFIRADIO: isProd ? '1130662704001065062' : '1052634116975231019',
  CHANNEL_JAZZRADIO: isProd ? '1093192174998405181' : '1052634119458275459',
  CHANNEL_SLEEPYRADIO: isProd ? '1130662794346373172' : '1052634122222309386',
  CHANNEL_FUTON: isProd ? '1111206330594762803' : '1111208569942061087',

  CATEGORY_ARCHIVED: isProd ? '' : '1052634099149443083',
  CHANNEL_SANDBOX_DEV: isProd ? '' : '960606558373441565',
  CHANNEL_MINECRAFTADMIN: isProd ? '984546313079234610' : '',
  CHANNEL_TRIPSITREDDIT: isProd ? '968307686020091925' : '978656311623446689',
  CHANNEL_VIPWELCOME: isProd ? '978051268134203402' : '978030823892733973',
  CHANNEL_CLEARMIND: isProd ? '978051375474806864' : '978031512429670421',
  CHANNEL_PSYCHONAUT: isProd ? '991439973498769560' : '960606558549594167',
  CHANNEL_DISSONAUT: isProd ? '978051567989178388' : '978032903541911662',
  CHANNEL_DELERIANTS: isProd ? '992134853816483870' : '992160017971155066',
  CHANNEL_MINECRAFT: isProd ? '984546283861737512' : '988100049944850493',
  CHANNEL_TRIPSITME: isProd ? '332618560675512320' : '960606559140974656',
  CHANNEL_OPERATORS: isProd ? '334014182678593536' : '960606559140974655',
  CHANNEL_TRIPSITRADIO: isProd ? '' : '1052634139435749377',

  ROLE_DIRECTOR: isProd ? '185175683184590849' : '960606558134362217',
  ROLE_SUCCESSOR: isProd ? '980235574868865084' : '1052644614827429918',
  ROLE_LEADDEV: isProd ? '980237741721788476' : '981901424642379826',
  ROLE_IRCADMIN: isProd ? '980236747067752549' : '1052644617054593218',
  ROLE_DISCORDADMIN: isProd ? '978640233715355729' : '1052644617989914755',
  ROLE_MODERATOR: isProd ? '251468986141638667' : '1052644618971389982',
  ROLE_TRIPSITTER: isProd ? '327619241953984513' : '1052644620850450582',
  ROLE_DEVELOPER: isProd ? '972964801955364944' : '1052644622230364241',
  ROLE_SOCIALMEDIA: isProd ? '' : '1052644623077621840',
  ROLE_TEAMTRIPSIT: isProd ? '947906522824986716' : '1052644640580456490',
  ROLE_TRIPBOTDEV: isProd ? '999359483455217675' : '1052644624042295346',
  ROLE_MATRIXADMIN: isProd ? '' : '960606558134362216',
  ROLE_DMMEFORHELP: isProd ? '' : '1052644616039575602',
  ROLE_TRIPBOT: isProd ? '957783151718047745' : '1052644624042295346',
  ROLE_BOTS: isProd ? '848557098726850590' : '1052644625648734249',

  ROLE_UNDERBAN: isProd ? '958017108036448287' : '1052644627276103690',
  ROLE_MUTED: isProd ? '959577073561767936' : '981905918650351656',
  ROLE_TEMPVOICE: isProd ? '955841809899221072' : '1052644663749783622',
  ROLE_JOINVC: isProd ? '1132222895893008384' : '1134110886672486561',

  ROLE_HELPER: isProd ? '1151541717527437393' : '1052644660876677120',
  ROLE_TRIPSITTING_101: isProd ? '1100937689034924142' : '1151547228679323799',

  ROLE_NEEDSHELP: isProd ? '955853983287754782' : '1052644629591367761',
  ROLE_RESEARCHER: isProd ? '976283188768956417' : '978040177987575890',
  ROLE_CLEARMIND: isProd ? '978050265645187122' : '978039843751858267',
  ROLE_CONTRIBUTOR: isProd ? '834911723361402943' : '1052644661874917477',
  ROLE_OCCULT: isProd ? '1034629359555838002' : '1052644691608358983',
  ROLE_RECOVERY: isProd ? '1052629812566573137' : '1052644692711456888',
  ROLE_DJ: isProd ? '955451412878331974' : '960606558050480157',
  ROLE_VERIFIED: isProd ? '1009864163478216775' : '1052644673816104990',
  ROLE_VERIFYING: isProd ? '1102572404812808296' : '1114087859029278740',
  ROLE_UNVERIFIED: isProd ? '1102582379169722458' : '1114087822295568446',
  ROLE_FRANK: isProd ? '' : '1052644688554905630',
  ROLE_ALUMNI: isProd ? '' : '1052644662793490532',

  ROLE_COLLABORATOR: isProd ? '' : '1052644650017628161',

  ROLE_LEGACY: isProd ? '943600905289334784' : '1169902575299084399',
  ROLE_VIP: isProd ? '943600905289334784' : '1052644659870048316',
  ROLE_VIP_0: isProd ? '1007115915734831185' : '1052644658565623848',
  ROLE_VIP_10: isProd ? '955451412878331974' : '1052644657395421245',
  ROLE_VIP_20: isProd ? '1002618571949625385' : '1052644656774647860',
  ROLE_VIP_30: isProd ? '1002259862199206038' : '1052644655591866479',
  ROLE_VIP_40: isProd ? '1002618888422428802' : '1052644654560055458',
  ROLE_VIP_50: isProd ? '1002262327481081977' : '1052644653427609660',
  ROLE_VIP_60: isProd ? '1064796168011395072' : '1080533111965757572',
  ROLE_VIP_70: isProd ? '1064796232263942144' : '1080533190776721528',
  ROLE_VIP_80: isProd ? '1064796240379912212' : '1080533230316429322',
  ROLE_VIP_90: isProd ? '1064796243626311720' : '1080533274079793282',
  ROLE_VIP_100: isProd ? '1064796247669616753' : '1080533329813704856',

  ROLE_PRONOUN_HE: isProd ? '994295698147246210' : '1052644672754962442',
  ROLE_PRONOUN_SHE: isProd ? '994295697589407744' : '1052644671714766929',
  ROLE_PRONOUN_THEY: isProd ? '994295696868003910' : '1052644670305472542',
  ROLE_PRONOUN_ANY: isProd ? '994295695102185552' : '1052644668384489573',
  ROLE_PRONOUN_ASK: isProd ? '994295696159150131' : '1052644667554009118',

  ROLE_ANNOUNCEMENTS: isProd ? '1066606644978532372' : '1079979922321330196',
  ROLE_TRIPBOTUPDAES: isProd ? '1070227886625259623' : '1079979930353418260',
  ROLE_TRIPTOWNNOTICES: isProd ? '1071809618239557703' : '1079979933247488090',

  ROLE_HR_PRESENTER: isProd ? '958387147084296232' : '1052644665784012860',
  ROLE_HR_LISTENER: isProd ? '958387225782026271' : '1052644666559959171',
  ROLE_HR_MODERATOR: isProd ? '958387343058960434' : '1052644664798347284',

  ROLE_VOTEBANNED: isProd ? '991811000301015140' : '989286991633977368',
  ROLE_VOTEKICKED: isProd ? '991811100922364114' : '989287048621985812',
  ROLE_VOTETIMEOUT: isProd ? '991811200901976259' : '989287095367528578',
  ROLE_VUTEUNDERBAN: isProd ? '991811318464139416' : '989287082222579792',

  ROLE_PATRON_TIER_0: isProd ? '954133862601089095' : '1052644652349665310',
  ROLE_PATRON_TIER_1: isProd ? '' : '1182345635790327868',
  ROLE_PATRON_TIER_2: isProd ? '' : '1182345770838523934',
  ROLE_PATRON_TIER_3: isProd ? '' : '1182345731038777364',
  ROLE_PATRON_TIER_4: isProd ? '' : '1182346555144015984',

  ROLE_BOOSTER: isProd ? '853082033224024135' : '1167725202302574642',
  ROLE_PREMIUM: isProd ? '1139454371613122640' : '1167714206418735144',
  ROLE_DONATIONTRIGGER: isProd ? '1172503141481189407' : '1171007453903732776',

  ROLE_DRUNK: isProd ? '955485069294854154' : '1052644628639252500',
  ROLE_HIGH: isProd ? '955482289335320626' : '1052644630912577586',
  ROLE_ROLLING: isProd ? '955485203592261633' : '1052644633492082819',
  ROLE_TRIPPING: isProd ? '955485936915980348' : '1052644632409935872',
  ROLE_DISSOCIATING: isProd ? '955485314305101874' : '1052644634460963038',
  ROLE_STIMMING: isProd ? '955485549035126815' : '1052644635559870525',
  ROLE_SEDATED: isProd ? '955485615879749682' : '1052644636511965184',
  ROLE_TALKATIVE: isProd ? '981437055030677554' : '1052644638487486464',
  ROLE_VOICECHATTY: isProd ? '1094637167202009128' : '1110453458013798420',
  ROLE_BUSY: isProd ? '1111179084165304381' : '1111181986036469790',

  ROLE_H_HAT: isProd ? '1178157925265575966' : '',
  ROLE_H_TREE: isProd ? '1178158444994367661' : '',
  ROLE_H_CANDY: isProd ? '1178158084867235931' : '',
  ROLE_H_REINDEER: isProd ? '1178157989497151579' : '',
  ROLE_H_SNOWFLAKE: isProd ? '1178158031855440012' : '',

  ROLE_TTS_H_HAT: isProd ? '1178152592916893757' : '',
  ROLE_TTS_H_TREE: isProd ? '1178153869885321307' : '',
  ROLE_TTS_H_CANDY: isProd ? '1178153921873707160' : '',
  ROLE_TTS_H_REINDEER: isProd ? '1178153742424604813' : '',
  ROLE_TTS_H_SNOWFLAKE: isProd ? '1178153806077374556' : '',

  ROLE_TTS_DRUNK: isProd ? '1104648635691577414' : '1110471812053213245',
  ROLE_TTS_HIGH: isProd ? '1104648442732613733' : '1110478575695568947',
  ROLE_TTS_ROLLING: isProd ? '1104648578242191372' : '1110478674580475994',
  ROLE_TTS_TRIPPING: isProd ? '1104648782404128808' : '1110457165258424360',
  ROLE_TTS_DISSOCIATING: isProd ? '1104648741245435964' : '1110478749469782077',
  ROLE_TTS_STIMMING: isProd ? '1104648557362954291' : '1110478814024306740',
  ROLE_TTS_SEDATED: isProd ? '1104648491554308156' : '1110478863378698261',
  ROLE_TTS_TALKATIVE: isProd ? '1079954878606086254' : '1110478915388063755',
  ROLE_TTS_VOICECHATTY: isProd ? '1104648238566473769' : '1110479003476828280',
  ROLE_TTS_BUSY: isProd ? '1111180620807274506' : '1111181891970805821',

  ROLE_TRIVIABIGBRAIN: isProd ? '' : '1052644639464767548',

  ROLE_RED: isProd ? '957299004415295539' : '1052644675019866153',
  ROLE_ORANGE: isProd ? '957299049499877378' : '1052644677570007090',
  ROLE_YELLOW: isProd ? '957299118546518017' : '1052644676349476927',
  ROLE_GREEN: isProd ? '957299256941740072' : '1052644681290366986',
  ROLE_BLUE: isProd ? '957299516833411163' : '1052644682213097593',
  ROLE_PURPLE: isProd ? '957299595644403772' : '1052644683383328798',
  ROLE_PINK: isProd ? '958073126485368922' : '1052644684473839746',
  ROLE_WHITE: isProd ? '957298729675784273' : '1052644687065911406',

  ROLE_DONOR_RED: isProd ? '1053760004060090389' : '1055267028753186888',
  ROLE_DONOR_ORANGE: isProd ? '1053760016773042206' : '1055267113998229574',
  ROLE_DONOR_YELLOW: isProd ? '1053760021734883518' : '1055267121875144704',
  ROLE_DONOR_GREEN: isProd ? '1053760024977088572' : '1055267128988684288',
  ROLE_DONOR_BLUE: isProd ? '1053760309095059536' : '1055267132591591525',
  ROLE_DONOR_PURPLE: isProd ? '1053760303332065312' : '1055267157405081711',
  ROLE_DONOR_BLACK: isProd ? '957298800236564481' : '1092192782547947680',
  ROLE_DONOR_PINK: isProd ? '1053759289791086782' : '1055267162551492708',

  ROLE_TS100: isProd ? '1100937689034924142' : '1100937537096269844',
};

export default env;

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var env: any; // NOSONAR
}

global.env = env;
