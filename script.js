'use strict';


function validateForm(mainObj) {
    //todo mainOBJ }
    // formId: 'profile',
    // formValidClass: 'form_valid',
    // formInvalidClass: 'form_invalid',
    // inputErrorClass: 'input_error'

    let inputsOnForm = getFormElements(mainObj.formId, "input");
    let buttonOnForm = document.forms.item(mainObj.formId).querySelector("button");
    let onForm = document.forms.item(mainObj.formId);


    buttonOnForm.addEventListener("click", getPreventSubmit("buttonClickFalse"), false);

    function getPreventSubmit(name) {
        return (event) => {
            preventSubmit(event);
            console.log("get button, motherfucker!", name, event);
            checkAllForm();
        }
    }

    function preventSubmit(event) {
        event.preventDefault();
    }

function checkAllForm() {
    let formIsValid = true;
    inputsOnForm.forEach(function (_item) {
        checkInputs(_item.dataset.validator, _item);

        if (_item.classList.contains("input_error")) {
            formIsValid = false;
        }
    });

    updateFormValidity(formIsValid);
};

    function updateFormValidity(formIsValid) {
        if (formIsValid) {
            onForm.classList.remove("form_invalid");
            onForm.classList.add("form_valid");
        } else {
            onForm.classList.remove("form_valid");
            onForm.classList.add("form_invalid");
        }
    }


    inputsOnForm.forEach(function (_item) {
        _item.onblur = function () {
            checkInputs(_item.dataset.validator, _item);  //типа послал на проверку и получает результат в виде того что нао сделать
        };

    });
};

function checkRequired(_input, _item){
    if (_input.required && _item.value.length == 0){
        _item.classList.add('input_error');
        return false;
    }
    return true;
}


function checkInputs(_input, _item) {
    if (!checkRequired(_input, _item)) {
        return;
    }

    switch (_input) {

        case "letters":
            checkLetters(_item);
            break;

        case "number":
            checkNumbers(_item);
            break;

        case "regexp":
            checkRegexp(_item);
            break;

        default:
            alert('ERR');
    }


}

function getFormElements(formID, elementName) {
    return Array.from(document.forms.item(formID).querySelectorAll(elementName))
}


function checkLetters(_item) {
    //todo проверка на required
    let _string = _item.value;

    if ((/^[a-zA-Zа-яА-Я]+$/).test(_string)) {
        _item.classList.remove('input_error');
        return true;
    }

    _item.classList.add('input_error');

}

function checkNumbers(_item) {
    let _string = _item.value;

    if (!isNumber(_string)) {
        //console.log("Err", _string);
        _item.classList.add('input_error');
        return;
    }

    _string = Number(_string);

    if (_item.dataset.validatorMax) {
        let _max = Number(_item.dataset.validatorMax);
        if (_string > _max) {
            _item.classList.add('input_error');
            return;
        }
    }

    if (_item.dataset.validatorMin) {
        let _min = Number(_item.dataset.validatorMin);
        if (_string < _min) {
            _item.classList.add('input_error');
            return;
        }
    }

    _item.classList.remove('input_error');
}

function isNumber(str) {
    let trimmedStr = str.trim();
    if (trimmedStr.length != str.length || trimmedStr == "") {
        return false
    }
    return !isNaN(str);
}


function checkRegexp(_item) {
    let _string = _item.value;
    let _template = new RegExp(_item.dataset.validatorPattern);

    if (_template.test(_string)) {
        _item.classList.remove('input_error');
        return true;

    } else {
        _item.classList.add('input_error');
    }
}
