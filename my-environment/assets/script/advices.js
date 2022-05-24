import { selectDataBase } from "../../../assets/script/sqlCommunication.js";

export function getAdvicesFromUser(callbackFunc) {
    // FUNCTION TO DEFINE
    const dataForRequest = {
        typeinserted: "getUserDataAdvices",
        userid: document.getElementById("idUser").value,
    };
    selectDataBase(dataForRequest, treatmentAdvices());
}

function treatmentAdvices(dataUser) {
    console.log(dataUser);
};

function rankingTransport(currentTransport) {
    let bestTransport = currentTransport;
    switch (bestTransport) {
        case 'Car' || 'Taxi':
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