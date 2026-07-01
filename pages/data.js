// Sample data for Screen Time & Digital Wellbeing app designs
// Personas, apps, usage figures — used across all screens for consistency.

window.APP_DATA = {
  parent: {
    name: 'Sarah Mitchell',
    initials: 'SM',
    email: 'sarah.m@gmail.com',
  },

  kids: [
    {
      id: 'maya',
      name: 'Maya',
      age: 11,
      avatar: '#E8896F',
      initials: 'M',
      device: 'iPhone 14',
      todayMinutes: 187,
      todayGoal: 240,
      weekMinutes: 1240,
      weekGoal: 1680,
      streak: 4,
      status: 'on-track', // 'on-track' | 'near-limit' | 'over' | 'locked'
      lastActive: '12 min ago',
      categories: {
        Social: 42,
        Video: 68,
        Gaming: 51,
        Education: 18,
        Communication: 8,
      },
      topApps: [
        { name: 'YouTube Kids', cat: 'Video', mins: 54, limit: 90, notifs: 3, pickups: 12, color: '#FF4444' },
        { name: 'Roblox', cat: 'Gaming', mins: 51, limit: 60, notifs: 8, pickups: 9, color: '#E2231A' },
        { name: 'TikTok', cat: 'Social', mins: 28, limit: 45, notifs: 22, pickups: 24, color: '#000000' },
        { name: 'Messages', cat: 'Communication', mins: 8, limit: null, notifs: 14, pickups: 19, color: '#5BC236' },
        { name: 'Duolingo', cat: 'Education', mins: 18, limit: null, notifs: 2, pickups: 3, color: '#58CC02' },
        { name: 'Snapchat', cat: 'Social', mins: 14, limit: 30, notifs: 38, pickups: 31, color: '#FFFC00' },
      ],
    },
    {
      id: 'jaden',
      name: 'Jaden',
      age: 15,
      avatar: '#A8A0C8',
      initials: 'J',
      device: 'Pixel 8',
      todayMinutes: 312,
      todayGoal: 300,
      weekMinutes: 2050,
      weekGoal: 2100,
      streak: 0,
      status: 'over',
      lastActive: 'just now',
      categories: {
        Social: 124,
        Video: 88,
        Gaming: 42,
        Music: 38,
        Communication: 20,
      },
      topApps: [
        { name: 'Snapchat', cat: 'Social', mins: 67, limit: 60, notifs: 54, pickups: 42, color: '#FFFC00' },
        { name: 'TikTok', cat: 'Social', mins: 57, limit: 60, notifs: 31, pickups: 29, color: '#000000' },
        { name: 'Instagram', cat: 'Social', mins: 40, limit: 45, notifs: 22, pickups: 18, color: '#E1306C' },
        { name: 'Discord', cat: 'Communication', mins: 38, limit: null, notifs: 41, pickups: 14, color: '#5865F2' },
        { name: 'Spotify', cat: 'Music', mins: 38, limit: null, notifs: 0, pickups: 6, color: '#1DB954' },
        { name: 'YouTube', cat: 'Video', mins: 50, limit: 90, notifs: 9, pickups: 11, color: '#FF0000' },
      ],
    },
  ],

  personal: {
    name: 'Alex Chen',
    initials: 'AC',
    todayMinutes: 248,
    todayGoal: 300,
    weekMinutes: 1620,
    weekGoal: 2100,
    streak: 11,
    categories: {
      Productivity: 142,
      Communication: 48,
      Social: 32,
      Entertainment: 18,
      Reading: 8,
    },
    topApps: [
      { name: 'Slack', cat: 'Communication', mins: 48, limit: null, notifs: 38, pickups: 22, color: '#4A154B' },
      { name: 'Figma', cat: 'Productivity', mins: 64, limit: null, notifs: 4, pickups: 8, color: '#F24E1E' },
      { name: 'Chrome', cat: 'Productivity', mins: 52, limit: null, notifs: 0, pickups: 14, color: '#4285F4' },
      { name: 'Gmail', cat: 'Communication', mins: 18, limit: null, notifs: 12, pickups: 9, color: '#EA4335' },
      { name: 'Notion', cat: 'Productivity', mins: 26, limit: null, notifs: 2, pickups: 5, color: '#000000' },
      { name: 'Instagram', cat: 'Social', mins: 32, limit: 30, notifs: 18, pickups: 12, color: '#E1306C' },
    ],
  },

  // Weekly hours (Sun-Sat). [today is Thursday so Fri/Sat are projected/empty]
  weeklyHours: {
    maya:     [3.8, 2.6, 3.1, 4.2, 3.1, null, null], // null = future
    jaden:    [4.2, 5.1, 4.8, 5.6, 5.2, null, null],
    personal: [2.8, 4.6, 4.1, 4.4, 4.1, null, null],
    lastWeek: { // for comparison
      personal: [3.2, 5.1, 5.2, 5.6, 4.8, 3.1, 2.4],
    }
  },

  // 24h pickup heatmap (sessions per hour, 0-23)
  pickupHours: {
    personal: [0,0,0,0,0,0,1,3,5,8,6,4,7,5,4,6,9,11,8,5,3,2,1,0],
    maya:     [0,0,0,0,0,0,0,0,2,4,3,2,5,6,4,8,12,10,8,6,2,0,0,0],
  },

  // Notification heatmap — 7 days × 24h. Cell value = notif count.
  notifHeatmap: (() => {
    const data = [];
    for (let d = 0; d < 7; d++) {
      const row = [];
      for (let h = 0; h < 24; h++) {
        let v = 0;
        if (h >= 7 && h <= 23) {
          v = Math.round(2 + Math.sin((h - 7) / 3) * 4 + Math.random() * 8);
          if (h >= 11 && h <= 14) v += 6; // lunch spike
          if (h >= 19 && h <= 22) v += 4; // evening spike
          if (d === 5 || d === 6) v = Math.round(v * 1.3); // weekend
        }
        row.push(Math.max(0, v));
      }
      data.push(row);
    }
    return data;
  })(),

  // Ad blocker stats
  adBlocker: {
    requestsToday: 14628,
    blockedToday: 4821,
    blockedPct: 33.0,
    trackers: 2104,
    ads: 1893,
    malware: 47,
    socialWidgets: 312,
    other: 465,
    topBlocked: [
      { domain: 'doubleclick.net', count: 412, type: 'Ads' },
      { domain: 'google-analytics.com', count: 387, type: 'Tracker' },
      { domain: 'facebook.com/tr', count: 298, type: 'Tracker' },
      { domain: 'adservice.google.com', count: 241, type: 'Ads' },
      { domain: 'scorecardresearch.com', count: 198, type: 'Tracker' },
      { domain: 'amazon-adsystem.com', count: 156, type: 'Ads' },
      { domain: 'criteo.com', count: 134, type: 'Tracker' },
      { domain: 'taboola.com', count: 121, type: 'Ads' },
    ],
    devices: [
      { name: "Maya's iPhone", blocked: 1842, status: 'active' },
      { name: "Jaden's Pixel", blocked: 1456, status: 'active' },
      { name: "Sarah's MacBook", blocked: 1108, status: 'active' },
      { name: 'Family iPad', blocked: 415, status: 'paused' },
    ],
    // 24h blocked requests sparkline
    hourly: [12, 8, 5, 3, 4, 14, 48, 142, 268, 312, 388, 410, 426, 388, 342, 298, 311, 348, 412, 388, 264, 184, 98, 41],
  },

  notifications: [
    { time: '2 min ago', kid: 'jaden', kind: 'limit-hit', text: 'Jaden hit the Snapchat daily limit (60m).', icon: 'lock' },
    { time: '18 min ago', kid: 'maya', kind: 'warn', text: 'Maya at 80% of Roblox limit (48/60m).', icon: 'alert' },
    { time: '1h ago', kid: 'jaden', kind: 'bypass', text: 'Jaden attempted to reinstall TikTok.', icon: 'shield' },
    { time: '3h ago', kid: 'maya', kind: 'achieved', text: 'Maya finished Duolingo daily goal.', icon: 'check' },
    { time: 'Yesterday', kid: 'jaden', kind: 'request', text: 'Jaden requested 30 more minutes on Discord.', icon: 'message' },
    { time: 'Yesterday', kid: 'maya', kind: 'schedule', text: 'Weekend schedule activated for Maya.', icon: 'calendar' },
    { time: '2 days ago', kid: 'jaden', kind: 'limit-hit', text: 'Jaden hit Instagram limit (45m).', icon: 'lock' },
    { time: '2 days ago', kid: 'maya', kind: 'achieved', text: 'Maya stayed under all goals 3 days in a row.', icon: 'trophy' },
  ],

  categoryColors: {
    Social:        '#E8896F',
    Video:         '#D97373',
    Gaming:        '#A8A0C8',
    Education:     '#5C8A6B',
    Communication: '#7DA9C7',
    Music:         '#C7A6D9',
    Productivity:  '#5C8A6B',
    Entertainment: '#F4D374',
    Finance:       '#8FA88B',
    Reading:       '#B8956A',
    Other:         '#B5AFA4',
  },
};
