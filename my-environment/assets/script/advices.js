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
    if (dataUser == null){return}

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
        listAdvices.push({ id: generateUUID(), title: "Transport mean", advice: `You may better use the ${adviceTransport} than the ${transportMeanMostlyUsedQuestion} for your trips.`, currentCO2: getCurrentCO2(dataUser), profit: getProfit("transportMean", transportMeanMostlyUsedQuestion, adviceTransport, dataUser) })
    }

    if (energyUsedAtHome != adviceEnergyAtHome) {
        listAdvices.push({ id: generateUUID(), title: "Energy at home", advice: `You may better use ${adviceEnergyAtHome} energy than the ${energyUsedAtHome} energy for your home.`, currentCO2: getCurrentCO2(dataUser), profit: getProfit("energyAtHome", energyUsedAtHome, adviceEnergyAtHome, dataUser) })
    }
    if (heatingSystem != adviceHeatingSystem) {
        listAdvices.push({ id: generateUUID(), title: "Heating system", advice: `You may better use ${adviceHeatingSystem} than the ${heatingSystem} for your heating system.`, currentCO2: getCurrentCO2(dataUser), profit: getProfit("heatingSystem", heatingSystem, adviceHeatingSystem, dataUser) })
    }
    if (carFuel != adviceCarFuel) {
        listAdvices.push({ id: generateUUID(), title: "Car fuel", advice: `You may better use a car that uses ${adviceCarFuel} than a car that uses ${carFuel}.`, currentCO2: getCurrentCO2(dataUser), profit: getProfit("carFuel", carFuel, adviceCarFuel, dataUser) })
    }
    if (seasonalProduct == "No") {
        listAdvices.push({ id: generateUUID(), title: "Eating seasonal products", advice: adviceSeasonalProduct, currentCO2: getCurrentCO2(dataUser), profit: getProfit("seasonalProducts", seasonalProduct, adviceSeasonalProduct, dataUser) })
    }

    // CALL A FUNCTION THAT WILL GENERATE CARDS
    fonctionCallBackGlobal(listAdvices);
}

function rankingTransport(currentTransport) {
    let bestTransport = currentTransport;
    switch (bestTransport) {
        case 'Car':
            bestTransport = "Bus";
            break;
        case 'Taxi':
            bestTransport = "Bus";
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
            bestHeatingSystem = "Geothermal energy";
            break;
        case 'Geothermal energy':
            bestHeatingSystem = "Electricity";
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

function getCurrentCO2(allUserData){
    // To define Calcul profite between old and new methode of an
    let kmVoiture = parseInt(allUserData.habits["Car trip"]) || 0;
    let typeVoiture = allUserData.habits["Energy consumed"] === "" ? "Electricity": allUserData.habits["Energy consumed"];
    let kmBus = parseInt(allUserData.habits["Bus trip"]) || 0;
    let kmPlane = parseInt(allUserData.habits["Plane trip"]) || 0;
    let kmTrain = parseInt(allUserData.habits["Train trip"]) || 0;
    let kmMetro = parseInt(allUserData.habits["Metro trip"]) || 0;
    let typeHeating = allUserData.habits["Heating system"] === "" ? "Electricity": allUserData.habits["Heating system"];
    let sizeHome = parseInt(allUserData.habits["Home size"]) || 0;
    let typeElectricity = allUserData.habits["Energie at home"] === "" ? "Nuclear": allUserData.habits["Energie at home"];
    let freqmeat = parseInt(allUserData.habits["Meat consumption"]) || 0;
    let local = allUserData.habits["local product consumption"] === "" ? "No" : allUserData.habits["local product consumption"];

    // VARIABLES LOCALLY DEFINED
    let difference = 0;
    let data = loadDataJSON("/my-habits/assets/json/data.json");

    return totalConsommation(kmVoiture,typeVoiture,kmBus,kmPlane,kmTrain,kmMetro,typeHeating,sizeHome,typeElectricity,freqmeat,local,JSON.parse(data)).toFixed(2);
}

function getProfit(type, oldMethod, newMethod, allUserData) {
    // To define Calcul profite between old and new methode of an
    let kmVoiture = parseInt(allUserData.habits["Car trip"]) || 0;
    let typeVoiture = allUserData.habits["Energy consumed"] === "" ? "Electricity": allUserData.habits["Energy consumed"];
    let kmBus = parseInt(allUserData.habits["Bus trip"]) || 0;
    let kmPlane = parseInt(allUserData.habits["Plane trip"]) || 0;
    let kmTrain = parseInt(allUserData.habits["Train trip"]) || 0;
    let kmMetro = parseInt(allUserData.habits["Metro trip"]) || 0;
    let typeHeating = allUserData.habits["Heating system"] === "" ? "Electricity": allUserData.habits["Heating system"];
    let sizeHome = parseInt(allUserData.habits["Home size"]) || 0;
    let typeElectricity = allUserData.habits["Energie at home"] === "" ? "Nuclear": allUserData.habits["Energie at home"];
    let freqmeat = parseInt(allUserData.habits["Meat consumption"]) || 0;
    let local = allUserData.habits["local product consumption"] === "" ? "No" : allUserData.habits["local product consumption"];

    // VARIABLES LOCALLY DEFINED
    let difference = 0;
    let data = loadDataJSON("/my-habits/assets/json/data.json");

    let oldValue = 0;
    let newValue = 0;

    switch (type) {
        case 'transportMean':
            // TO DEFINE EXACTLY
            oldValue = totalConsommation(kmVoiture,typeVoiture,kmBus,kmPlane,kmTrain,kmMetro,typeHeating,sizeHome,typeElectricity,freqmeat,local,JSON.parse(data));
            let arrayKm = [kmVoiture,kmBus,kmPlane,kmTrain,kmMetro];
            let toAdd = 0;
            switch (oldMethod) {
                case 'Car':
                    toAdd = arrayKm[0];
                    arrayKm[0] = 0;
                    break;
                case 'Taxi':
                    toAdd = arrayKm[0];
                    arrayKm[0] = 0;
                    break;
                case 'Bus':
                    toAdd = arrayKm[1];
                    arrayKm[1] = 0;
                    break;
                case 'Metro':
                    toAdd = arrayKm[4];
                    arrayKm[4] = 0;
                    break;
            }
            switch (newMethod) {
                case 'Car':
                    arrayKm[0] += toAdd;
                    break;
                case 'Taxi':
                    arrayKm[0] += toAdd;
                    break;
                case 'Bus':
                    arrayKm[1] += toAdd;
                    break;
                case 'Metro':
                    arrayKm[4] += toAdd;
                    break;
            }
            newValue = totalConsommation(arrayKm[0],typeVoiture,arrayKm[1],arrayKm[2],arrayKm[3],arrayKm[4],typeHeating,sizeHome,typeElectricity,freqmeat,local,JSON.parse(data));
            difference = newValue - oldValue;
            return difference.toFixed(2);
        case 'energyAtHome':
            oldValue = totalConsommation(kmVoiture,typeVoiture,kmBus,kmPlane,kmTrain,kmMetro,typeHeating,sizeHome,oldMethod,freqmeat,local,JSON.parse(data));
            newValue = totalConsommation(kmVoiture,typeVoiture,kmBus,kmPlane,kmTrain,kmMetro,typeHeating,sizeHome,newMethod,freqmeat,local,JSON.parse(data));
            difference = difference = newValue - oldValue;
            return difference.toFixed(2);
        case 'heatingSystem':
            oldValue = totalConsommation(kmVoiture, typeVoiture, kmBus, kmPlane, kmTrain, kmMetro, oldMethod, sizeHome, typeElectricity, freqmeat, local, JSON.parse(data));
            newValue = totalConsommation(kmVoiture, typeVoiture, kmBus, kmPlane, kmTrain, kmMetro, newMethod, sizeHome, typeElectricity, freqmeat, local, JSON.parse(data));
            difference = difference = newValue - oldValue;
            return difference.toFixed(2);
        case 'carFuel':
            oldValue = totalConsommation(kmVoiture, oldMethod, kmBus, kmPlane, kmTrain, kmMetro, typeHeating, sizeHome, typeElectricity, freqmeat, local, JSON.parse(data));
            newValue = totalConsommation(kmVoiture, newMethod, kmBus, kmPlane, kmTrain, kmMetro, typeHeating, sizeHome, typeElectricity, freqmeat, local, JSON.parse(data));
            difference = difference = newValue - oldValue;
            return difference.toFixed(2);
        case 'seasonalProducts':
            oldValue = totalConsommation(kmVoiture,typeVoiture,kmBus,kmPlane,kmTrain,kmMetro,typeHeating,sizeHome,typeElectricity,freqmeat,oldMethod,JSON.parse(data));
            newValue = totalConsommation(kmVoiture,typeVoiture,kmBus,kmPlane,kmTrain,kmMetro,typeHeating,sizeHome,typeElectricity,freqmeat,newMethod,JSON.parse(data));
            difference = difference = newValue - oldValue;
            return difference.toFixed(2);
    }
}

function loadDataJSON(filePath, mimeType)
{
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",filePath,false);
    xmlhttp.overrideMimeType("application/json");
    xmlhttp.send();
    if (xmlhttp.status==200 && xmlhttp.readyState == 4 )
    {
        return xmlhttp.responseText;
    }
    else {
        return null;
    }
}

function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = Math.random() * 16; //random number between 0 and 16
            if (d > 0) {
                //Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
}