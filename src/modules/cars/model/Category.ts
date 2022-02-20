import { v4 as uuid } from "uuid";

class Category {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }
  }
}

export { Category };
