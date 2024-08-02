import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
  fetch;

  const histogramData = [
    {
      label: 'Example Organisation 1',
      values: [
        { label: 'ip-src', value: 1 },
        { label: 'url', value: 8 },
        { label: 'attachment', value: 11 },
        { label: 'text', value: 14 },
        { label: 'target-user', value: 17 },
        { label: 'ip-dst|port', value: 4 }
      ]
    },
    {
      label: 'Example Organisation 2',
      values: [
        { label: 'ip-src', value: 2 },
        { label: 'url', value: 5 },
        { label: 'attachment', value: 12 },
        { label: 'text', value: 15 },
        { label: 'target-user', value: 19 },
        { label: 'ip-dst|port', value: 0 }
      ]
    },
    {
      label: 'Example Organisation 3',
      values: [
        { label: 'ip-src', value: 3 },
        { label: 'url', value: 6 },
        { label: 'attachment', value: 9 },
        { label: 'text', value: 16 },
        { label: 'target-user', value: 20 },
        { label: 'ip-dst|port', value: 0 }
      ]
    },
    {
      label: 'Example Organisation 4',
      values: [
        { label: 'ip-src', value: 4 },
        { label: 'url', value: 7 },
        { label: 'attachment', value: 10 },
        { label: 'text', value: 13 },
        { label: 'target-user', value: 18 },
        { label: 'ip-dst|port', value: 0 }
      ]
    }
  ];
  const dataTypes = [
    { label: 'ip-src', color: 'red' },
    { label: 'url', color: 'orange' },
    { label: 'attachment', color: 'green' },
    { label: 'text', color: 'green' },
    { label: 'target-user', color: 'green' },
    { label: 'ip-dst|port', color: 'purple' }
  ];

  return {
    histogramData,
    dataTypes
  };
};
