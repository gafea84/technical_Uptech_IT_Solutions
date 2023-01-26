export class Filter {
  constructor(
    public ftype: Array<{ type: string; isSelected: boolean }>,
    public model: string,
    public brand: string,
    public color: string,
    public size: string
  ) {}
}
