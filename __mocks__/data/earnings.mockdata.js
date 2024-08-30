const { JobType } = require('../../src/modules/earnings/enum/jobtype.enum');

const earningMockData = {
  checkEmployeeId: 'someId',
  perPage: 1,
  page: 1,
  monthYear: null,
  onePayrollPerPageMockData: [
    {
      payday: '2024-04-12T00:00:00.000Z',
      check_payroll_id: 'pay_YCW4u7gAyQXv2CytPLNa',
      id: 268,
      payroll_items: [
        {
          net_pay: 10,
          payroll_item_earnings: [
            {
              timesheet: {
                job_id: 19643,
                approved_checkin_at: '2024-03-29T12:00:00.000Z',
                id: 3476,
              },
              hours: 3,
              description: 'COD:1-Coat Check',
              earning_type: 'overtime',
              amount: '50.28',
            },
            {
              timesheet: {
                job_id: 19641,
                approved_checkin_at: '2024-03-27T19:00:00.000Z',
                id: 3481,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '165.00',
            },
            {
              timesheet: {
                job_id: 19639,
                approved_checkin_at: '2024-03-25T19:00:00.000Z',
                id: 3479,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19640,
                approved_checkin_at: '2024-03-26T19:00:00.000Z',
                id: 3480,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19642,
                approved_checkin_at: '2024-03-28T19:00:00.000Z',
                id: 3482,
              },
              hours: 7,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '70.00',
            },
          ],
          payroll_item_tax: [
            {
              amount: '35.51',
              description: 'FICA',
            },
            {
              amount: '19.14',
              description: 'Virginia State Tax',
            },
            {
              amount: '8.31',
              description: 'Medicare',
            },
          ],
          post_tax_deductions: [],
        },
      ],
    },
  ],

  twoDifferentPayroll: [
    {
      payday: '2024-04-12T00:00:00.000Z',
      check_payroll_id: 'pay_YCW4u7gAyQXv2CytPLNa',
      id: 268,
      payroll_items: [
        {
          net_pay: 10,
          payroll_item_earnings: [
            {
              timesheet: {
                job_id: 19643,
                approved_checkin_at: '2024-03-29T12:00:00.000Z',
                id: 3476,
              },
              hours: 3,
              description: 'COD:1-Coat Check',
              earning_type: 'overtime',
              amount: '50.28',
            },
            {
              timesheet: {
                job_id: 19641,
                approved_checkin_at: '2024-03-27T19:00:00.000Z',
                id: 3481,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '165.00',
            },
            {
              timesheet: {
                job_id: 19639,
                approved_checkin_at: '2024-03-25T19:00:00.000Z',
                id: 3479,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19640,
                approved_checkin_at: '2024-03-26T19:00:00.000Z',
                id: 3480,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19642,
                approved_checkin_at: '2024-03-28T19:00:00.000Z',
                id: 3482,
              },
              hours: 7,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '70.00',
            },
          ],
          payroll_item_tax: [
            {
              amount: '35.51',
              description: 'FICA',
            },
            {
              amount: '19.14',
              description: 'Virginia State Tax',
            },
            {
              amount: '8.31',
              description: 'Medicare',
            },
          ],
          post_tax_deductions: [],
        },
      ],
    },
    {
      payday: '2024-03-12T00:00:00.000Z',
      check_payroll_id: 'pay_YCW4u7gAyQXv2CytPLNa',
      id: 268,
      payroll_items: [
        {
          net_pay: 10,
          payroll_item_earnings: [
            {
              timesheet: {
                job_id: 19643,
                approved_checkin_at: '2024-03-29T12:00:00.000Z',
                id: 3476,
              },
              hours: 3,
              description: 'COD:1-Coat Check',
              earning_type: 'overtime',
              amount: '50.28',
            },
            {
              timesheet: {
                job_id: 19641,
                approved_checkin_at: '2024-03-27T19:00:00.000Z',
                id: 3481,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '165.00',
            },
            {
              timesheet: {
                job_id: 19639,
                approved_checkin_at: '2024-03-25T19:00:00.000Z',
                id: 3479,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19640,
                approved_checkin_at: '2024-03-26T19:00:00.000Z',
                id: 3480,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19642,
                approved_checkin_at: '2024-03-28T19:00:00.000Z',
                id: 3482,
              },
              hours: 7,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '70.00',
            },
          ],
          payroll_item_tax: [
            {
              amount: '35.51',
              description: 'FICA',
            },
            {
              amount: '19.14',
              description: 'Virginia State Tax',
            },
            {
              amount: '8.31',
              description: 'Medicare',
            },
          ],
          post_tax_deductions: [],
        },
      ],
    },
  ],

  twoDifferentPayrollInSameMonth: [
    {
      payday: '2024-04-12T00:00:00.000Z',
      check_payroll_id: 'pay_YCW4u7gAyQXv2CytPLNa',
      id: 268,
      payroll_items: [
        {
          net_pay: 10,
          payroll_item_earnings: [
            {
              timesheet: {
                job_id: 19643,
                approved_checkin_at: '2024-03-29T12:00:00.000Z',
                id: 3476,
              },
              hours: 3,
              description: 'COD:1-Coat Check',
              earning_type: 'overtime',
              amount: '50.28',
            },
            {
              timesheet: {
                job_id: 19641,
                approved_checkin_at: '2024-03-27T19:00:00.000Z',
                id: 3481,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '165.00',
            },
            {
              timesheet: {
                job_id: 19639,
                approved_checkin_at: '2024-03-25T19:00:00.000Z',
                id: 3479,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19640,
                approved_checkin_at: '2024-03-26T19:00:00.000Z',
                id: 3480,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19642,
                approved_checkin_at: '2024-03-28T19:00:00.000Z',
                id: 3482,
              },
              hours: 7,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '70.00',
            },
          ],
          payroll_item_tax: [
            {
              amount: '35.51',
              description: 'FICA',
            },
            {
              amount: '19.14',
              description: 'Virginia State Tax',
            },
            {
              amount: '8.31',
              description: 'Medicare',
            },
          ],
          post_tax_deductions: [],
        },
      ],
    },
    {
      payday: '2024-04-12T00:00:00.000Z',
      check_payroll_id: 'pay_YCW4u7gAyQXv2CytPLNa',
      id: 268,
      payroll_items: [
        {
          net_pay: 10,
          payroll_item_earnings: [
            {
              timesheet: {
                job_id: 19643,
                approved_checkin_at: '2024-03-29T12:00:00.000Z',
                id: 3476,
              },
              hours: 3,
              description: 'COD:1-Coat Check',
              earning_type: 'overtime',
              amount: '50.28',
            },
            {
              timesheet: {
                job_id: 19641,
                approved_checkin_at: '2024-03-27T19:00:00.000Z',
                id: 3481,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '165.00',
            },
            {
              timesheet: {
                job_id: 19639,
                approved_checkin_at: '2024-03-25T19:00:00.000Z',
                id: 3479,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19640,
                approved_checkin_at: '2024-03-26T19:00:00.000Z',
                id: 3480,
              },
              hours: 11,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '110.00',
            },
            {
              timesheet: {
                job_id: 19642,
                approved_checkin_at: '2024-03-28T19:00:00.000Z',
                id: 3482,
              },
              hours: 7,
              description: 'COD:1-Coat Check',
              earning_type: 'hourly',
              amount: '70.00',
            },
          ],
          payroll_item_tax: [
            {
              amount: '35.51',
              description: 'FICA',
            },
            {
              amount: '19.14',
              description: 'Virginia State Tax',
            },
            {
              amount: '8.31',
              description: 'Medicare',
            },
          ],
          post_tax_deductions: [],
        },
      ],
    },
  ],

  payrollEarnings: [
    {
      earning_type: JobType.Hourly,
      hours: 5,
      description: 'Overtime-Project A',
      amount: 50,
      timesheet: {
        job_id: 1,
        approved_checkin_at: '2022-01-01',
        tip_amount: 10,
        id: 1,
      },
    },
    {
      earning_type: JobType.Hourly,
      hours: 8,
      description: 'Hourly-Project B',
      amount: 80,
      timesheet: {
        job_id: 2,
        approved_checkin_at: '2022-01-02',
        tip_amount: 0,
        id: 2,
      },
    },
    {
      earning_type: JobType.Hourly,
      hours: 0,
      description: 'Tip-Project C',
      amount: 20,
      timesheet: {
        job_id: 3,
        approved_checkin_at: '2022-01-03',
        tip_amount: 5,
        id: 3,
      },
    },
  ],
  jobs: [
    {
      amount: 50,
      hours: 5,
      timesheet: {
        approvedCheckinAt: '2022-01-01',
        tipAmount: 10,
      },
      date: '2022-01-01',
      description: 'Project A',
      overtime: 0,
      tip: 0,
      jobId: 1,
      timesheetId: 1,
    },
    {
      amount: 80,
      hours: 8,
      timesheet: {
        approvedCheckinAt: '2022-01-02',
        tipAmount: 0,
      },
      date: '2022-01-02',
      description: 'Project B',
      overtime: 0,
      tip: 0,
      jobId: 2,
      timesheetId: 2,
    },
    {
      amount: 20,
      hours: 0,
      timesheet: {
        approvedCheckinAt: '2022-01-03',
        tipAmount: 5,
      },
      date: '2022-01-03',
      description: 'Project C',
      overtime: 0,
      tip: 0,
      jobId: 3,
      timesheetId: 3,
    },
  ],

  earningItemsForASingleJob: [
    {
      earning_type: JobType.Hourly,
      hours: 5,
      description: 'Overtime-Project A',
      amount: 50,
      timesheet: {
        job_id: 1,
        approved_checkin_at: '2022-01-01',
        tip_amount: 10,
        id: 1,
      },
    },
    {
      earning_type: JobType.Overtime,
      hours: 8,
      description: 'Hourly-Project B',
      amount: 80,
      timesheet: {
        job_id: 1,
        approved_checkin_at: '2022-01-02',
        tip_amount: 0,
        id: 2,
      },
    },
    {
      earning_type: JobType.Tip,
      hours: 0,
      description: 'Tip-Project C',
      amount: 20,
      timesheet: {
        job_id: 1,
        approved_checkin_at: '2022-01-03',
        tip_amount: 5,
        id: 3,
      },
    },
  ],

  jobWithMultipleEarnings: [
    {
      amount: 150,
      hours: 5,
      timesheet: {
        approvedCheckinAt: '2022-01-03',
        tipAmount: 5,
      },
      date: '2022-01-03',
      description: 'Project A',
      overtime: 8,
      tip: 20,
      jobId: 1,
      timesheetId: 3,
    },
  ],

  payrollDataInCurrentYear: [
    {
      payroll_items: [
        {
          net_pay: 10,
        },
        {
          net_pay: 10,
        },
      ],
    },
    {
      payroll_items: [
        {
          net_pay: 10,
        },
        {
          net_pay: 10,
        },
      ],
    },
  ],

  deductions: [
    { amount: 100, description: 'Medical Expenses', ptd_type: 'deduction' },
    { amount: 50, description: 'Tax Deduction', ptd_type: 'deduction' },
    { amount: 20, description: 'Other Deduction' },
  ],
  expectedDeductionFormate: [
    { amount: 100, description: 'Medical Expenses', type: 'deduction' },
    { amount: 50, description: 'Tax Deduction', type: 'deduction' },
    { amount: 20, description: 'Other Deduction', type: null },
  ],
};

module.exports = earningMockData;
