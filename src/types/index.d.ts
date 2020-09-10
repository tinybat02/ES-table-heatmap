declare module '*.svg';

declare module 'react-csv' {
  interface ICSVLink {
    headers: Array<string>;
    data: Array<{ [key: string]: any }>;
    filename: string;
    style: { [key: string]: any };
  }
  export class CSVLink extends React.Component<ICSVLink> {}
}
