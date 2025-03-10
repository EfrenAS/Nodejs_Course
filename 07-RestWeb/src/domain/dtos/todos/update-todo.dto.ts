export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completed: boolean
  ){}

  get values() {
    const returnObj: {[key: string] : any} = {};

    if(this.text) returnObj.text = this.text;
    if(this.completed) returnObj.completed = this.completed;

    return returnObj;
  }

  public static create(props: {[key: string] : any}): [string?, UpdateTodoDto?] {
    const { id, text, completed } = props;
    let newCompleted = false;
    
    if(completed) newCompleted = completed === true ? true : false;

    console.log(newCompleted);
    
    return [undefined, new UpdateTodoDto(id, text, newCompleted)];
  }
}