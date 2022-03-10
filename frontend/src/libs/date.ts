export const formatDateTime = (date: Date, timeZone?: string): string => new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  timeZoneName: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone,
}).format(date);

export const formatTime = (date: Date, timeZone?: string): string => new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric', timeZone }).format(date);

export const formatDate = (date: Date, timeZone?: string): string => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone,
}).format(date);
