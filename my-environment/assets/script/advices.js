import { selectDataBase } from "../../../assets/script/sqlCommunication.js";

let fonctionCallBackGlobal;

export function getAdvicesFromUser(callbackFunc) {
    // FUNCTION TO DEFINE
    const dataForRequest = {
        typeinserted: "getUserDataAdvices",
        userid: document.getElementById("idUser").value,
    };
    fonctionCallBackGlobal = callbackFunc;
    selectDataBase(dataForRequest, treatmentAdvices);
}

function treatmentAdvices(dataUser) {
    const transportMeanMostlyUsedByKm = Object.keys(dataUser.maxValue[0])[0].replace(" trip", "");
    const transportMeanMostlyUsedQuestion = dataUser.habits["Most used transport means"];
    const adviceTransport = rankingTransport(transportMeanMostlyUsedQuestion);

    const energyUsedAtHome = dataUser.habits["Energie at home"];
    const adviceEnergyAtHome = rankingEnergyProduction(energyUsedAtHome);

    const heatingSystem = dataUser.habits["Heating system"];
    const adviceHeatingSystem = rankingHeatingSystem(heatingSystem);

    const carFuel = dataUser.habits["Energy consumed"];
    const adviceCarFuel = rankingCarFuel(carFuel);

    const seasonalProduct = dataUser.habits["Seasonal product consumption"];
    const adviceSeasonalProduct = rankingSeasonalProduct(seasonalProduct);

    // PREPARATION FOR RETURN
    let listAdvices = [];
    if (transportMeanMostlyUsedQuestion != adviceTransport) {
        listAdvices.push({ title: "Transport mean", advice: `You may better use the ${adviceTransport} than the ${transportMeanMostlyUsedQuestion} for your trips.`, profit: getProfit("transportMean", transportMeanMostlyUsedQuestion, adviceTransport) })
    }

    if (energyUsedAtHome != adviceEnergyAtHome) {
        listAdvices.push({ title: "Energy at home", advice: `You may better use ${adviceEnergyAtHome} energy than the ${energyUsedAtHome} energy for your home.`, profit: getProfit("energyAtHome", energyUsedAtHome, adviceEnergyAtHome) })
    }
    if (heatingSystem != adviceHeatingSystem) {
        listAdvices.push({ title: "Heating system", advice: `You may better use ${adviceHeatingSystem} than the ${heatingSystem} for your heating system.`, profit: getProfit("heatingSystem", heatingSystem, adviceHeatingSystem) })
    }
    if (carFuel != adviceCarFuel) {
        listAdvices.push({ title: "Car fuel", advice: `You may better use a car that uses ${adviceCarFuel} than a car that uses ${carFuel}.`, profit: getProfit("carFuel", carFuel, adviceCarFuel) })
    }
    if (seasonalProduct == "No") {
        listAdvices.push({ title: "Eating seasonal products", advice: adviceSeasonalProduct, profit: getProfit("seasonalProducts", seasonalProduct, adviceSeasonalProduct) })
    }

    // CALL A FUNCTION THAT WILL GENERATE CARDS
    fonctionCallBackGlobal(listAdvices);
}

function rankingTransport(currentTransport) {
    let bestTransport = currentTransport;
    switch (bestTransport) {
        case 'Car':
            bestTransport = "Metro";
            break;
        case 'Taxi':
            bestTransport = "Metro";
            break;
        case 'Bus':
            bestTransport = "Metro";
            break;
        case 'Metro':
            bestTransport = "Bike";
            break;
    }
    return bestTransport
}

function rankingHeatingSystem(currentHeatingSystem) {
    let bestHeatingSystem;
    //["Electricity","Geothermal energy","Natural gaz","GPL","Charcoal","Fuel"]
    switch (currentHeatingSystem) {
        case 'Charcoal':
            bestHeatingSystem = 'Fuel';
            break;
        case 'Fuel':
            bestHeatingSystem = 'Natural gaz';
            break;
        case 'Natural gaz':
            bestHeatingSystem = 'GPL';
            break;
        case 'GPL':
            bestHeatingSystem = "Electricity";
            break;
        case 'Electricity':
            bestHeatingSystem = "Geothermal energy";
            break;
        default:
            bestHeatingSystem = currentHeatingSystem;
    }
    return bestHeatingSystem
}

function rankingEnergyProduction(currentHeatingSystem) {
    let bestHeatingSystem;
    //["Charcoal", "Fuel", "Gaz", "Nuclear", "Wind power", "Geothermal energy", "Sun power", "Hydraulic"]
    switch (currentHeatingSystem) {
        case 'Charcoal':
            bestHeatingSystem = 'Fuel';
            break;
        case 'Fuel':
            bestHeatingSystem = 'Gaz';
            break;
        case 'Gaz':
            bestHeatingSystem = 'Geothermal energy';
            break;
        case 'Geothermal energy':
            bestHeatingSystem = 'Sun power';
            break;
        case 'Sun power':
            bestHeatingSystem = 'Wind power'
            break;
        case 'Wind power':
            bestHeatingSystem = 'Hydraulic';
            break;
        case 'Hydraulic':
            bestHeatingSystem = 'Nuclear';
            break;
        default:
            bestHeatingSystem = currentHeatingSystem;
    }
    return bestHeatingSystem
}

function rankingCarFuel(currentFuel) {
    let bestFuel;
    switch (currentFuel) {
        case 'Gasoline':
            bestFuel = 'Diesel Fuel'
            break;
        case 'Diesel Fuel':
            bestFuel = 'Ethanol';
            break;
        case 'Ethanol':
            bestFuel = "Bio-diesel";
            break;
        case 'Bio-diesel':
            bestFuel = "Electricity";
            break;
        case 'Other':
            bestFuel = "We cannot say what is better that something that we do not know";
            break;
        default:
            bestFuel = currentFuel;
    }
    return bestFuel
}

function rankingSeasonalProduct(currentSeasonalConsumption) {
    switch (currentSeasonalConsumption) {
        case 'No':
            return "You better eat seasonal product instead of random products. It's better for you health and for our planet ;)";
        case 'Yes':
            return "It's good to eat seasonal product! Great job!"
    }
}

function getProfit(type, oldMethod, newMethod) {
    // To define Calcul profite between old and new methode of an
    switch (type) {
        case 'transportMean':
            break;
        case 'energyAtome':
            break;
        case 'heatingSystem':
            break;
        case 'carFuel':
            break;
        case 'seasonalProducts':
            break;
    }
}