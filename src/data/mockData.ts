export const tournaments = [
  { id: '1', name: 'KVPL', fullName: 'Karnataka Village Premier League', status: 'ongoing' },
  { id: '2', name: 'Karavali', fullName: 'Karavali Coastal Cup', status: 'ongoing' },
  { id: '3', name: 'Malenadu', fullName: 'Malenadu Monsoon Trophy', status: 'upcoming' },
  { id: '4', name: 'BTL', fullName: 'Brahmavara Tennis Ball League', status: 'ongoing' },
  { id: '5', name: 'SPL', fullName: 'Sirsi Premier League', status: 'upcoming' },
  { id: '6', name: 'KPL', fullName: 'Kundapura Premier League', status: 'completed' },
];

export const todayMatches = [
  {
    id: 'm1',
    tournamentId: '1',
    tournamentName: 'KVPL',
    team1: { name: 'Agumbe Avengers', score: '155/7', overs: '19.3' },
    team2: { name: 'Sringeri Strikers', score: '0/0', overs: '0' },
    status: 'live',
    matchType: 'Qualifier 2',
    venue: 'Agumbe Ground',
  },
  {
    id: 'm2',
    tournamentId: '2',
    tournamentName: 'Karavali',
    team1: { name: 'Malpe Mariners', score: '180/4', overs: '20.0' },
    team2: { name: 'Kaup Kings', score: '175/8', overs: '20.0' },
    status: 'completed',
    matchType: 'Match 42',
    venue: 'Malpe Beach Ground',
  },
  {
    id: 'm3',
    tournamentId: '1',
    tournamentName: 'KVPL',
    team1: { name: 'Barkur Bulls', score: '89/3', overs: '10.2' },
    team2: { name: 'Saligrama Spartans', score: '0/0', overs: '0' },
    status: 'live',
    matchType: 'Eliminator',
    venue: 'Barkur Maidan',
  },
  {
    id: 'm4',
    tournamentId: '4',
    tournamentName: 'BTL',
    team1: { name: 'Hebri Heroes', score: '210/2', overs: '20.0' },
    team2: { name: 'Perdoor Panthers', score: '190/9', overs: '20.0' },
    status: 'completed',
    matchType: 'Semi-Final 1',
    venue: 'Brahmavara College Ground',
  },
  {
    id: 'm5',
    tournamentId: '3',
    tournamentName: 'Malenadu',
    team1: { name: 'Thirthahalli Titans', score: '-', overs: '-' },
    team2: { name: 'Koppa Knights', score: '-', overs: '-' },
    status: 'upcoming',
    matchType: 'Match 1',
    venue: 'Thirthahalli Stadium',
    time: '19:00 IST',
  },
  {
    id: 'm6',
    tournamentId: '5',
    tournamentName: 'SPL',
    team1: { name: 'Yellapur Youth', score: '-', overs: '-' },
    team2: { name: 'Mundgod Mavericks', score: '-', overs: '-' },
    status: 'upcoming',
    matchType: 'Match 1',
    venue: 'Sirsi Ground',
    time: 'Tomorrow, 14:00 IST',
  }
];

export const featuredMatches = todayMatches.filter(m => m.status === 'live');

export const newsAnnouncements = [
  { id: 'n1', tournament: 'KVPL', text: 'Registrations open for next season in Agumbe.', date: '2h ago' },
  { id: 'n2', tournament: 'Malenadu', text: 'Finals moved to Sunday due to heavy rain forecast.', date: '5h ago' },
  { id: 'n3', tournament: 'Karavali', text: 'Local talent selected for state camp!', date: '1d ago' },
  { id: 'n4', tournament: 'BTL', text: '6 balls 6 sixes unbelievable finish by Hebri Heroes.', date: '1d ago' },
];

export const activityFeed = [
  { id: 'a1', type: 'registration', text: 'New team registered for Malenadu Trophy', time: '10m ago' },
  { id: 'a2', type: 'auction', text: 'Karavali mid-season auction tomorrow at Udupi', time: '1h ago' },
  { id: 'a3', type: 'match', text: 'KVPL Qualifier 2 is LIVE', time: '2h ago' },
];
