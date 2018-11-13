export const pages = [
  [
    {
      title: 'Job Posting',
      name: 'jobPosting',
      type: 'text',
      required: true,
      placeholder: 'enter job posting link...'
    },
    {
      title: 'Job Title',
      name: 'jobTitle',
      type: 'text',
      required: true,
      placeholder: 'enter job title...'
    },
    {
      title: 'Job Description',
      name: 'jobDescription',
      type: 'text',
      required: true,
      placeholder: 'enter job description...'
    },
    {
      title: 'Date Applied',
      name: 'dateApplied',
      type: 'datetime-local',
      required: true
    },
    {
      title: 'Next Follow-up Date',
      name: 'followUp',
      type: 'datetime-local',
      required: true
    }
  ],
  [
    {
      title: 'City',
      name: 'city',
      type: 'text',
      required: true,
      placeholder: 'enter city...'
    },
    {
      title: 'State',
      name: 'state',
      type: 'text',
      required: true,
      placeholder: 'enter state...'
    }
  ]
]