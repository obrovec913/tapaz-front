declare module 'notie' {
  export default class Notie {
    public static alert(payload: INotiePayload): void;
  }
}

interface INotiePayload {
  type: 'success' | 'error';
  text: string;
  time: number;
}