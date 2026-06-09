// Vocabulary keyed by content archetype.
// Archetypes: saas | dev | gaming | kids | wellness | editorial | creative
// Detection logic lives in copyEngine.js → getArchetype()

export const copyBank = {
  // Wordmark text shown in the canvas nav bar
  wordmark: {
    saas:      'Arc',
    dev:       'arc.',
    gaming:    'ARC',
    kids:      'Arcadia',
    wellness:  'Arc',
    editorial: 'Arc',
    creative:  'Arc',
  },

  // Whether the project list shows a progress bar ('bar') or status word ('status')
  progressStyle: {
    saas:      'bar',
    dev:       'bar',
    gaming:    'bar',
    kids:      'bar',
    wellness:  'bar',
    editorial: 'status',
    creative:  'bar',
  },

  // Primary nav link (first link after wordmark)
  navMain: {
    saas:      'Dashboard',
    dev:       '/projects',
    gaming:    'PLAY',
    kids:      'Home',
    wellness:  'Today',
    editorial: 'Portfolio',
    creative:  'Work',
  },

  // Secondary nav links [0] and [1] (currently hardcoded "Activity" / "Settings")
  navLinks: {
    saas:      ['Activity', 'Settings'],
    dev:       ['stdout', 'config'],
    gaming:    ['LEADERBOARD', 'SETTINGS'],
    kids:      ['Stars', 'Friends'],
    wellness:  ['Journal', 'Goals'],
    editorial: ['Journal', 'Studio'],
    creative:  ['Process', 'Studio'],
  },

  // Nav CTA button
  cta: {
    saas:      'New project',
    dev:       'git init',
    gaming:    'START GAME',
    kids:      "Let's play!",
    wellness:  'Begin',
    editorial: 'New commission',
    creative:  'Open brief',
  },

  // Metric 1 label — active/primary count
  metricActivity: {
    saas:      'Active projects',
    dev:       'tokens_live',
    gaming:    'LEVEL',
    kids:      'Stars earned',
    wellness:  'Practices',
    editorial: 'Commissions',
    creative:  'Live briefs',
  },

  // Metric 2 label — ideas/throughput
  metricProgress: {
    saas:      'Ideas this week',
    dev:       'archetypes',
    gaming:    'XP THIS WEEK',
    kids:      'Badges',
    wellness:  'Mindful minutes',
    editorial: 'Published',
    creative:  'Explorations',
  },

  // Metric 3 label — time/focus (currently hardcoded "Hours Focused")
  metricHours: {
    saas:      'Hours focused',
    dev:       'font_families',
    gaming:    'HOURS PLAYED',
    kids:      'Days played',
    wellness:  'Streak',
    editorial: 'In progress',
    creative:  'Studio days',
  },

  // Metric 4 label — completion/shipped (currently hardcoded "Shipped")
  metricShipped: {
    saas:      'Shipped',
    dev:       'css_exports',
    gaming:    'ACHIEVEMENTS',
    kids:      'Quests done',
    wellness:  'Milestones',
    editorial: 'Archived',
    creative:  'Delivered',
  },

  // Chart section label (currently hardcoded "WEEKLY OUTPUT")
  chartLabel: {
    saas:      'Weekly output',
    dev:       'commit_activity',
    gaming:    'WEEKLY STATS',
    kids:      'This week',
    wellness:  'Weekly rhythm',
    editorial: 'Recent output',
    creative:  'Studio output',
  },

  // Project list section label (currently hardcoded "PROJECTS")
  projectsLabel: {
    saas:      'Projects',
    dev:       'repositories',
    gaming:    'Active missions',
    kids:      'Adventures',
    wellness:  'Practices',
    editorial: 'Selected work',
    creative:  'Active work',
  },

  // Add / create button in the input section
  addButton: {
    saas:      'Create',
    dev:       'init',
    gaming:    'LAUNCH',
    kids:      'Go!',
    wellness:  'Add',
    editorial: 'Archive',
    creative:  'Brief',
  },

  // Input placeholder
  inputPlaceholder: {
    saas:      'Project name',
    dev:       'repo_name',
    gaming:    'Mission name',
    kids:      'Name your quest',
    wellness:  'New practice',
    editorial: 'New commission',
    creative:  'Brief title',
  },

  // Empty state headline (collaborators section)
  emptyHeadline: {
    saas:      'No collaborators yet',
    dev:       '0 collaborators',
    gaming:    'NO SQUAD MEMBERS',
    kids:      'No friends yet!',
    wellness:  'Flying solo',
    editorial: 'No contributors',
    creative:  'Studio is solo',
  },

  // Empty state subtext
  emptySubtext: {
    saas:      'Invite collaborators to get started.',
    dev:       'No entries in collaborators[].',
    gaming:    'Add squad members to play together.',
    kids:      'Invite a friend to join your adventure!',
    wellness:  'Invite someone to join your practice.',
    editorial: 'No contributors have been assigned.',
    creative:  'Add a collaborator to the brief.',
  },

  // Chart data — 7 day values (Mon–Sun) per archetype
  chartData: {
    saas:      [3, 5, 6, 4, 5, 1, 2],
    dev:       [2, 7, 5, 8, 6, 4, 1],
    gaming:    [2, 3, 2, 4, 5, 9, 9],
    kids:      [7, 6, 8, 5, 7, 9, 8],
    wellness:  [5, 4, 6, 5, 6, 5, 0],
    editorial: [0, 0, 4, 0, 7, 3, 0],
    creative:  [0, 3, 7, 4, 8, 5, 1],
  },

  // Metric card values — [activity, progress, hours, shipped] per archetype
  metricValues: {
    saas:      ['7',   '23',    '18.5h', '3'],
    dev:       ['20+', '7',     '4',     '12'],
    gaming:    ['42',  '8,240', '14h',   '38'],
    kids:      ['4',   '17',    '8',     '12'],
    wellness:  ['3',   '45',    '21',    '7'],
    editorial: ['6',   '2',     '4',     '28'],
    creative:  ['5',   '9',     '14',    '4'],
  },

  // Progress unit suffix shown after the progress number in project rows
  progressUnit: {
    saas:      '%',
    dev:       '%',
    gaming:    ' XP',
    kids:      '%',
    wellness:  '%',
    editorial: '%',
    creative:  '%',
  },

  // Section label above the collaborators / team empty-state card
  sectionTeam: {
    saas:      'Team',
    dev:       'collaborators',
    gaming:    'Squad',
    kids:      'Friends',
    wellness:  'Community',
    editorial: 'Contributors',
    creative:  'Collaborators',
  },

  // Project list data — 4 projects per archetype
  projects: {
    saas: [
      { name: 'Design Dial',    tag: 'UI Design',  progress: 80 },
      { name: 'Brand System',   tag: 'Branding',   progress: 60 },
      { name: 'Misread',        tag: 'Product',    progress: 30 },
      { name: 'Steam Memories', tag: 'Case Study', progress: 10 },
    ],
    dev: [
      { name: 'tokenEngine.js',        tag: 'engine', progress: 80 },
      { name: 'copyEngine.js',         tag: 'engine', progress: 60 },
      { name: 'personalityEngine.js',  tag: 'engine', progress: 55 },
      { name: 'useDialState.js',       tag: 'hook',   progress: 30 },
    ],
    gaming: [
      { name: 'The Last Frontier', tag: 'RPG',      progress: 80 },
      { name: 'Shadow Protocol',   tag: 'FPS',      progress: 60 },
      { name: 'Neon Drift',        tag: 'Racing',   progress: 30 },
      { name: 'Void Runners',      tag: 'Survival', progress: 10 },
    ],
    kids: [
      { name: 'Dragon Quest',  tag: 'Adventure', progress: 80 },
      { name: 'Star Explorer', tag: 'Space',     progress: 60 },
      { name: 'Magic Garden',  tag: 'Puzzle',    progress: 30 },
      { name: 'Dino Friends',  tag: 'Story',     progress: 10 },
    ],
    wellness: [
      { name: 'Morning meditation', tag: 'Mindfulness', progress: 80 },
      { name: 'Evening yoga',       tag: 'Movement',    progress: 60 },
      { name: 'Breathwork',         tag: 'Breathing',   progress: 30 },
      { name: 'Journaling',         tag: 'Reflection',  progress: 10 },
    ],
    editorial: [
      { name: 'Identity',        tag: 'Brand',       progress: 80, status: 'In progress' },
      { name: 'Terrain',         tag: 'Photography', progress: 60, status: 'Ongoing'     },
      { name: 'Solitude',        tag: 'Essay',       progress: 30, status: 'Draft'       },
      { name: 'The Long Season', tag: 'Series',      progress: 10, status: 'Archived'    },
    ],
    creative: [
      { name: 'Meridian',           tag: 'Identity',    progress: 80 },
      { name: 'Signal',             tag: 'Photography', progress: 60 },
      { name: 'Paper Architecture', tag: '3D',          progress: 30 },
      { name: 'Futures',            tag: 'Exhibition',  progress: 10 },
    ],
  },
}
