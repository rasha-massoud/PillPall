<?php

return [
    'driver' => 'fcm',
    'log_enabled' => true,
    'http' => [
        'timeout' => 30,
        'proxy' => null,
        'verify' => true,
        'base_uri' => 'https://fcm.googleapis.com/fcm/',
    ],
    'firebase' => [
        'json_path' => env('FIREBASE_JSON_PATH', ''),
        'database_url' => env('FIREBASE_DATABASE_URL', ''),
    ],
];