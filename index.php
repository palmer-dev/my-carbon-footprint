<?php
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include './assets/php/head.php' ?>
    <title>My Carbon Footprint</title>
</head>

<body>
<!-- LOADER -->
<div id="loader" class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
<!-- END LOADER -->

<!-- MAIN PAGE -->
<div id="mainPage">

    <!-- Elements who need full width -->
    <!-- MENU -->
    <?php include_once './assets/php/navigation.php' ?>


    <div class="useful-width" id="lastDivSection">
        <!-- Elements who do not need to be full width (standard container) -->

        <div class="top-card">
            <h1>What is My Carbon Footprint exactly ?</h1>
        </div>

        <!-- First part WORK -->
        <div class="part work normal">
            <p>
                We all live in a world where the climate begins to be in the center of our lives. We all care more and
                more about our impact on the environment, and we can reduce it by some small tips and changing some
                habits that we have. Going from that, 2 students bring the idea to code a website giving you the ability
                to see your impact on the environment with the major greenhouse gas, the carbon dioxide (CO2). The data
                that we use to help you come from international databases from Our World in Data. And some french
                databases with the government site data.gouv.fr.
            </p>
            <img src="./assets/img/svg/work.svg" alt="" srcset="">
        </div>

        <div class="part reverse work">
            <p>
                The website gives you the ability to follow your CO2 emission with a few information about your habits.
                That way we can give you advice to reduce your carbon footprint with some small tips easy to do in your
                everyday life. We also give you the ability to calculate the carbon footprint of your trips, and show
                you different transport means for which you can change.
            </p>
            <img src="./assets/img/svg/plane.svg" alt="" srcset="">
        </div>

    </div>

    <!-- <img src="./assets/img/svg/separator.svg" alt="" srcset="" class="separator" id="separator"> -->
    <svg id="separator" class="separator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <defs>
            <linearGradient id="linear-gradient" x1="0.688" y1="1.72" x2="0.479" y2="-0.706"
                gradientUnits="objectBoundingBox">
                <stop offset="0" stop-color="#6290c8" />
                <stop offset="1" stop-color="#1f487e" />
            </linearGradient>
        </defs>
        <path id="Tracé_1" data-name="Tracé 1"
            d="M1920,1088.268c-109.9-9.29-409.457-109.754-662.713-113.647s-446.593,85.086-749.779,69.707S0,974.621,0,974.621V2052H1920Z"
            transform="translate(0 -973.971)" stroke="none" stroke-width="1" fill="url(#linear-gradient)" />
    </svg>


    <div class="useful-width next-section" id="sectionInSeparator">
        <div class="top-card">
            <h2>Some figures about carbon footprint <br />around the world</h2>
        </div>
        <div class="card">
            <h3 class="chartTitle">
                <p class="uppercase">Annual production-based emissions of carbon dioxide (CO2) </p><br> Values are
                measured in
                million tonnes
            </h3>
            <table id="chart">
            </table>
        </div>
    </div>
    <!-- SCRIPT DE RéCUPéRATION DES DONNéES -->
    <script type="module" src="./assets/script/script.js"></script>
</div>
</body>

</html>