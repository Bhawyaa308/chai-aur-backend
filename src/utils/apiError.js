// node js allows us to handle many predefined errors but we can override them by creating our own error classes
class ApiError extends Error {
    constructor(
         statusCode,
            message="Something went wrong",
            errors=[],
            stack=""
    ) {
        super(message)
        this.statusCode=statusCode //here we override the status code of error with our
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError;