export class TodoEntity {
  private constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completed: boolean,
    public readonly completedAt: Date|null,
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: {[key: string]: any}): TodoEntity {
    const { id, text, completed, completedAt } = object;
    
    if(!id) throw new Error("ID is required");
    if(!text) throw new Error("Text is required");

    let newCompletedAt
    
    if(completedAt) {
      newCompletedAt = new Date(completedAt)
      if(isNaN(newCompletedAt.getTime())) throw new Error("Invalid date")
    }

    return new TodoEntity(id, text, completed, completedAt)
  }
}