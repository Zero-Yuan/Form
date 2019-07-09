//2.6
(fucntion(){
	var init = function () {
		var orderForm = document.forms.order,
			saveBtn = document.getElementById('saveOrder'),
			saveBtnClicked = false;

		var saveForm = fucntion(){
			if(!('formAction' in document.createElement('input'))){
				var formAction = saveBtn.getAttribute('formaction');
				orderForm.setAttribute('action', formAction);
			}
			saveBtnClicked = true;
		};
		saveBtn.addEventListener('click', saveForm, false);
		// body...
	};
	window.addEventListener('load', init, false);

	// 2.7
var qtyFields = orderForm.quantity,
	totalFields = document.getElementByclassName('item_total'),
	orderTotalField = document.getElementById('order_total');

var formatMoney = function(value){
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var calculationTotals = function(){
	var i = 0,
		ln = qtyFields.length,
				itemQty = 0,
				itemPrice = 0.00,
				itemTotal = 0.00,
				itemTotalMoney = '0.00',
				orderTotal = 0.00,
				orderTotalMoney = '0.00';
			for(; i<ln; i++){
				//2.8
				if(!!qtyFields[i].valueAsNumber){
					itemQty = qtyFields[i].valueAsNumber || 0;
				}else{
					itemQty = parseFloat(qtyFields[i].value) || 0;
				}
				//2.9
				if(!!qtyFields[i].dataset){
					itemPrice = parseFloat(qtyFields[i].dataset.price);
				}else{
					itemPrice = parseFloat(qtyFields[i].getAttribute('data-price'));
				}

				itemTotal = itemQty * itemPrice;
				itemTotalMoney = '$'+formatMoney(itemTotal.toFixed(2));
				orderTotal += itemTotal;
				orderTotalMoney = '$'+ formatMoney(orderTotal.toFixed(2));
//2.10
				if(!!totalFields[i].value){
					totalFields[i].value = itemTotalMoney;
					orderTotalField.value = orderTotalMoney;
				}else{
					totalFields[i].innerHTML = itemTotalMoney;
					orderTotalField.innerHTML = orderTotalMoney;
				}

			}


		};

		calculateTotals();
		var qtyListeners = function(){
			var i = 0,
				ln = qtyFields.length;
			for(; i<ln; i++){
				qtyFields[i].addEventListener('input',calculateTotals, false);
				qtyFields[i].addEventListener('keyup',calculateTotals, false);
			}
		};
qtyListeners();
})();

//2.11

var doCustomValidity = function(field, msg){
	if('setCustomValidity' in field){
		field.setCustomValidity(msg);
	}else{
		field.validationMessage = msg;
	}
};

var validateForm = function(){
	doCustomValidity(orderForm.name, '');
	doCustomValidity(orderForm.password, '');
	doCustomValidity(orderForm.confirm_password, '');
	doCustomValidity(orderForm.card_name, '');

	if(orderForm.name.value.length < 4){
		doCustomValidity(
			orderForm.name, 'Full Name must be at least 4 characters long');
	}

	if(orderForm.password.value.length < 8){
		doCustomValidity(
			orderForm.password,
			'Password must be at least 8 characters long');
	}

	if(orderForm.password.value != orderForm.confirm_password.value){
		doCustomValidity(
			orderForm.confirm_password,
			'Confirm Password must be match Password');
	}

	if(orderForm.card_name.value.length < 4){
		doCustomValidity(
			orderForm.card_name,
			'Name on Card must be at least 4 characters long');
	}

};
//2.12
var styleInvalidForm = function(){
	orderForm.class = 'invalid';
}

orderForm.addEventListener('invalid', styleInvalidForm, true);

//2.13
Modernizr.load({
	test: Modernizr.inputtypes.month,
	nope:'monthpicker.js'
});

var getFieldLabel = function(field){
	if('labels' in filed && filed.labels.length > 0){
		return filed.labels[0].innerText;
	}
	if(field.parentNode && field.parentNode.tagName.toLowerCase()==='label')
	{
		return field.parentNode.innerText;
	}
	return '';
}

var submitForm = fucntion(e){
	if(!saveBtnClicked){
		validateForm();
		var i = 0,
			ln = orderForm.length,
			field,
			errors=[],
			errorFields = [],
			errorMsg='';

		for(; i<ln; i++){
			field = orderForm[i];
			if((!!field.validationMessage && 
				field.validationMessage.length >0)||(!!field.checkValidity 
				&& !field.checkValidity())
				){
					errors.push(
						getFieldLabel(field)+': '+field.validationMessage
					);
					errorsFields.push(field);
			}
		}

		if(errors.length>0){
			e.preventDefault();

			errorMsg = errors.join('\n');

			alert('Please fix the following errors:\n' +errorMsg, 'Error');
			orderForm.className = 'invalid';
			errorsFields[0].focus();
		}
	}
};
orderForm.addEventListener('submit', submitForm, false);
