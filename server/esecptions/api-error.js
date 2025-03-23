module.exports = class ApiError extends Error{
    status;
    errors;

    constructor(status, messange, errors = []){
        super(messange);
        this.status = status;
        this.errors = errors;
    }
    static unauthorizedError(){
        return new ApiError(401, "Пользователь не авторизован")
    }
   static badReqest(messange, erors =[]){
        return new ApiError(400, messange, erors)
   } 
   
}