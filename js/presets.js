const presets = [
  {
    name: 'Genre and Site Of the Day Awards',
    tags: [
      {
        name: 'Art & Illustration',
        color: '#4AE7CA',
        conditions: ['Art & Illustration', 'AND', 'site of the day'],
        partition: [], // will be populated at runtime
        grouped: [] // will be populated at runtime
      },
      {
        name: 'Film & TV',
        color: '#4D4AE7',
        conditions: ['Film & TV', 'AND', 'site of the day'],
        partition: [],
        grouped: []
      },
      {
        name: 'Photography',
        color: '#E75D4A',
        conditions: ['Photography', 'AND', 'site of the day'],
        partition: [],
        grouped: []
      }
    ]
  },
  {
    name: 'Front-End Framework Wars',
    tags: [
      {
        name: 'React.js',
        color: '#E75D4A',
        conditions: ['React'],
        partition: [],
        grouped: []
      },
      {
        name: 'Vue.js',
        color: '#188116',
        conditions: ['Angular'],
        partition: [],
        grouped: []
      },
      {
        name: 'Angular.js',
        color: '#E34AE7',
        conditions: ['Vue.js'],
        partition: [],
        grouped: []
      },
      {
        name: 'All',
        color: '#51BBFE',
        conditions: ['React', 'OR', 'Angular', 'OR', 'Vue.js'],
        partition: [],
        grouped: []
      }
    ]
  },
  {
    name: 'Design Trends',
    tags: [
      {
        name: 'Minimal',
        color: '#188116',
        conditions: ['Minimal'],
        partition: [],
        grouped: []
      },
      {
        name: 'Colorful',
        color: '#E34AE7',
        conditions: ['Colorful'],
        partition: [],
        grouped: []
      }
    ]
  },
  {
    name: 'Design Tools for Dev Award',
    tags: [
      {
        name: 'Adobe Photoshop',
        color: '#188116',
        conditions: ['developer', 'AND', 'Adobe Photoshop'],
        partition: [],
        grouped: []
      },
      {
        name: 'After Effects',
        color: '#E34AE7',
        conditions: ['developer', 'AND', 'After Effects'],
        partition: [],
        grouped: []
      },
      {
        name: 'Adobe Illustrator',
        color: '#51BBFE',
        conditions: ['developer', 'AND', 'Adobe Illustrator'],
        partition: [],
        grouped: []
      }
    ]
  }
];
