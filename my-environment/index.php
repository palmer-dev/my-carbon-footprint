<?php
    session_start();

    if ($_SESSION["connected"] != true){
        header("Location: ./login");
    }
    
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
        <h2>Welcome <?= $userFirstName . " " ?>!</h2>

        <div class="card">
            <h3 class="titreCarte">My Itinerary</h3>
            <div class="contentCard" id="itinerary">
                <h4 id="itineraryNoData">You did not register any itinerary !</h4>
            </div>
        </div>
        <div class="card">
            <h3 class="titreCarte">My Habits</h3>
            <div class="contentCard" id="habits">
                <h4 id="habitsNoData"> You did not answer the quiz about your habits !</h4>

            </div>
        </div>
        <div class="card">
            <h3 class="titreCarte">Advices</h3>
            <div class="contentCard" id="advices">
                 <h4 id="advicesNoData">We do not have any advice for you, you have already a good lifestyle for the carbon footprint! 😃</h4>
            </div>
        </div>
        <div class="card">
            <h3 class="titreCarte">My Information</h3>
            <div class="contentCard" id="informations">
                <?php if (!$_SESSION["connected"]) : ?>
                <h4 id="informationNoData"> We do not have any information about you 😕</h4>
                <?php else :?>
                <p class="userName">Name: <span class="boldInfos"><?= $userFirstName ?></span></p>
                <p class="userLastName">Last name: <span class="boldInfos"><?= $userLastName ?></span></p>
                <p class="userEMail">E-Mail: <span class="boldInfos"><?= $userEmail ?></span></p>

                <input type="button" value="Delete account" id="deleteAccountBtn">

                <p class="caution">⚠️</p>
                <p class="caution">⚠️</p>
                <p class="caution">⚠️</p>
                <p class="caution">⚠️</p>

                <?php endif ?>
            </div>
        </div>
    </div>
    <input type="hidden" name="idUser" id="idUser" value="<?= $userId ?>">
</div>
</body>
<script src="/my-habits/assets/script/calculatorfct.js"></script>
<script type="module" src="./assets/script/script.js"></script>

</html>