const addElement = () => {
	const text = $('input[name="elToAdd"]').val();
	const parentText = $('input[name="parent"]').val();
	const ulOpen = '<ul>';
	const ulClose = '</ul>';
	const liOpen = '<li>';
	const liClose = '</li>';

	if (text && text.length) {
		/** obtenir l'element per fer append */
		const elementToAppend = ($('.list-container').html() === '' || !parentText) ?
									$('.list-container') :
									getReferencedEl($('.list-container li'), parentText);

		if (elementToAppend) {
			// create new element that will be appended
			const newElement = $(liOpen + getPositionText(elementToAppend) + text + liClose);
			newElement.click(e => onLiClick(newElement, e));
			if(elementToAppend.children('ul').length) {
				elementToAppend.children('ul').append(newElement);
			} else {
				const ulEl = $(ulOpen + ulClose);
				elementToAppend.append(ulEl.append(newElement));
			}
			newElement.click();
		}
	}
	cleanInputs();
}

const cleanInputs = () => {
	$('input[name="elToAdd"]').val('');
	$('input[name="parent"]').val('');
}

const getReferencedEl = (elements, text) => {
	let element;

	elements.each(el => {
		if (elements[el].innerText.split('\n')[0].split(' ')[1] === text) {
			return element = el;
		}
	});

	return elements[element] ? $(elements[element]) : undefined;
}

const getPositionText = (el) => {
	return (el.children('ul').children('li').length + 1) + '. ';
}

const onLiClick = (clickedElement, event) => {
	event.stopPropagation();
	// unfold selected list
	$('li').css('color', 'black');
	clickedElement.css('color', 'blue');
	foldUnselectedList(clickedElement);
	unfoldSelectedList(clickedElement);
};

const foldUnselectedList = element => {
	if (element.length && element.parent('ul').length) {
		element.siblings('li').children('ul').slideUp();
		foldUnselectedList(element.parent('ul').parent('li'));
	}
}

const unfoldSelectedList = element => {
	if (element.length && element.children('ul').length) {
		element.children('ul').slideDown();
		foldSelectedSecondChildrens(element.children('ul'));
	}
}

const foldSelectedSecondChildrens = element => {
	if (element.length && element.children('li').length) {
		element.children('li').children('ul').slideUp();
		foldSelectedSecondChildrens(element.children('li').children('ul'));
	}
}

