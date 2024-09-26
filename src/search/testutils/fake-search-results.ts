import { SearchResultsDto } from '@/search/core/schemas';

export const fakeSearchResults = (): SearchResultsDto => {
  return [
    {
      title: 'Jobs',
      categories: [
        { label: 'Creative Designer', url: '#' },
        { label: 'Staff Product Designer', url: '#' },
        { label: 'Design Customer Support', url: '#' },
        { label: 'Cyber Design', url: '#' },
        { label: 'Design Science', url: '#' },
        { label: 'Design Engineering', url: '#' },
      ],
    },
    {
      title: 'Organizations',
      categories: [
        { label: 'Business Design', url: '#' },
        { label: 'Golang Design', url: '#' },
        { label: 'Smart Design Contracts', url: '#' },
      ],
    },
    {
      title: 'Projects',
      categories: [
        { label: 'Analysis Design', url: '#' },
        { label: 'Project 1 Design', url: '#' },
        { label: 'Project 2 Design', url: '#' },
      ],
    },
    {
      title: 'Categories',
      categories: [
        { label: 'Design Category 1', url: '#' },
        { label: 'Design Category 2', url: '#' },
        { label: 'Design Category 3', url: '#' },
      ],
    },
    {
      title: 'Skills',
      categories: [
        { label: 'Design Skill 1', url: '#' },
        { label: 'Design Skill 2', url: '#' },
        { label: 'Design Skill 3', url: '#' },
      ],
    },
  ];
};
