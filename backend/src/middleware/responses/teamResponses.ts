class TeamResponse<T> {
    private success: boolean;
    private message?: string;
    private data?: T;
  
    constructor(success: boolean, message?: string, data?: T) {
      this.success = success;
      this.message = message;
      this.data = data;
    }
  
    static success<T>(data: T): TeamResponse<T> {
      return new TeamResponse(true, undefined, data);
    }
  
    static error<T>(message: string): TeamResponse<T> {
      return new TeamResponse(false, message);
    }
  
    isSuccess(): boolean {
      return this.success;
    }
  
    getMessage(): string | undefined {
      return this.message;
    }
  
    getData(): T | undefined {
      return this.data;
    }
  }
  
  export { TeamResponse };
  