import ChatIcon from '../assets/icons/Onboarding/Chat.svg';
import BookIcon from '../assets/icons/Onboarding/Book.svg';
import BrainstormCard from '../assets/icons/Onboarding/Brainstorm-card.svg';
import BrainstormRecord from '../assets/icons/Onboarding/Brainstorm-record.svg';
import OutlineCard from '../assets/icons/Onboarding/Outline-card.svg';
import OutlinePost1 from '../assets/icons/Onboarding/Outline-card-1.svg';
import OutlinePost2 from '../assets/icons/Onboarding/Outline-card-2.svg';
import OutlineText1 from '../assets/icons/Onboarding/Outline-text-1.svg';
import OutlineText2 from '../assets/icons/Onboarding/Outline-text-2.svg';
import TimelineCard from '../assets/icons/Onboarding/Timeline-card.svg';
import TimelineBar from '../assets/icons/Onboarding/Timeline-bar.svg';
import PlotplannerCard from '../assets/icons/Onboarding/Plotplanner-card.svg';
import PlotplannerGraph from '../assets/icons/Onboarding/Plotplanner-graph.svg';

export const TREND_TYPE = {
  POSITIVE: 1,
  NEGATIVE: 2
};

export const ACTIVITY_LOGS = [
  {
    date: '6/1',
    finished: '12 Tasks',
    inProgress: '34 Tasks',
    books: 'This is a Nook Name',
    series: 'Series Name (1)'
  },
  {
    date: '6/1',
    finished: 'Brainstrom Name',
    style: 'underline',
    inProgress: '34 Tasks',
    books: 'This is a Nook Name',
    series: 'Series Name (2)'
  },
  {
    date: '5/30',
    finished: '12 Tasks',
    inProgress: '34 Tasks',
    books: 'This is a Nook Name',
    series: 'Series Name (3)'
  },
  {
    date: '5/29',
    finished: 'Outline Name',
    style: 'underline',
    inProgress: '34 Tasks',
    books: 'This is a Nook Name',
    series: 'Series Name (4)'
  },
  {
    date: '5/28',
    finished: '12 Tasks',
    inProgress: '34 Tasks',
    books: 'This is a Nook Name',
    series: 'Series Name (5)'
  }
];

export const ONBOARDING_CONTENT = [
  {
    id: 1,
    title: 'Collaborate',
    mainContent:
      'We’re excited to debut a refreshed look for our app. Check out these enhancements:',
    subContents: [
      'Updated navigation bars that make it easier to access the most important features.',
      'New color palette for a cleaner, more user-friendly interface.',
      'Share your thoughts with us.'
    ],
    style: 'mh-70px',
    animation: 'fade-in-animation',
    icon: [ChatIcon]
  },
  {
    id: 2,
    title: 'Your Books',
    mainContent:
      'We made Charlii to help you plan books, stories,  and better manage your writing tasks!',
    animation: 'fade-in-alternate',
    icon: [BookIcon]
  },
  {
    id: 3,
    title: 'Brainstorm',
    mainContent:
      'We made Charlii to help you plan books, stories,  and better manage your writing tasks!',
    animation: 'fade-in-animation',
    icon: [BrainstormCard, BrainstormRecord]
  },
  {
    id: 4,
    title: 'Outlines',
    mainContent:
      'We made Charlii to help you plan books, stories,  and better manage your writing tasks!',
    animation: 'fade-in-alternate',
    icon: [OutlineCard],
    textIcons: [OutlineText1, OutlineText2],
    postIcons: [OutlinePost1, OutlinePost2]
  },
  {
    id: 5,
    title: 'Timelines',
    mainContent:
      'We made Charlii to help you plan books, stories,  and better manage your writing tasks!',
    animation: 'fade-in-animation',
    icon: [TimelineCard, TimelineBar]
  },
  {
    id: 6,
    title: 'Plot Planner',
    mainContent:
      'We made Charlii to help you plan books, stories,  and better manage your writing tasks!',
    animation: 'fade-in-alternate',
    icon: [PlotplannerCard, PlotplannerGraph]
  }
];

export const PACKAGES = {
  'full-planning-features-for-a-new-book': {
    option_name: 'Full planning features for a new book',
    slug: 'full-planning-features-for-a-new-book'
  },
  'brainstorming-feature': {
    option_name: 'Brainstorming feature',
    slug: 'brainstorming-feature'
  },
  'calendar-feature': {
    option_name: 'Calendar feature',
    slug: 'calendar-feature'
  },
  'outline-feature': {
    option_name: 'Outline feature',
    slug: 'outline-feature'
  },
  'timeline-feature': {
    option_name: 'Timeline feature',
    slug: 'timeline-feature'
  },
  'plot-planning-feature': {
    option_name: 'Plot Planning feature',
    slug: 'plot-planning-feature'
  },
  'full-257-support': {
    option_name: 'Full 25/7 Support',
    slug: 'full-257-support'
  },
  'premise-feature': {
    option_name: 'Premise Feature',
    slug: 'premise-feature'
  },
  'goals-calendar-feature': {
    option_name: 'Goals Calendar Feature',
    slug: 'goals-calendar-feature'
  },
  'series-feature': {
    option_name: 'Series Feature',
    slug: 'series-feature'
  },
  'contact-support': {
    option_name: 'Contact Support',
    slug: 'contact-support'
  },
  'priority-support': {
    option_name: 'Priority Support',
    slug: 'priority-support'
  }
};
