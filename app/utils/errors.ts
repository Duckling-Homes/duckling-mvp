class NextJSError {
  message: string
  status: number

  constructor(message?: string, status?: number) {
    this.message = message || 'Error'
    this.status = status || 500
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
    }
  }
}

export class ProjectNotFoundError extends NextJSError {
  constructor(projectId: string) {
    super('ProjectNotFoundErrorType: ' + projectId, 404)
  }
}
