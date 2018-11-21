export const pages = [
  [
    {
      title: 'Posting Link',
      name: 'postLink',
      type: 'text',
      required: true,
    },
    {
      title: 'Job Title',
      name: 'jobTitle',
      type: 'text',
      required: true,
      placeholder: 'Software Engineer, DevOps Engineer, etc...'
    },
    {
      title: 'Company Name',
      name: 'companyName',
      type: 'text',
      required: true,
      placeholder: 'Apple, Facebook, etc...'
    },
    {
      title: 'Position Level',
      name: 'positionLevel',
      type: 'text',
      required: true,
      placeholder: 'Entry, Mid, Senior...'
    },
    {
      title: 'Requirements',
      name: 'requirements',
      type: 'text',
      required: true,
      placeholder: 'Bachelors, Node.js, JavaScript, C++, etc...'
    },
    {
      title: 'Salary Range',
      name: 'salaryRange',
      type: 'number',
      required: false,
      placeholder: '75k-100k'
    },
    {
      title: 'Next Follow-up Date',
      name: 'followUp',
      type: 'datetime-local',
      required: true
    },
    {
      title: 'Description',
      name: 'description',
      type: 'textarea',
      required: true
    },
  ],
  [
    {
      title: 'Recruiter Name',
      name: 'recruiterName',
      type: 'text',
      required: false,
    },
    {
      title: 'Recruiter Email',
      name: 'recruiterEmail',
      type: 'text',
      required: false,
    },
    {
      title: 'Recruiter Phone',
      name: 'recruiterPhone',
      type: 'text',
      required: false,
    }
  ],
  [
    {
      title: 'City',
      name: 'city',
      type: 'text',
      required: true,
      placeholder: 'San Francisco, Seattle, etc...'
    },
    {
      title: 'State',
      name: 'state',
      type: 'text',
      required: true,
      placeholder: 'CA, WA, etc...'
    }
  ],
]