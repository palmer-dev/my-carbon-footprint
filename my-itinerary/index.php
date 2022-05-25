<?php
    session_start();
    
    $userFirstName = $_SESSION['firstname'];
    $userLastName = $_SESSION['lastname'];
    $userEmail = $_SESSION['email'];
    $userId = $_SESSION['userid'];
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include $_SERVER["DOCUMENT_ROOT"] . "/assets/php/head.php"; ?>
    <title>My Carbon Footprint</title>
    <script src="./assets/script/sqlCommunication.js"></script>
    <script src="/my-itinerary/assets/script/script.js"></script>
</head>

<body>
<!-- LOADER -->
<div id="loader" class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
<!-- END LOADER -->

<!-- MAIN PAGE -->
<div id="mainPage">
    <!-- Elements who need full width -->
    <!-- MENU -->
    <?php include_once $_SERVER["DOCUMENT_ROOT"] . "/assets/php/navigation.php"; ?>


    <div class="useful-width">
        <!-- Elements who do not need to be full width (standard container) -->
        <div class="page">
            <div class="top-card">
                <h1 class="title">What's your next trip ?</h1>
            </div>

            <form action="" class="form">
                <input type="text" name="" id="origin-input" class="textfield reverse" placeholder="Departure">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
                <input type="text" name="" id="destination-input" class="textfield normal" placeholder="Arrival">

                <input type="hidden" name="origin-input-id" id="origin-input-id">
                <input type="hidden" name="destination-input-id" id="destination-input-id">
            </form>

            <div class="bottomReveal">
                <input type="submit" value="Save my itinerary" class="saveButton" id="saveButton"
                    onclick="saveItinerary()" disabled>
            </div>

            <div class="vehiculelist">
                <?php if (false == true) : ?>
                <!-- <input type='radio' name='cardTransportMean' id='name' />
                <label for='name' class='vehiculeProvisoir'>
                    <p id='emoji'>🌐</p>
                    <p id='name'>provisoir</p>
                    <h3 id='consoid'>0<br> kg CO2</h3>
                </label> -->
                <script>
                setTimeout(() => {
                    for (let card = 0; card < 6; card++) {
                        setTimeout(() => {
                            generationCard("provisoir", "🌐", "", card);
                        }, 50 * card);
                    }
                }, 1000);
                </script>
                <?php endif ?>
            </div>
        </div>


    </div>
    <input type="hidden" name="idUser" id="idUser" value="<?= $userId ?>">
</div>
</body>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAPkb9swgCy7sy02SeLUuT8B7apC0Hh94&libraries=geometry,places&callback=initMap"
    async defer></script>
<?php if ($_SESSION["connected"] == true) : ?>
<script>
const canSave = true;
</script>
<?php endif ?>

</html>