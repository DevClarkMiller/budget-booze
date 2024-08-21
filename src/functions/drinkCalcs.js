const calcMLPerStandard = (drink) =>{
    if (drink)
        return 17.05 / (drink.alcohol_percent / 100)
}

const calcPricePerML = (drink) =>{
    if (drink)
        return drink.price / (drink.total_volume * drink.pieces_per);
}

const calcStandard = (drink) =>{
    if (drink)
        return (((drink.total_volume * drink.pieces_per) * drink.alcohol_percent) / 17.05) / 100
}

const calcStandardPrice = (drink) =>{
    if (drink)
        return calcMLPerStandard(drink) * calcPricePerML(drink);  
}


export {calcMLPerStandard, calcPricePerML, calcStandard, calcStandardPrice}