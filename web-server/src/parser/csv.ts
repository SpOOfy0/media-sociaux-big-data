export class CSV {
  /**
   * Convert a JSON to a CSV file.
   * @param object A key-value JSON object.
   * @returns The CSV representation of the object.
   */
  static from(object: Record<string, any>[]): string {
    const headers = Object.keys(object[0]);
    
    return object.reduce(
      (file: string, data: Record<string, any>) => {
        const line = headers.map(header => data[header]);
        return `${file}\n${line.join(",")}`;
      },
      headers.join(",")
    );
  }
}