export class ErrorsResponse {
    field: string;
    error: string;

    /**
     * Class of erro
     * @param {string} _field Field of error
     * @param {string} _error Error message
     */
    constructor(_field: string, _error: string) {
        this.field = _field;
        this.error = _error;
    }
}

export class DefaultResponse {
    errors: Array<ErrorsResponse>;
    messageOk: string;
    data: any;
    hasError: boolean;
    
    constructor() {
        this.errors = [];
        this.messageOk = "";
        this.data = {};
        this.hasError = false;
    }

    /**
     * en-Us: Method for set error in object
     * pt-Br: Método que lança erro no objeto
     * @param {string} _error Erro ocorrido
     * @param {string} _field Campo do erro ocorrido
     * @param {object} _data Objeto de retorno 
     */
    addErro(_error, _field = "", _data) {
        var error = new ErrorsResponse(_field, _error);
        this.errors.push(error);
        this.data = _data;
        this.hasError = this.errors.length > 0;
    }

    /**
     * en-Us: Method for ser Multiple erros
     * pt-Br: Método que lança multiplos error
     * @param {Array<ErrorsResponse>} _errors 
     */
    addErroRange(_errors) {
        _errors.forEach(x => {
            this.addErro(x.error, x.field, null);
        });
    }

    /**
     * en-Us: Method for set object with success
     * pt-Br: Método que lança objeto de sucesso
     * @param {string} _message Mensagem de sucesso
     * @param {object} _data Objeto de retorno 
     */
    success(_data, _message = "sucesso!") {
        this.messageOk = _message;
        this.data = _data;
    }
}

module.exports.DefaultResponse = DefaultResponse;
module.exports.ErrorsResponse = ErrorsResponse;