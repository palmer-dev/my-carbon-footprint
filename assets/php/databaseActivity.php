<?php
    session_start();

    header("Content-Type: application/json; charset=utf8mb4");

    class question {
        public string $id;
        public string $theme;
        public string $question;
        public array|object $possibleAnswers;
        public string|int $userAnswwer;
        public function __construct(string $id,string $theme, string $question, string $possibleAnswers) {
            $this->id = $id;
            $this->theme = $theme;
            $this->question = $question;
            if ($possibleAnswers[0] == "{"){
                $this->possibleAnswers = (object) json_decode($possibleAnswers);
            }
            else{
                $provArray = [];
                foreach (((object) json_decode($possibleAnswers)) as $key => $value) {
                    array_push($provArray, $value);
                }
                $this->possibleAnswers = (array) $provArray;
            }
        }
    }

    class itinerary {
        public string $id;
        public string $origin;
        public string $destination;
        public object $transportMean;
        public float $distance;
        public float $co2;
        public function __construct(string $id,string $origin, string $destination, string $transportMean, string $distance, string $co2) {
            $this->id = $id;
            $this->origin = $origin;
            $this->destination = $destination;
            $this->transportMean = (object) json_decode($transportMean);
            $this->distance = floatval($distance);
            $this->co2 = floatval($co2);
        }
    };

    class habits {
        public string $id;
        public string $dateCreation;
        public object $userAnswers;

        public function __construct(string $id, string $dateCreation, string $userAnswersObject)
        {
            // DEFINITION VARIABLE
            $this->id = $id;
            $this->dateCreation = $dateCreation;
            $this->userAnswers = (object) json_decode($userAnswersObject);
        }
    }

    class advicesInfos {
        public string $id;
        public string $key;
        public string $value;
    }

    class Database {
        private $host = "127.0.0.1";
        private $database_name = "MCF";
        private $username = "mcfdev";
        private $password = "McfDevPswSec69";
        public $conn;
        public function getConnection(){
            $this->conn = null;
            try{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
                $this->conn->exec("set names utf8mb4");
            }catch(PDOException $exception){
                echo "Database could not be connected: " . $exception->getMessage();
            }
            return $this->conn;
        }
        
        public function sqlInsert($sqlRequest){
            try {
                $db = $this->getConnection();
                $db->query($sqlRequest);
                return ["error" => false, "textReturned" => "Data inserted successfully"];
            } catch (Exception $exception) {
                return ["error" => true, "textReturned" => $exception->errorInfo]; 
            }            
        }

        public function userSessionSave($user){
            $_SESSION["connected"] = true;
            $_SESSION["firstname"] = $user["us_firstname"];
            $_SESSION["lastname"] = $user["us_lastname"];
            $_SESSION["email"] = $user["us_email"];
            $_SESSION["userid"] = $user["us_id"];

            $cookieValues = json_decode($_COOKIE["userAnswers"]);

            try {
                if (isset($cookieValues->habits)){
                    
                    // Enregistrement des données provisoires habits
                    $linkerId = $cookieValues->linkerId;
                    foreach ($cookieValues->habits as $key => $value) {
                        $requestInsertion = "CALL Ins_user_habits_answer('$linkerId','". $user['us_id'] ."','$value->id','$value->userAnswer')";
                        $this->sqlInsert($requestInsertion);
                    }
                }
            }
            catch (\Throwable $th) {}

            try {
                if (isset($cookieValues->itinerary)){
                    // Enregistrement des données provisoires itinerary
                    $dataTmp = $cookieValues->itinerary;
                    $requestInsertion = "CALL Ins_user_itinerary('". $user['us_id'] ."', '" . $dataTmp->originPoint ."', '". $dataTmp->destinationPoint . "', '{\"name\": \"". $dataTmp->transportMean->name ."\",\"emoji\":\"". $dataTmp->transportMean->emoji ."\"}', '" . $dataTmp->distance . "', '". $dataTmp->co2 ."', '".$dataTmp->nbRecurrence."')";
                    $this->sqlInsert($requestInsertion);
                }
            }
            catch (\Throwable $th) {}

            setcookie("userAnswers", "", time() - 3600);
        }

        public function sqlVerifUser($username, $password){
            try {
                $db = $this->getConnection();
                $userRequest = $db->query("CALL Sel_user_connection('$username')")->fetch(PDO::FETCH_ASSOC);
                $verifiedPsw = password_verify($password, $userRequest["us_password"]);
                $user = (( $userRequest == false ) ? ["exist"=>false] : (($verifiedPsw) ? $userRequest :["exist"=>true]));
                $isUserIdentified = ["user" => $user, "goodPassword" => $verifiedPsw];
                if ($user["exist"] !== false){$this->userSessionSave($user);}
                return ["error" => false, "textReturned" => $isUserIdentified];
            } catch (Exception $exception) {
                return ["error" => true, "textReturned" => $exception->errorInfo]; 
            } 
        }

        public function sqlSelect($sqlRequest){
            try {
                $db = $this->getConnection();
                $resultRequest = $db->query($sqlRequest)->fetchALL(PDO::FETCH_OBJ);
                return ["error" => ($resultRequest === false) ? true : false, "textReturned" => $resultRequest];
            } catch (Exception $exception) {
                return ["error" => true, "textReturned" => $exception->errorInfo]; 
            }  
        }

        public function sqlDelete($sqlRequest){
            try {
                $db = $this->getConnection();
                $resultRequest = $db->query($sqlRequest)->fetchALL(PDO::FETCH_OBJ);
                return ["error" => ($resultRequest === false) ? true : false, "textReturned" => $resultRequest];
            } catch (Exception $exception) {
                return ["error" => true, "textReturned" => $exception->errorInfo]; 
            }  
        }
    }

    $dbAccess = new Database();

    $data = json_decode(file_get_contents("php://input"));

    // ! LINE FOR DEBUG WITH POSTMAN GET ! //
    // $data = json_decode($_GET["data"]);


    switch ($data->typeinserted) {

        // ************* USER LOGIN VERIFICATION ************* //
        case 'connectUser':
            print_r(json_encode($dbAccess->sqlVerifUser($data->username, $data->password)));
            break;
        

        // **************************************************** //
        // ***************** INSERTION SECTION **************** //
        // **************************************************** //

        // ************* CREATION OF A USER ************* //
        case 'newUser':
            $password = password_hash($data->password, PASSWORD_ARGON2I);
            $requestInsertion = "CALL Ins_new_user('$data->username', '$password', '$data->firstname', '$data->lastname', '$data->email')";
            $userAdded = $dbAccess->sqlInsert($requestInsertion);
            if (!$userAdded["error"] === true){
                $dbAccess->sqlVerifUser($data->username , $data->password);
            }
            print_r(json_encode($userAdded));   
            break;

        // ************* SAVE RESULTS HABITS ************* //
        case 'insertHabitsUser':
            if ($_SESSION["connected"]){
                $requestInsertion = "CALL Ins_user_habits_answer('$data->linkerId','$data->userId','$data->questionId','$data->questionAnswer')";
                $answerInserted = $dbAccess->sqlInsert($requestInsertion);
                print_r(json_encode(["error" => false, "textReturned" => ["isConnected" => true, "message" => $answerInserted]]));
            }
            else {
                try {
                    setcookie("userAnswers", json_encode(["linkerId" => $data->linkerId, "habits" => $data->questions]), time() + 1800,'/');
                    // $_COOKIE["userAnswers"]["linkerId"] = $data->linkerId;
                    // $_COOKIE["userAnswers"]["habits"] = $data->questions;
                    $statut = ["error" => false, "textReturned" => ["isConnected" => false, "message" => "DataSaved"]];
                }
                catch (\Throwable $th) {
                    $statut = ["error" => true, "textReturned" =>  ["isConnected" => false, "message" => $th->getMessage()]];
                }
                
                print_r(json_encode($statut));
            }
            break;

        // ************* SAVE RESULTS HABITS ************* //
        case 'insertItineraryUser':
            if ($_SESSION["connected"]){
                $requestInsertion = "CALL Ins_user_itinerary('$data->userId', '$data->originPoint', '$data->destinationPoint', '{\"name\": \"". $data->transportMean->name ."\",\"emoji\":\"". $data->transportMean->emoji ."\"}', '$data->distance', '$data->co2', '$data->nbRecurrence')";
                $itineraryInserted = $dbAccess->sqlInsert($requestInsertion);
                print_r(json_encode(["error" => false, "textReturned" => ["isConnected" => true, "message" => "All saved in database"]]));
            } 
            else {
                try {
                    setcookie("userAnswers", json_encode(["itinerary" => ["originPoint" => $data->originPoint, "destinationPoint" => $data->destinationPoint, "transportMean" => $data->transportMean, "distance" => $data->distance, "co2" => $data->co2, "nbRecurrence" => $data->nbRecurrence]]), time() + 1800,'/');
                    $statut = ["error" => false, "textReturned" => ["isConnected" => false, "message" => "DataSaved"]];
                }
                catch (\Throwable $th) {
                    $statut = ["error" => true, "textReturned" => ["isConnected" => false, "message" => $th->getMessage()]];
                }
                
                print_r(json_encode($statut));
            }
            break;


        // **************************************************** //
        // ****************** SELECT SECTION ****************** //
        // **************************************************** //

        // ************* SELECT QUESTIONS ************* //
        case 'selectQuestions':
            $requestSelection = "CALL Sel_questions()";
            $returnData = (object) $dbAccess->sqlSelect($requestSelection);
            $returnArray = [];
            foreach  ($returnData->textReturned as $value) {
                array_push($returnArray, new question($value->qu_id, $value->qu_theme,$value->qu_question_texte, $value->qu_possible_answers));
            }
            $returnData->textReturned = $returnArray;
            print_r(json_encode($returnData));
            break;

        // ************* SELECT ITINERARY ************* //
        case 'selectUserItinerary':
            $requestSelection = "CALL Sel_user_itinerary('$data->userid')";
            $returnData = (object) $dbAccess->sqlSelect($requestSelection);
            $returnArray = [];
            foreach  ($returnData->textReturned as $value) {
                array_push($returnArray, new itinerary($value->it_id, $value->it_depart,$value->it_arrivee, $value->it_moyen_transport, $value->it_distance, $value->it_co2));
            }
            $returnData->textReturned = $returnArray;
            print_r(json_encode($returnData));
            break;

        // *************** SELECT HABITS ************** //
        case 'selectUserHabits':
            $requestSelection = "CALL Sel_user_habits('$data->userid')";
            $returnData = (object) $dbAccess->sqlSelect($requestSelection);
            $returnArray = [];
            foreach  ($returnData->textReturned as $value) {
                array_push($returnArray, new habits($value->ha_id, $value->ha_datecreation,$value->ha_answers));
            }
            $returnData->textReturned = $returnArray;
            print_r(json_encode($returnData));
            break;

        case 'getUserDataAdvices':
            $requestSelection = "CAL Sel_user_advices";
            $returnData = (object) $dbAccess->sqlSelect($requestSelection);
            $returnArray = [];
            foreach ($returnData->texeturned as $value){
                array_push($returnArray, new advicesInfos($value->ha_id, $value->qu_short_title, $value->ha_valeur_utilisateur));
            }
            $returnData->textReturned = $returnArray;
            print_r((json_encode($returnData)));
            break;

        // **************************************************** //
        // ****************** DELETE SECTION ****************** //
        // **************************************************** //

        // ************* DELETE ITINERARY ************* //

        case 'deleteUserProfile':
            $requestionSelection = "CALL Del_user_profile('$data->userid')";
            $returnData = (object) $dbAccess->sqlDelete($requestionSelection);
            print_r(json_encode($returnData)); 
            break;

        case 'deleteUserItinerary':
            $requestionSelection = "CALL Del_user_itinerary('$data->userid', '$data->itineraryid')";
            $returnData = (object) $dbAccess->sqlDelete($requestionSelection);
            print_r(json_encode($returnData)); 
            break;

        case 'deleteUserHabits':
            $requestionSelection = "CALL Del_user_habits('$data->userid', '$data->habitsid')";
            $returnData = (object) $dbAccess->sqlDelete($requestionSelection);
            print_r(json_encode($returnData)); 
            break;

        default:
            // NOTHING IS DONE
            break;
    }
?>