import { SearchResultsDto } from '@/search/core/schemas';

export const fakeSearchResultsDto = (): SearchResultsDto => {
  return {
    organizations: {
      names: [
        {
          value: 'Uniswap Foundation',
          link: '/organizations/names/uniswap-foundation',
        },
        { value: 'JobStash', link: '/organizations/names/jobstash' },
        { value: 'Coinbase', link: '/organizations/names/coinbase' },
      ],
      categories: [
        {
          value: 'Dexes Organizations',
          link: '/organizations/categories/dexes-organizations',
        },
        {
          value: 'Bizdev Organizations',
          link: '/organizations/categories/bizdev-organizations',
        },
        {
          value: 'Customer Support Organizations',
          link: '/organizations/categories/customer-support-organizations',
        },
        {
          value: 'Cybersecurity Organizations',
          link: '/organizations/categories/cybersecurity-organizations',
        },
        {
          value: 'Data Science Organizations',
          link: '/organizations/categories/data-science-organizations',
        },
        { value: 'Category 1', link: '/organizations/categories/category-1' },
        {
          value: 'Data Entry Organizations',
          link: '/organizations/categories/data-entry-organizations',
        },
        {
          value: 'Design Organizations',
          link: '/organizations/categories/design-organizations',
        },
        {
          value: 'DevOps Organizations',
          link: '/organizations/categories/devops-organizations',
        },
        {
          value: 'Engineering Organizations',
          link: '/organizations/categories/engineering-organizations',
        },
        {
          value: 'Finance Organizations',
          link: '/organizations/categories/finance-organizations',
        },
        {
          value: 'HR Organizations',
          link: '/organizations/categories/hr-organizations',
        },
        {
          value: 'Legal Organizations',
          link: '/organizations/categories/legal-organizations',
        },
        {
          value: 'Management Organizations',
          link: '/organizations/categories/management-organizations',
        },
        {
          value: 'Marketing Organizations',
          link: '/organizations/categories/marketing-organizations',
        },
      ],
      techs: [
        { value: 'Python', link: '/organizations/techs/python' },
        { value: 'JavaScript', link: '/organizations/techs/javascript' },
        { value: 'React', link: '/organizations/techs/react' },
        { value: 'Node.js', link: '/organizations/techs/nodejs' },
        { value: 'Angular', link: '/organizations/techs/angular' },
        { value: 'Vue.js', link: '/organizations/techs/vuejs' },
        { value: 'Django', link: '/organizations/techs/django' },
        { value: 'Flask', link: '/organizations/techs/flask' },
        { value: 'Express', link: '/organizations/techs/express' },
        { value: 'MongoDB', link: '/organizations/techs/mongodb' },
        { value: 'PostgreSQL', link: '/organizations/techs/postgresql' },
        { value: 'Golang', link: '/organizations/techs/golang' },
        { value: 'Java', link: '/organizations/techs/java' },
        { value: 'C++', link: '/organizations/techs/c++' },
        { value: 'C#', link: '/organizations/techs/c#' },
        { value: 'PHP', link: '/organizations/techs/php' },
        { value: 'Ruby', link: '/organizations/techs/ruby' },
        { value: 'Swift', link: '/organizations/techs/swift' },
        { value: 'Kotlin', link: '/organizations/techs/kotlin' },
        { value: 'Rust', link: '/organizations/techs/rust' },
        { value: 'Scala', link: '/organizations/techs/scala' },
        { value: 'TypeScript', link: '/organizations/techs/typescript' },
        { value: 'HTML', link: '/organizations/techs/html' },
        { value: 'CSS', link: '/organizations/techs/css' },
        { value: 'SASS', link: '/organizations/techs/sass' },
        { value: 'LESS', link: '/organizations/techs/less' },
      ],
    },
    projects: {
      names: [
        { value: 'Uniswap V2', link: '/organizations/names/uniswap-v2' },
        { value: 'Uniswap V3', link: '/organizations/names/uniswap-v3' },
      ],
      categories: [
        {
          value: 'Dexes',
          link: '/projects/categories/dexes',
        },
        {
          value: 'Bizdev Projects',
          link: '/projects/categories/bizdev-projects',
        },
        {
          value: 'Customer Support Projects',
          link: '/projects/categories/customer-support-projects',
        },
        {
          value: 'Cybersecurity Projects',
          link: '/projects/categories/cybersecurity-projects',
        },
        {
          value: 'Data Science Jobs',
          link: '/projects/categories/data-science-jobs',
        },
        { value: 'Category 1', link: '/projects/categories/category-1' },
        {
          value: 'Data Entry Jobs',
          link: '/projects/categories/data-entry-jobs',
        },
        { value: 'Design Jobs', link: '/projects/categories/design-jobs' },
        { value: 'DevOps Jobs', link: '/projects/categories/devops-jobs' },
        {
          value: 'Engineering Jobs',
          link: '/projects/categories/engineering-jobs',
        },
        { value: 'Finance Jobs', link: '/projects/categories/finance-jobs' },
        { value: 'HR Jobs', link: '/projects/categories/hr-jobs' },
        { value: 'Legal Jobs', link: '/projects/categories/legal-jobs' },
        {
          value: 'Management Jobs',
          link: '/projects/categories/management-jobs',
        },
        {
          value: 'Marketing Jobs',
          link: '/projects/categories/marketing-jobs',
        },
      ],
      skills: [
        { value: 'HR', link: '/projects/skills/hr' },
        { value: 'Figma', link: '/projects/skills/figma' },
        { value: 'Design', link: '/projects/skills/design' },
        { value: 'Java', link: '/projects/skills/java' },
        { value: 'C++', link: '/projects/skills/c++' },
        { value: 'Ruby', link: '/projects/skills/ruby' },
        { value: 'Swift', link: '/projects/skills/swift' },
        { value: 'CSS', link: '/projects/skills/css' },
        { value: 'SASS', link: '/projects/skills/sass' },
        { value: 'C#', link: '/projects/skills/c#' },
        { value: 'PHP', link: '/projects/skills/php' },
        { value: 'LESS', link: '/projects/skills/less' },
      ],
    },
    grants: {
      names: [
        {
          value: 'Thank Arb',
          link: '/grants/names/thank-arb',
        },
        {
          value: 'Gitcoin',
          link: '/grants/names/gitcoin',
        },
      ],
    },
    grantImpact: {
      names: [
        {
          value: 'Arbitrum Stip',
          link: '/grants/names/arbitrum-stip',
        },
        {
          value: 'DAO Drops',
          link: '/grants/names/dao-drops',
        },
      ],
    },
    vcs: {},
  };
};
