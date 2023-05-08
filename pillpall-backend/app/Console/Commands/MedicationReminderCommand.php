<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Exception;
use Carbon\Carbon;
use GuzzleHttp\Client;

use App\Models\User;
use App\Models\Medication;

class MedicationReminderCommand extends Command{

    protected $signature = 'app:medication-reminder-command';

    protected $description = 'Check medication timings and send reminders to the Arduino';

    public function handle(){
        try {
            $user = auth()->user();
            $currentTime = Carbon::now();
            $currentDayOfWeek = strtolower($currentTime->englishDayOfWeek);
        
            $isFirstOfMonth = $currentTime->day === 1;
        
            $medications = $user->medications()
                ->where(function ($query) use ($currentDayOfWeek, $isFirstOfMonth) {
                    $query->where('days', 'Everyday')
                        ->orWhere('days', 'like', "%{$currentDayOfWeek}%");
        
                    if ($isFirstOfMonth) {
                        $query->orWhere('first_of_each_month', true);
                    }
                })
                ->get();
        
            if ($medications->isNotEmpty()) {
                $this->sendCommandToArduino();
        
                $this->info('Medication reminder sent to the Arduino!');
            } else {
                $this->info('No medications to remind at the current time.');
            }
        } catch(Exception $e){
            $this->error('Error message from the handle function');
        }
    }

    private function sendCommandToArduino(){

        $arduinoIp = '192.168.0.132';
        $buzzDuration = 5;

        $client = new Client();
        $url = "http://{$arduinoIp}/buzz?duration={$buzzDuration}";

        $response = $client->get($url);
        // $statusCode = $response->getStatusCode();
    }
}
