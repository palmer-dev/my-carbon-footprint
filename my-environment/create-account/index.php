<?php
    session_start();

    if (isset($_POST["createNew"])) {
        $_SESSION["connected"] = true;
    }
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

    <div class="backgroundclouds" id="backgroundClouds">
        <embed src="./assets/img/svg/cloud.svg" class="clouds" id="cloud1" />
        <embed src="./assets/img/svg/cloud.svg" class="clouds" id="cloud2" />
        <embed src="./assets/img/svg/cloud.svg" class="clouds" id="cloud3" />
        <embed src="./assets/img/svg/cloud.svg" class="clouds" id="cloud4" />
    </div>

    <div class="useful-width">
        <!-- Elements who do not need to be full width (standard container) -->
        <div class="form">
            <div class="userInfos">
                <div class="input">
                    <label for="firstname">Your first name:</label>
                    <input type="text" name="firstname" id="firstname" placeholder="FIRST NAME">
                </div>
                <div class="input">
                    <label for="lastname">Your last name:</label>
                    <input type="text" name="lastname" id="lastname" placeholder=" LAST NAME">
                </div>
            </div>
            <div class="loginInfos">
                <div class="input fullwidth">
                    <label for="email">Your E-Mail <span class="asterisk">*</span>:</label>
                    <input class="full" type="email" name="email" id="email" placeholder="E-MAIL">
                    <p class="error">
                        <span id="email-errDuplicate">E-Mail adress already linked to an existing account</span>
                        <span id="email-errMandatory">The e-Mail is invalid !</span>
                    </p>
                </div>
                <div class="input half">
                    <label for="username">Your username <span class="asterisk">*</span>:</label>
                    <input class="full" type="text" name="username" id="username" placeholder="USERNAME" require
                        pattern="^.{5,}$">
                    <p class="error">
                        <span id="username-errDuplicate">Username already exist !</span>
                        <span id="username-errMandatory">The username must be more than 5 characters !</span>
                    </p>
                </div>
                <div class="input half">
                    <label for="password">Your password <span class="asterisk">*</span>:</label>
                    <input class="full" type="password" name="password" id="password" placeholder="PASSWORD" require
                        pattern="^.{5,}$">
                    <p class="error">
                        <span id="password-errMandatory">The password must be more than 5 characters !</span>
                    </p>
                </div>
            </div>
            <p class="legend"><span class="asterisk">*</span> The field is mandatory</p>
            <input type="submit" value="CREATE ACCOUNT" name="createNew" id="createNew">
            <br>
            <p>To see more about the legal information see <a class="thirdAction" href="../legalInformations.php">the
                    Legal Informations
                    Page</a></p>
        </div>
    </div>

    <script type="module" src="./assets/script/script.js"></script>
</div>
</body>

</html>