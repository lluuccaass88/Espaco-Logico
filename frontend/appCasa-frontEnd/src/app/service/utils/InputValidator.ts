export class InputValidator {
    emailValidator(emailUser:any):Boolean {
        const regexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regexPattern.test(emailUser);
    }
    


    passwordValidator(passwordUser: any):Boolean{
        
        const regexUppercase = new RegExp(/^(?=.*[A-Z]).+$/)
        const regexLowercase = new RegExp(/^(?=.*[a-z]).+$/)
        const regexNumber = new RegExp(/^(?=.*[0-9]).+$/)
        const length = passwordUser.length >= 6

        if(!length){
            return false
        }else if(!regexUppercase.test(passwordUser)){
            return false
        } else if(!regexLowercase.test(passwordUser)){
            return false
        }else if(!regexNumber.test(passwordUser)){
            return false
        }else{
            return true
        }   
    }

    isNumeric(value:any){
        return !isNaN(value) && !isNaN(parseFloat(value));
    }
}