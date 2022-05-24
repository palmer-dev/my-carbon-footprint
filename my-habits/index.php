<?php
    session_start();
    
    $userFirstName = $_SESSION['firstname'];
    $userLastName = $_SESSION['lastname'];
    $userEmail = $_SESSION['email'];
    $userId = $_SESSION['userid'];

    // echo "erer";
    // print_r($_SESSION["userAnswers"]["itinerary"]);
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include $_SERVER["DOCUMENT_ROOT"] . "/assets/php/head.php"; ?>
    <title>My Carbon Footprint</title>
    <script src="/assets/script/animations.js"></script>
</head>

<body>

    <!-- Elements who need full width -->
    <!-- MENU -->
    <?php include_once $_SERVER["DOCUMENT_ROOT"] . "/assets/php/navigation.php"; ?>


    <div class="useful-width">
        <div class="pagemh">
            <div class="top">
                <div class="topleft reverse">
                    <h2 class="title">What is your carbone footprint ?</h2>

                    <div class="quiz">
                        <h2 class="titleQuiz">Want to do the Quiz ?</h2>
                        <div class="descriptionQuiz">
                            <!-- QUESTIONS ET INFOS JS -->
                        </div>
                        <button class="habitsQuiz" id="buttsuiv">I want to know !</button>
                    </div>
                </div>
                <div class="topright">
                    <img src="./assets/img/png/planete-icon.png" class="normal">
                </div>
            </div>

            <div class="description reverse">
                <img src="./assets/img/png/why.png">
                <div class="colonne">
                    <h3 class="titleP1">Why is it important to know it ?</h3>
                    <h4 class="descriptionP1">It is important to know your carbon footprint to know where you consume
                        the most. Some
                        habits that we have, even if we don't know it, increase our carbon footprint considerably and
                        are easy to change.
                        Small everyday gestures for the planet can, on a human scale, considerably reduce our
                        consumption
                    </h4>
                </div>
            </div>
            <div class="adv normal">
                <img src="./assets/img/png/reduire.png">
                <div class="colonne">
                    <h3 class="titleP2">How can you reduce it ?</h3>
                    <h4 class="descriptionP2">To reduce your carbon footprint you can first answer our quiz which will
                        give you an idea
                        of your carbon footprint in the main areas. Then by creating an account you can find a set of
                        tips tailored
                        to your habits. You can also use our route calculator to find out which mode of transport is the
                        most
                        environmentally friendly.
                    </h4>
                </div>

            </div>
        </div>
    </div>

    <input type="hidden" name="idUser" id="idUser" value="<?= $userId ?>">
    <script src="./assets/script/calculatorfct.js"></script>
    <script type="module" src="./assets/script/script.js"></script>
</body>
<?php if ($_SESSION["connected"] == true) : ?>
<script>
const canSave = true;
</script>
<?php endif ?>

</html>