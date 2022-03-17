export interface IEvent {
  id: number;
  title: string;
  description: null | string;
  start_time: Date;
  end_time: Date;
  location: string;
}

export interface IEventCreateDTO extends Omit<IEvent, 'id'> {}
