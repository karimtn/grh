<?php
require 'vendor/autoload.php';
$app = new \Slim\Slim();

// Login post
$app->post('/auth', function() use ($app) {
    
    $r = json_decode($app->request()->getBody());
    verifyParams(array('login', 'password'),$r->customer);
    $response = array();
    $password = $r->customer->password;
    $login = $r->customer->login;
    
    if(strcmp($login,'admin') == 0) {
      if(strcmp($password, 'admin$$') == 0) {
            $response['status'] = "success";
            $response['message'] = 'Logged in successfully.';
            $response['name'] = 'admin';
            
        } else {
            $response['status'] = "error";
            $response['message'] = 'Incorrect credentials';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});


$app->get('/department/:id', function ($id)  use ($app){
  
        // Http response code
        $app->status(200);
        // setting response content type to json
        $app->contentType('application/json');
    
    switch($id) {
        case 'volvo':
            echo '[{"id":1, "name":"commerciale"},{"id":2,"name":"innovation"}]';
        break;
        case 'saab':
            echo '[{"id":1, "name":"commerciale"},{"id":2,"name":"financier"}]';
        break;
        case 'opel':
            echo '[{"id":1, "name":"commerciale"},{"id":2,"name":"administratif"}]';
        break;
        case 'audi':
            echo '[{"id":1, "name":"commerciale"},{"id":2,"name":"produit"},{"id":3,"name":innovation}]';
        break;
    }
});

$app->get('/employee/:id', function ($id)  use ($app){
    
    // Http response code
    $app->status(200);
    // setting response content type to json
    $app->contentType('application/json');
    switch($id) {
        case 'commerciale':
            echo '[{"id":1, "name":"Kevin"},{"id":2,"name":"David"}]';
        break;
        case 'innovation':
            echo '[{"id":1, "name":"Jean"},{"id":2,"name":"Lucie"}]';
        break;
        case 'financier':
            echo '[{"id":1, "name":"Celine"},{"id":2,"name":"Lucie"}]';
        break;
        case 'administratif':
            echo '[{"id":1, "name":"Celine"},{"id":2,"name":"Julien"}]';
        break;
        case 'produit':
            echo '[{"id":1, "name":"David"},{"id":2,"name":"Jean"}]';
        break;
    }
    
});




$app->get('/', function () {
    echo "This is an API for Gestion RH";
});

/**
 * Verifying required params posted or not
 */
function verifyParams($required_fields,$request_params) {
    $error = false;
    $error_fields = "";
    foreach ($required_fields as $field) {
        if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["status"] = "error";
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoResponse(200, $response);
        $app->stop();
    }
}


function echoResponse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');

    echo json_encode($response);
}

$app->run();