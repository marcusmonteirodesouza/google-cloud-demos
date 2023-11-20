class Vendor {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}

export {Vendor};
