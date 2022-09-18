const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'All-day event',
    start: todayStr,
    allDay:true,
    editable: false,
  },
  {
    id: 2,
    title: 'test1',
    start: '2021-09-07T10:00:00',
    end:'2021-09-07T10:30:00',
  },
  {
    id: 3,
    title: 'test2',
    start: '2021-09-07T11:00:00',
    end:'2021-09-07T11:30:00',
    description: 'description for Repeating Event',
    display:'list-item',
    color:'red'
  }
]