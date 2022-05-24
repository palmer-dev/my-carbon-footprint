<?php
    session_start();
    $_SESSION["connected"] = false;
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include $_SERVER["DOCUMENT_ROOT"] . "/assets/php/head.php"; ?>
    <title>My Carbon Footprint</title>
</head>

<body>

    <!-- Elements who need full width -->
    <!-- MENU -->
    <?php include_once $_SERVER["DOCUMENT_ROOT"] . "/assets/php/navigation.php"; ?>


    <div class="useful-width fullheight">
        <!-- Elements who do not need to be full width (standard container) -->
        <div class="card">
            <h3>LOGIN</h3>

            <div class="input">
                <label for="password">Username</label>
                <input type="text" name="username" id="username" placeholder="ENTER YOUR USERNAME">
                <p class="error">
                    <span id="username-errNotValid">Your username is not valide !</span>
                </p>
            </div>

            <div class="input">
                <label for="password">Your password:</label>
                <input type="password" name="password" id="password" placeholder="ENTER YOUR PASSWORD" onkeydown="">
                <p class="error">
                    <span id="password-errNotValid">Your password is not valide !</span>
                </p>
            </div>

            <input type="submit" value="LOGIN" id="login">
            <input type="button" value="Create an account" onclick="document.location.href = '../create-account/'">
            <p>To see more about the legal information see <a class="thirdAction" href="../legalInformations.php">the
                    Legal Informations
                    Page</a></p>
        </div>
    </div>

    <script type="module" src="./assets/script/script.js"></script>
</body>

</html>