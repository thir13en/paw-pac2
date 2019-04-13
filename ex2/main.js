const addElement = () => {
	const text = $('input[name="elToAdd"]').val();
	const parentText = $('input[name="parent"]').val();
	const ulOpen = '<ul>';
	const ulClose = '</ul>';
	const liOpen = '<li>';
	const liClose = '</li>';

	if (text && text.length) {
		/** there is no content yet */
		if ($('.list-container').html() === '') {
			$('.list-container').html(ulOpen + liOpen + text + liClose + ulClose);
		} else {		
			if (parentText) {
				const referencedEl = getReferencedEl($('.list-container li'), parentText);
				if (referencedEl) {
					if(referencedEl.children('ul').length) {
						referencedEl.children('ul').append(liOpen + text + liClose);
					} else {
						referencedEl.append(ulOpen + liOpen + text + liClose + ulClose);
					}
				}
			} else {
				$('.list-container > ul').append(liOpen + text + liClose);
			}
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
		if (elements[el].innerText.split('\n')[0] === text) {
			return element = el;
		}
	});

	return elements[element] ? $(elements[element]) : undefined;
}

