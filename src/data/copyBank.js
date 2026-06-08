// Vocabulary keyed by content archetype.
// Archetypes: saas | dev | gaming | kids | wellness | editorial | creative
// Detection logic lives in copyEngine.js → getArchetype()

export const copyBank = {
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
    dev:       'open_prs',
    gaming:    'LEVEL',
    kids:      'Stars earned',
    wellness:  'Practices',
    editorial: 'Commissions',
    creative:  'Live briefs',
  },

  // Metric 2 label — ideas/throughput
  metricProgress: {
    saas:      'Ideas this week',
    dev:       'builds_today',
    gaming:    'XP THIS WEEK',
    kids:      'Badges',
    wellness:  'Mindful minutes',
    editorial: 'Published',
    creative:  'Explorations',
  },

  // Metric 3 label — time/focus (currently hardcoded "Hours Focused")
  metricHours: {
    saas:      'Hours focused',
    dev:       'test_pass%',
    gaming:    'HOURS PLAYED',
    kids:      'Days played',
    wellness:  'Streak',
    editorial: 'In progress',
    creative:  'Studio days',
  },

  // Metric 4 label — completion/shipped (currently hardcoded "Shipped")
  metricShipped: {
    saas:      'Shipped',
    dev:       'deploys',
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

  // Project list data — 4 projects per archetype
  projects: {
    saas: [
      { name: 'Design Dial',    tag: 'UI Design',  progress: 80 },
      { name: 'Brand System',   tag: 'Branding',   progress: 60 },
      { name: 'Misread',        tag: 'Product',    progress: 30 },
      { name: 'Steam Memories', tag: 'Case Study', progress: 10 },
    ],
    dev: [
      { name: 'design-dial',   tag: 'typescript', progress: 80 },
      { name: 'auth-service',  tag: 'rust',       progress: 60 },
      { name: 'ml-pipeline',   tag: 'python',     progress: 30 },
      { name: 'cli-tools',     tag: 'go',         progress: 10 },
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
      { name: 'Identity',         tag: 'Brand',       progress: 80 },
      { name: 'Terrain',          tag: 'Photography', progress: 60 },
      { name: 'Solitude',         tag: 'Essay',       progress: 30 },
      { name: 'The Long Season',  tag: 'Series',      progress: 10 },
    ],
    creative: [
      { name: 'Meridian',           tag: 'Identity',    progress: 80 },
      { name: 'Signal',             tag: 'Photography', progress: 60 },
      { name: 'Paper Architecture', tag: '3D',          progress: 30 },
      { name: 'Futures',            tag: 'Exhibition',  progress: 10 },
    ],
  },
}
