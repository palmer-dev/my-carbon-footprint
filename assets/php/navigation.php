<?php session_start(); ?>

<nav>
    <div class="useful-width">
        <div>
            <img src="/assets/img/png/nav-banniere.png" alt="" srcset="">
        </div>
        <div>
            <label for="check">
                <input type="checkbox" id="check" onclick="dropBurger(this)" />
                <span></span>
                <span></span>
                <span></span>
            </label>
            <ul>
                <li id="HP"><a href="/">Home Page</a></li>
                <li id="MI"><a href="/my-itinerary/">My Itinerary</a></li>
                <li id="MH"><a href="/my-habits/">My Habits</a></li>
                <li id="ME"><a href="/my-environment/">My Environment</a></li>
                <?php if ($_SESSION["connected"]) : ?>
                <li><a href="/logout.php" class="logout"><img src="/assets/img/svg/logout-svgrepo-com.svg"></a></li>
                <?php endif ?>
            </ul>
        </div>
    </div>
</nav>
<div id="burger">
</div>
<script src="/assets/script/menu.js"></script>

<?php if ($_SESSION["connected"]) : ?>
<script>
var menu = [{
        title: "Home page",
        link: "/",
        id: "HP"
    },
    {
        title: "My Itinerary",
        link: "/my-itinerary/",
        id: "MI"
    },
    {
        title: "My Habits",
        link: "/my-habits/",
        id: "MH"
    },
    {
        title: "My Environment",
        link: "/my-environment/",
        id: "ME"
    },
    {
        title: "Log Out",
        link: "/logout.php"
    },
];

generationBurger(menu);
</script>

<?php else : ?>
<script>
var menu = [{
        title: "Home page",
        link: "/",
        id: "HP"
    },
    {
        title: "My Itinerary",
        link: "/my-itinerary/",
        id: "MI"
    },
    {
        title: "My Habits",
        link: "/my-habits/",
        id: "MH"
    },
    {
        title: "My Environment",
        link: "/my-environment/",
        id: "ME"
    },
];

generationBurger(menu);
</script>
<?php endif ?>