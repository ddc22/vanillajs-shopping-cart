
const currency = {
    style: 'currency',
    currency: 'USD'
}

const hide = (element) => {
    element.classList.add("hidden");
}
const show = (element) => {
    element.classList.remove("hidden");
}

const enable = (element) => {
    element.removeAttribute("disabled");
}
const disable = (element) => {
    element.setAttribute("disabled", "true");
}

const strikeThrough = (element) => {
    element.classList.add("strikethrough");
}
const unStrikeThrough = (element) => {
    element.classList.remove("strikethrough");
}


export {
    hide,
    show,
    enable,
    disable,
    strikeThrough,
    unStrikeThrough,
    currency
}