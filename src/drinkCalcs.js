const calcMLPerStandard = (drink) =>{
    return 17.05 / (drink.alcohol_percent / 100)
//return (drink.total_volume * drink.pieces_per) / calcStandard(drink);
}

const calcPricePerML = (drink) =>{
    return drink.price / (drink.total_volume * drink.pieces_per);
}

const calcStandard = (drink) =>{
    return (((drink.total_volume * drink.pieces_per) * drink.alcohol_percent) / 17.05) / 100
}

const calcStandardPrice = (drink) =>{
    return calcMLPerStandard(drink) * calcPricePerML(drink);  
}


export {calcMLPerStandard, calcPricePerML, calcStandard, calcStandardPrice}