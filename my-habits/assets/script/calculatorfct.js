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
        busConsommation(kmBus, findInJson(data, "bus"))
    metroConsommation(kmMetro, findInJson(data, "metro"));
    // console.log(emission);
    return emission;
}

function heatingConsommation(type) {
    heatingConso = type.conso
    return heatingConso;
}