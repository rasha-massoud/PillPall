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
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while sending the medications to the Arduino'
            ]);
        }
    }

    private function sendCommandToArduino(){

        // $arduinoIpAddress = 'ARDUINO-IP';
        
        // $client = new Client();
        // $response = $client->get("http://{$arduinoIpAddress}/ring-buzzer");

        // $statusCode = $response->getStatusCode();
    }
}
