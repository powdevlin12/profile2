module.exports = {
    randomGift: () => {
        return Math.floor(Math.random() * 101)
    },
    handleFindGift: (gifts, percent) => {
        if (percent >= 11) {
            return gifts.filter(gift => gift.percentWin === 11)
        } else if (percent <= 9 && percent >= 8) {
            return gifts.filter(gift => gift.percentWin === 9)
        } else if (percent <= 7 && percent >= 6) {
            return gifts.filter(gift => gift.percentWin === 7)
        } else {
            return gifts.filter(gift => gift.percentWin === 5)
        }
    }
}