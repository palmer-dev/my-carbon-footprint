//find the array in json
function findInJson(data, valeur) {
    var result = data.find(datas => datas.type === valeur)
    return result
}

//all fonction is per year
function carConsommation(km, type) {
    let carConso = 0;
    km = km * 52;
    carConso = km * type.conso;
    return carConso
}

function planeConsommation(km, type) {
    let planeConso = 0;
    planeConso = km * type.conso
    return planeConso
}

function trainConsommation(km, type) {
    let trainConso = 0;
    km = km * 52;
    trainConso = km * type.conso;
    return trainConso
}

function metroConsommation(km, type) {
    let metroConso = 0;
    km = km * 52;
    metroConso = km * type.conso;
    return metroConso
}
function busConsommation(km, type) {
    let busConso = 0;
    km = km * 52;
    busConso = km * type.conso;
    return busConso
}

function getTotalTransport(kmCar, typeVoiture, kmBus, kmPlane, kmTrain, kmMetro, data) {
    emission = carConsommation(kmCar, findInJson(data, typeVoiture + "Car")) +
        planeConsommation(kmPlane, findInJson(data, "plane")) +
        trainConsommation(kmTrain, findInJson(data, "train")) +
        busConsommation(kmBus, findInJson(data, "bus")) +
        metroConsommation(kmMetro, findInJson(data, "metro"));
    // console.log(emission);
    return emission;
}

function heatingConsommation(type, size) {
    heatingConso = type.conso * size
    return heatingConso;
}

function electricityProduction(type, size, data) {
    let electricityConsommation = 0;
    if(size <= 60){
        consom = findInJson(data, "consologement60") // logement petit
    }else{
        consom = findInJson(data, "consologement61") //logement grand
    }
    electricityConsommation = consom.conso * type.conso;

    return electricityConsommation;
}

function eatMeat(freq, local, data) {
    let meatConsommation = 0;
    portion = freq / 3
    if(local == "yes"){
        consom = findInJson(data, "eatmeatlocal")
    }else{
        consom = findInJson(data, "eatmeat")
    }
    meatConsommation = (consom.conso * portion) * 52
    return meatConsommation;
}

function totalConsommation(kmVoiture = 0, typeVoiture = "Gasoline", kmBus = 0, kmPlane = 0, kmTrain = 0, kmMetro = 0, typeHeating = "Electricity", sizeHome = 0, typeElectricity = "Nuclear",freqmeat = 0,local = "No", data) {
    const total = getTotalTransport(kmVoiture, typeVoiture, kmBus, kmPlane, kmTrain, kmMetro, data) +
		heatingConsommation(findInJson(data, "chauffage"+typeHeating), sizeHome) +
		electricityProduction(findInJson(data, "electricity"+typeElectricity),sizeHome,data) +
		eatMeat(freqmeat,local,data)

    return total
}