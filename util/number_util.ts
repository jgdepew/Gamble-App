export function format_currency(amount, decimal_places = 2) {
    return Math.round(amount*Math.pow(10, decimal_places)) / Math.pow(10, decimal_places)
}

export function get_dice_roll() {
    return Math.floor(Math.random() * 5) + 1
}