import urljoin from 'url-join';

class CommonAPI {
  constructor(protected basePath: string) {}

  protected getPath = (path: string) => urljoin(this.basePath, path);

  protected getPathById = (id: number, path: string) => urljoin(this.basePath.replace(':id', `${id}`), path);
}

export default CommonAPI;
